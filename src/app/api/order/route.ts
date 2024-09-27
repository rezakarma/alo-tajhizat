import { orderSettingSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import GetUserProfileId from "@/app/utils/getUserProfileId";
import { auth } from "@/auth";
import { NextApiRequest } from "next";
import { Status } from "@prisma/client";
import isEnumValue from "@/app/utils/isValidEnumValue";

type WhereOfGet = {
  status: Status | null;
  cursor: string | null;
  userId: string | null;
};

export const GET = async (request: NextApiRequest) => {
  try {
    const userProfileId = await GetUserProfileId("سفارش");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }

    const session = await auth();
    const userId = session.user.id;

    const url = new URL(request.url, `http://${request.headers.host}`);
    const status = url.searchParams.get("status") as Status | undefined;

    let cursor = url.searchParams.get("cursor");
    let limit = url.searchParams.get("limit");
    const where = {} as WhereOfGet;

    if (status && Object.values(Status).includes(status)) {
      where.status = status;
    }

    if (!cursor) {
      cursor = "0";
    }

    if (!limit) {
      limit = "1";
    }

    if (userId) {
      where.userId = userId;
    }

    const orders = await prisma.order.findMany({
      where,
      take: parseInt(limit),
      skip: parseInt(cursor) * parseInt(limit),
      include: {
        productsList: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                images: true,
              },
            },
          },
        },
      },
    });

    const nextCursor =
      orders.length === 0
        ? null
        : parseInt(cursor) * parseInt(limit) + parseInt(limit);

    return NextResponse.json({
      data: orders,
      nextCursor,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "در هنگام دریافت سفارش ها خطایی رخ داده است",
    });
  }
};

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
              price: product.product.rentPrice,
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

export const PATCH = async (request: NextApiRequest) => {
  try {
    const userProfileId = await GetUserProfileId("سفارش");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }

    const session = await auth();
    const userId = session.user.id;

    const url = new URL(request.url, `http://${request.headers.host}`);
    const status = url.searchParams.get("status") as Status;
    const orderId = url.searchParams.get("orderId");

    if (!status || !orderId) {
      return NextResponse.json({
        error: "آیدی سفارش یا وضیعت مورد نظر ارائه نشده است",
      });
    }

    if (!isEnumValue(Status, status)) {
      return NextResponse.json({ error: "وضیعت ارائه شده معتبر نیست" });
    }

    const orderBelongToUser = await prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!orderBelongToUser) {
      return NextResponse.json({
        error: "سفارش مئرد نظر در حساب شما پیدا نشد",
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "canceled",
      },
    });

    return NextResponse.json({ success: "سفارش با موفقیت لغو شد" });
  } catch (error) {
    return NextResponse.json({ error: "در هنگام لغو سفارش خطایی رخ داده است" });
  }
};

// export const GET = async () => {
//   const session = await auth();
//   const userId = session.user.id;

//   const userCart = await prisma.cart.findUnique({
//     where: { userId: userId },
//     include: {
//       products: {
//         include: {
//           product: {
//             select: {
//               rentPrice: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   // const cartSum = userCart.products.reduce((sum, product) => {
//   //   return sum + product.product.rentPrice * product.count;
//   // }, 0);

//   if (!userCart) {
//     return NextResponse.json({ error: "سبد خرید شما خالی است" });
//   }

//   return NextResponse.json(userCart);
// };


// function echo<T>(arg: T): T {
//   return arg;
// }