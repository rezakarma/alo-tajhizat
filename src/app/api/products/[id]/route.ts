import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/client";
import { newProductSchema } from '@/schema/index'
import { auth } from "@/auth";


export async function GET(request: NextRequest,{ params }: { params: {id:string } }) {
    try{
        const products = await prisma.product.findUnique({
            where: { id: params.id},
        });
        if (!products){
            return NextResponse.json({ error: "Product not found" });
        } 
        return NextResponse.json(products);
    }catch(error) {
        return NextResponse.json({error:error})
    }
    
}



export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const productExist = await prisma.product.findUnique({
    where: {id : params.id}
  })

  if(!productExist) {
    return NextResponse.json({error: "محصول مورد نظر یافت نشد"})
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

  const newProducts = await prisma.product.update({
    where: {id : params.id },
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

  return NextResponse.json({success: "محصول با موفقیت بروزرسانی شد"});
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  await prisma.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({});
}
