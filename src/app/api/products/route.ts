import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { newProductSchema } from "@/schema/index";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page')
  // try {
  //   console.log('params ',searchParams.page)
  //   const products = await prisma.product.findMany();
  //   return NextResponse.json(products);
  // } catch (error) {
  //   return NextResponse.json({ error: error });
  // }


    console.log('params ',searchParams, page)

  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = newProductSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors);
  }

  const session = await auth();

  if (!session.user) {
    return NextResponse.json({
      error: "برای ایجاد محصول لطفا وارد حساب کاربری خود شود",
    });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({
      error: "شما ادمین نیستید ، و نمیتوانید محصول اضافه کنید",
    });
  }

  const category = await prisma.productCategory.findUnique({
    where: { id: body.category },
  });

  if (!category) {
    return NextResponse.json({ error: "دستبه بندی مورد نظر پیدا نشد" });
  }

  const brand = await prisma.productBrand.findUnique({
    where: { id: body.brand },
  });

  if (!brand) {
    return NextResponse.json({ error: "برند مورد نظر پیدا نشد" });
  }

  const userAdded = session.user.id;

  const newProducts = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      model: body.model,
      images: body.productImage,
      details: body.details,
      supplyType: body.supplyType,
      rentPrice: body.rentPrice,
      sellPrice: body.sellPrice,
      categoryName: category.englishCategory,
      brandName: brand.englishBrand,
      category: {
        connect: {
          id: category.id,
        },
      },
      brand: {
        connect: {
          id: brand.id,
        },
      },
      userAdded: {
        connect: {
            id: userAdded
        }
      }
    },
  });

  return NextResponse.json({success: "محصول با موفقیت ساخته شد"});
}

// model Product {
//     images       String[]-------------
//     title        String-----------------
//     description  String-----------------
//     details      productDetails[]---------------
//     supplyType   SupplyType-------------------
//     sellPrice    String?          @default("0")---------------
//     rentPrice    String?          @default("0")------------
//     categoryName String------------

//     category     ProductCategory  @relation(fields: [categoryId], references: [id])
//     categoryId   String           @db.ObjectId

//     brandName    String-------------

//     brand        ProductBrand     @relation(fields: [categoryId], references: [id])
//     brandId      String           @db.ObjectId

//     userId       String           @db.ObjectId
//     userAdded    User             @relation(fields: [userId], references: [id])
//   }
