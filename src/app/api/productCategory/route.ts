import { NextRequest, NextResponse } from "next/server";
import { addProductSettingAdminSchema, addProductSettingAdminWithIdSchema } from "@/schema/index";
import prisma from "../../../prisma/client";
import checkUser from "@/data/checkUser";

export async function GET(request: NextRequest) {
  const Category = await prisma.productCategory.findMany();
  return NextResponse.json(Category);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = addProductSettingAdminSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors);
  }

  const checkhUserAccess = await checkUser();

    if (checkhUserAccess) {
      return NextResponse.json(checkhUserAccess);
    }

  try {
    const category = await prisma.productCategory.findUnique({
      where: { englishCategory: body.englishName },
    });

    if (category) {
      return NextResponse.json({
        error: "این دستبه بندی هم اکنون در سیستم موجود است",
      });
    }
    const newCategory = await prisma.productCategory.create({
      data: {
        persianCategory: body.persianName,
        englishCategory: body.englishName,
      },
    });

    await fetch(`${process.env.WEBSOCKET_ENDPOINT}/addCategory`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newCategory)
    })
    return NextResponse.json({ success: "دسته بندی با موفقیت ساخته شد" });
  } catch (error) {
    return NextResponse.json({
      error: "خطایی رخ داده ، لطفا در زمانی دیگر مجدد تلاش کنید",
    });
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const body =await request.json();

  try {

    
    const checkhUserAccess =await checkUser();
    
    if(checkhUserAccess) {
      return NextResponse.json(checkhUserAccess)
    }
    
    if (!body.categoryId) {
      return NextResponse.json({
        error: "برای حذف دسته بندی باید یک ایدی ارائه شود",
      });
    }

    const deletedCategory = await prisma.productCategory.delete({
      where: {id: body.categoryId}
    })
    
    const websocketResult = await fetch(`${process.env.WEBSOCKET_ENDPOINT}/deleteCategory`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(deletedCategory)
    })

    console.log('websocket-res ',websocketResult)

    return NextResponse.json({ success: "دسته بندی مورد نظر با موفقیت حذف شد"})
    
  }catch(error) {
    return NextResponse.json({
      error: "در هنگام حذف برند خطایی رخ داده ، عملیات ناموفق",
    });
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const validation = addProductSettingAdminWithIdSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors);
  }

  try {
    const checkhUserAccess = await checkUser();

    if (checkhUserAccess) {
      return NextResponse.json(checkhUserAccess);
    }

    const brand = await prisma.productCategory.findUnique({
      where: { id: body.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "دسته بندی مورد نظر پیدا نشد" });
    }
    const updatedCategory = await prisma.productCategory.update({
      where: { id: body.id },
      data: {
        persianCategory: body.persianName,
        englishCategory: body.englishName,
      },
    });
    const resultOFwebsocket = await fetch(
      `${process.env.WEBSOCKET_ENDPOINT}/updateCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      }
    );
    return NextResponse.json({ success: "دسته بندی با موفقیت بروزرسانی شد" });
  } catch (error) {
    return NextResponse.json({
      error: "در بروزرسانی دسته بندی خطایی رخ داده اس ، لطفا مجددا تلاش کنید",
    });
  }
}
