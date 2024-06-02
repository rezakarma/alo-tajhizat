import { NextRequest, NextResponse } from "next/server";
import {
  addProductSettingAdminSchema,
  addProductSettingAdminWithIdSchema,
} from "@/schema/index";
import prisma from "@/prisma/client";
import { auth } from "@/auth";
import checkUser from "@/data/checkUser";
export async function GET(request: NextRequest) {
  try {
    const Brand = await prisma.productBrand.findMany();
    return NextResponse.json(Brand);
  } catch (error) {
    return NextResponse.json({
      error: "در هنگام بارگیری برند ها خطایی رخ داده است لطفا مجدد تلاش کنید",
    });
  }
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
    const brand = await prisma.productBrand.findUnique({
      where: { englishBrand: body.englishName },
    });
    console.log("brand: ", brand);
    if (brand) {
      return NextResponse.json({ error: "این برند در سیستم وجود دارد" });
    }
    const newBrand = await prisma.productBrand.create({
      data: {
        persianBrand: body.persianName,
        englishBrand: body.englishName,
      },
    });
    const resultOFwebsocket = await fetch(
      `${process.env.WEBSOCKET_ENDPOINT}/addBrand`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBrand),
      }
    );
    return NextResponse.json({ success: "برند با موفقیت اضافه شد" });
  } catch (error) {
    console.log("errorx  ", error);
    return NextResponse.json({
      error: error,
    });
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  const session = await auth();

  const checkhUserAccess = await checkUser();

  if (checkhUserAccess) {
    return NextResponse.json(checkhUserAccess);
  }

  try {

    if (!body.brandId) {
      return NextResponse.json({
        error: "برای حذف برند باید یک ایدی ارائه شود",
      });
    }

    // const brand = await prisma.productBrand.findUnique({
    //   where: {id : body.brandId}
    // })

    // if(!brand) {
    //   return NextResponse.json({error: 'برند مورد نظر با ایدی ارائه شده پیدا نشد'})
    // }

    const deletedBrand = await prisma.productBrand.delete({
      where: { id: body.brandId },
    });

    const resultOFwebsocket = await fetch(
      `${process.env.WEBSOCKET_ENDPOINT}/deleteBrand`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletedBrand),
      }
    );

    return NextResponse.json({ success: `برند با موفقیت حذف شد` });
  } catch (error) {
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

    const brand = await prisma.productBrand.findUnique({
      where: { id: body.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "برند مورد نظر پیدا نشد" });
    }
    const updatedBrand = await prisma.productBrand.update({
      where: { id: body.id },
      data: {
        persianBrand: body.persianName,
        englishBrand: body.englishName,
      },
    });
    const resultOFwebsocket = await fetch(
      `${process.env.WEBSOCKET_ENDPOINT}/updateBrand`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBrand),
      }
    );
    return NextResponse.json({ success: "برند با موفقیت بروزرسانی شد" });
  } catch (error) {
    console.log("brandError ",error)
    return NextResponse.json({
      error: "در بروزرسانی برند خطایی رخ داده اس ، لطفا مجددا تلاش کنید",
    });
  }
}

// const checkUser = async () => {
//   const session = await auth();

//   if (!session.user) {
//     return {
//       error: "برای حذف برند لطفا وارد حساب کاربری خود شود",
//     };
//   }

//   if (session.user.role !== "ADMIN") {
//     return {
//       error: "شما ادمین نیستید ، و نمیتوانید برند حذف کنید",
//     };
//   }

//   return null;
// };
