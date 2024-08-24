import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";
export async function GET() {
   try{ const productsId = await prisma.product.findMany({
        select: {
          id: true,
        },
      });

      return NextResponse.json(productsId)} catch(error) {
        console.log(error ,' this is erro of get ids')
        return NextResponse.json({error: 'something wrong'})
      }
}