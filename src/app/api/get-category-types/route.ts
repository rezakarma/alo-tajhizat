import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { productCategoryIds } from "@/schema";

export async function POST(request: NextRequest) {
    try{const body = await request.json()
    const validation = productCategoryIds.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors);
  }
  let  productVategoriesType
  if(body.categoryIds.length > 0) {
    productVategoriesType = await prisma.productType.findMany({
        where: {
            productCategory: {
                id: { in: body.categoryIds}
            }
        }
    })
    return NextResponse.json(productVategoriesType)
  }else{
    productVategoriesType = await prisma.productType.findMany()
    return NextResponse.json(productVategoriesType)
  }}catch(error) {
    return NextResponse.json({error: "در هنگام دریافت نوع ها خطایی رخ داده است."})
  }

}