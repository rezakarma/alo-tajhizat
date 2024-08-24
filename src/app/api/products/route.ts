import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { newProductSchema } from "@/schema/index";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {

  const url = new URL(request.url, `http://${request.headers.host}`);
  const category = url.searchParams.get('category');
const brand = url.searchParams.get('brand');
const type = url.searchParams.get('type');
const order = url.searchParams.get('order');
const priceRange = url.searchParams.get('priceRange');
const search = url.searchParams.get('search');
let page = url.searchParams.get('page');
let limit = url.searchParams.get('limit');

  console.log(category, brand, type, order, priceRange, search, page, limit);
  // Now you can use the extracted query params
  // console.log(' qyeryyy ',category, brand, type, order, priceRange, search, page, limit);

  // const page = searchParams.get('page')
  
  // try {
  //   console.log('params ',searchParams.page)
  //   const products = await prisma.product.findMany();
  //   return NextResponse.json(products);
  // } catch (error) {
  //   return NextResponse.json({ error: error });
  // }
  // const body = await request.json();
  // const { category, brand, type, order, priceRange, search, page, limit } = searchParams;



  console.log(url.searchParams,' queryy')


  const where: Prisma.ProductWhereInput = {};

  if (category) {
    const categoryArray = category.split(',')
    // where.categoryId = { in: [...(Array.isArray(category) ? category : [category])]  }; // use `in` operator for array values

    where.categoryId = { in: categoryArray };
  }

  if (brand) {
    const brandArray = brand.split(',')

    // where.brandId = {in: [...(Array.isArray(brand) ? brand : [brand])]  }; // use `in` operator for array values
    where.brandId = { in: brandArray }
  }

  if (type) {
    const typeArray = type.split(',')

    // where.typeId = { in: [...(Array.isArray(type) ? type : [type])]  }; // use `in` operator for array values

    where.typeId = { in: typeArray }
  }

  if (priceRange) {
    const [min, max] = priceRange.split(',');
    // where.sellPrice = { gte: parseInt(min), lte: parseInt(max) };
    where.rentPrice = { gte: parseInt(min), lte: parseInt(max) };
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { model: { contains: search } },
    ];
  }

  if(!limit) {
    limit = '2'
  }

  if(!page) {
    page = '1'
  }

  let orderBy: Record<string, 'asc' | 'desc'> = {};
  switch (order) {
    case 'lower':
      orderBy.rentPrice = 'asc';
      break;
    case 'higher':
      orderBy.rentPrice = 'desc';
      break;
    case 'newest':
      orderBy.createdAt = 'desc';
      break;
    default:
      orderBy = {};
  }

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        category: true,
        brand: true,
        type: true,
      },
    }),
    prisma.product.count({ where }),
  ]);


  console.log(count, ' product count')
    
  return NextResponse.json({ products, count });
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
      error: "برای ایجاد محصول لطفا وارد حساب کاربری خود شوید",
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

  const type = await prisma.productType.findUnique({
    where: { id: body.type },
  })

  if (!type) {
    return NextResponse.json({ error: "نوع مورد نظر پیدا نشد" });
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
      rentPrice: +body.rentPrice,
      sellPrice: +body.sellPrice,
      categoryName: category.englishCategory,
      brandName: brand.englishBrand,
      typeName: type.englishType,
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
      type: {
        connect: {
          id: type.id,
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
