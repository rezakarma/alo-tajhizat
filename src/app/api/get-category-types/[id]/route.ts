import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json({
        error: "لطفا شناسه ی دسته بندی را ارائه کنید",
      });
    }

    const categoryId = await params.id

    const categoryExist = await prisma.productCategory.findUnique({
      where: { id: params.id },
      include: {
        productTypes: true,
      },
    });

    if (!categoryExist) {
      return NextResponse.json({ error: "دسته بندی مورد نظر پیدا نشد" });
    }

    return NextResponse.json(categoryExist.productTypes);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
