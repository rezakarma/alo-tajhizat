import { orderSettingSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import GetUserProfileId from "@/app/utils/getUserProfileId";
import { auth } from "@/auth";
import { NextApiRequest } from "next";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const body = await request.json();
    const validation = orderSettingSchema.safeParse(body);
    if (!validation.success) {
      console.log(validation.error.erros);
      return NextResponse.json(validation.error.errors);
    }

    const userProfileId = await GetUserProfileId("سفارش");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }

    const addressExist = await prisma.address.findUnique({
      where: { id: body.addressId, userProfileId: userProfileId },
    });

    if (!addressExist) {
      return NextResponse.json({
        error:
          "آدرس مورد نظر شما در پروفایل شما وجود ندارد و یا اینکه شما آدرسی ایجاد نکردید",
      });
    }

    const session = await auth();
    const userId = session.user.id;

    const userCart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        products: {
          include: {
            product: {
              select: {
                rentPrice: true,
              },
            },
          },
        },
      },
    });

    if (!userCart || userCart.products.length === 0) {
      return NextResponse.json({ error: "سبد خرید شما خالی است" });
    }

    const cartSum = userCart.products.reduce((sum, product) => {
      return sum + product.product.rentPrice * product.count;
    }, 0);

    const newOrder = await prisma.order.create({
      data: {
        deliveryTime: body.deliveryTime,
        deliveryType: body.deliveryType,
        status: "pendingConfirmation",
        addressId: body.addressId,
        description: body.description,
        userId: userId,
        price: cartSum,
        productsList: {
          createMany: {
            data: userCart.products.map((product) => ({
              count: product.count,
              productId: product.productId,
            })),
          },
        },
      },
    });

    await prisma.cart.delete({
      where: { id: userCart.id },
    });

    return NextResponse.json({
      success: "سفارش شما با موفقیت ثبت شد و در انتظار تایید قرار گرفت",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "عملیات ناموفق! در هنگام ثبت سفارش خطایی رخ داد",
    });
  }
};

export const GET = async () => {
  const session = await auth();
  const userId = session.user.id;

  const userCart = await prisma.cart.findUnique({
    where: { userId: userId },
    include: {
      products: {
        include: {
          product: {
            select: {
              rentPrice: true,
            },
          },
        },
      },
    },
  });

  // const cartSum = userCart.products.reduce((sum, product) => {
  //   return sum + product.product.rentPrice * product.count;
  // }, 0);

  if (!userCart) {
    return NextResponse.json({ error: "سبد خرید شما خالی است" });
  }

  return NextResponse.json(userCart);
};
