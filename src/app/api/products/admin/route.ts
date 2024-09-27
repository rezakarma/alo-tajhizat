import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { newProductSchema } from "@/schema/index";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const category = url.searchParams.get("category");
    const brand = url.searchParams.get("brand");
    const type = url.searchParams.get("type");
    const order = url.searchParams.get("order");
    const priceRange = url.searchParams.get("priceRange");
    const search = url.searchParams.get("search");
    let limit = url.searchParams.get("limit");
    let cursor = url.searchParams.get("cursor");

    const where: Prisma.ProductWhereInput = {};

    if (category) {
      const categoryArray = category.split(",");
      // where.categoryId = { in: [...(Array.isArray(category) ? category : [category])]  }; // use `in` operator for array values

      where.categoryId = { in: categoryArray };
    }

    if (brand) {
      const brandArray = brand.split(",");

      // where.brandId = {in: [...(Array.isArray(brand) ? brand : [brand])]  }; // use `in` operator for array values
      where.brandId = { in: brandArray };
    }

    if (type) {
      const typeArray = type.split(",");

      // where.typeId = { in: [...(Array.isArray(type) ? type : [type])]  }; // use `in` operator for array values

      where.typeId = { in: typeArray };
    }

    if (priceRange) {
      const [min, max] = priceRange.split(",");
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

    if (!limit) {
      limit = "1";
    }
    let orderBy: Record<string, "asc" | "desc"> = {};
    switch (order) {
      case "lower":
        orderBy.rentPrice = "asc";
        break;
      case "higher":
        orderBy.rentPrice = "desc";
        break;
      case "newest":
        orderBy.createdAt = "desc";
        break;
      default:
        orderBy = {};
    }

    const [products, count] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        take: parseInt(limit),
        skip: parseInt(cursor),
        include: {
          category: true,
          brand: true,
          type: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    console.log(count, " product count");

    const nextCursor =
      products.length === 0
        ? null
        : parseInt(cursor) + parseInt(limit);

    return NextResponse.json({
      data: products,
      nextCursor,
    });

    //   return NextResponse.json({ products, count });
  } catch (error) {
    return NextResponse.json({error: "در هنگام دریافت محصولات خطایی رخ داده است"})
  }
}
