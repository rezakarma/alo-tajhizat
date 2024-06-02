import { NextRequest, NextResponse } from "next/server";
import { addProductSettingAdminWithIdSchema } from "@/schema/index";
import checkUser from "@/data/checkUser";
import prisma from "@/prisma/client";
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

    const updatedCategory = await prisma.productCategory.update({
      where: { id: body.id },
      data: {
        productTypes: {
          create: {
            englishType: body.englishName,
            persianType: body.persianName,
          },
        },
      },
    });

    const testProductCategory = await prisma.productCategory.findUnique({
        where: {id : body.id},
        include: {
            productTypes: true
        }
    })
    
    console.log('testProductCategory ', testProductCategory)
    console.log("updatedCategory ", updatedCategory)
    return NextResponse.json({ success: "نوع محصول با موفقیت ساخته شد" });
  } catch (error) {
    console.log("updatedCategory ",error)
    return NextResponse.json({
      error:
        "در هنگام ساخت نوع محصول خطایی رخ داده است لطفا در زمانی دیگر مجدد تلاش کنید",
    });
  }
}
