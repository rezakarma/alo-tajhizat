import { NextRequest, NextResponse } from "next/server";
import { addProductSettingAdminWithIdSchema } from "@/schema/index";
import checkUser from "@/data/checkUser";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const types = await prisma.productType.findMany();
    return NextResponse.json(types);
  } catch (error) {
    return NextResponse.json({
      error: "در هنگام بارگیری نوع محصولات خطایی رخ داده است",
    });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const validation = addProductSettingAdminWithIdSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors);
    }

    const checkhUserAccess = await checkUser();

    if (checkhUserAccess) {
      return NextResponse.json(checkhUserAccess);
    }

    const categoryExist = await prisma.productCategory.findUnique({
      where: { id: body.id },
    });

    if (!categoryExist) {
      return NextResponse.json({ error: "دسته بندی ارائه شده پیدا نشد" });
    }

    // const typeExist = await prisma.productType.findFirst({
    //     where: {englishType :body.englishName}
    // })

    const newType = await prisma.productType.create({
      data: {
        englishType: body.englishName,
        persianType: body.persianName,
        CategoryId: body.id
      },
    });

    // const updatedCategory = await prisma.productCategory.update({
    //   where: { id: body.id },
    //   data: {
    //     productTypes: {
    //       create: {
    //         englishType: body.englishName,
    //         persianType: body.persianName,
    //       },
    //     },
    //   },
    // });

    const updatedCategory = await prisma.productCategory.update({
      where: { id: body.id },
      data: {
        productTypes: {
          connect: {
            id: newType.id
          },
        },
      },
    });

    await fetch(`${process.env.WEBSOCKET_ENDPOINT}/addType`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newType)
    })

    console.log("newType ", newType);
    return NextResponse.json({ success: "نوع محصول با موفقیت ساخته شد" });
  } catch (error) {
    console.log("updatedCategory ", error);
    return NextResponse.json({
      error:
        "در هنگام ساخت نوع محصول خطایی رخ داده است لطفا در زمانی دیگر مجدد تلاش کنید",
    });
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  console.log("type error ", body);

  try {
    if (!body.typeId) {
      return NextResponse.json({ error: "لطفا یک ایدی برای حذف ارائه دهید" });
    }

    const checkhUserAccess = await checkUser();

    if (checkhUserAccess) {
      return NextResponse.json(checkhUserAccess);
    }

    const typeExist = await prisma.productType.findUnique({
      where: { id: body.typeId },
    });

    if (!typeExist) {
      return NextResponse.json({ error: "نوع مورد نظر پیدا نشد" });
    }

    const deletedType = await prisma.productType.delete({
      where: { id: body.typeId },
    });

    await fetch(`${process.env.WEBSOCKET_ENDPOINT}/deleteType`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(deletedType)
    })

    return NextResponse.json({ success: "نوع با موفقیت حذف شد" });
  } catch (error) {
    console.log('deleteType error', error)
    return NextResponse.json({ error: "در هنگام حذف نوع خطایی رخ داده است" });
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

    const type = await prisma.productType.findUnique({
      where: { id: body.id },
    });

    if (!type) {
      return NextResponse.json({ error: "نوع مورد نظر پیدا نشد" });
    }
    const updatedType = await prisma.productType.update({
      where: { id: body.id },
      data: {
        persianType: body.persianName,
        englishType: body.englishName,
      },
    });
    const resultOFwebsocket = await fetch(
      `${process.env.WEBSOCKET_ENDPOINT}/updateType`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedType),
      }
    );
    return NextResponse.json({ success: "نوع با موفقیت بروزرسانی شد" });
  } catch (error) {
    return NextResponse.json({
      error: "در بروزرسانی نوع خطایی رخ داده اس ، لطفا مجددا تلاش کنید",
    });
  }
}

