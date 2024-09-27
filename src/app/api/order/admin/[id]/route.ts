import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { orderEditSchema } from "@/schema";
import { consoleIntegration } from "@sentry/nextjs";

type OrderParams = { params: { id: string } };

export const GET = async (request: NextRequest, { params }: OrderParams) => {
  try {
    const session = await auth();
    const role = session.user.role;

    if (role !== "ADMIN") {
      return NextResponse.json({
        error: "شما به این آدرس دسترسی ندارید، این ادرس مخصوص ادمین ها است",
      });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        address: true,
        adminsOfOrder: true,
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

    if (!order) {
      return NextResponse.json({ error: "سفارش مورد نظر پیدا نشد!" });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.log(error, " heeree");
    return NextResponse.json({
      error: "در هنگام دریافت اطلاعات سفارش خطایی رخ داده است",
    });
  }
};

export const PATCH = async (request: NextRequest, { params }: OrderParams) => {
  try {
    const session = await auth();
    const role = session.user.role;

    if (role !== "ADMIN") {
      return NextResponse.json({
        error: "شما به این آدرس دسترسی ندارید، این ادرس مخصوص ادمین ها است",
      });
    }

    const body = await request.json();
    console.log(body, " bodyy");
    const validation = orderEditSchema.safeParse(body);
    if (!validation.success) {
      console.log(validation.error.erros);
      return NextResponse.json(validation.error.errors);
    }

    const orderExist = await prisma.order.findUnique({
      where: { id: params.id },
    });

    if (!orderExist) {
      return NextResponse.json({ error: "سفارش مورد نظر در سیستم یافت نشد" });
    }

    const adminOrderId = await prisma.adminOrder.findFirst({
      where: {
        AND: [{ userId: session.user.id }, { orderId: params.id }],
      },
      select: { id: true },
    });

    const orderPriceSum = body.productsList.reduce((sum, product) => {
      return sum + product.price * product.count;
    }, 0);

    if (adminOrderId) {
      await prisma.order.update({
        where: { id: params.id },
        data: {
          price: orderPriceSum,
          adminsOfOrder: {
            update: {
              where: { id: adminOrderId.id },
              data: {
                logOfAction: {
                  push: "update order by typr time and product lsit",
                },
              },
            },
          },
          deliveryTime: body.deliveryTime,
          deliveryType: body.deliveryType,
          ...(body.productsList && {
            productsList: {
              deleteMany: {},
              createMany: {
                data: body.productsList.map((item) => ({
                  productId: item.productId,
                  count: item.count,
                  price: item.price,
                })),
              },
            },
          }),
        },
      });
    } else {
      await prisma.order.update({
        where: { id: params.id },
        data: {
          price: orderPriceSum,
          adminsOfOrder: {
            create: {
              userId: session.user.id,
              logOfAction: ["update order by typr time and product lsit"],
            },
          },
          deliveryTime: body.deliveryTime,
          deliveryType: body.deliveryType,
          ...(body.productsList && {
            productsList: {
              deleteMany: {},
              createMany: {
                data: body.productsList.map((item) => ({
                  productId: item.productId,
                  count: item.count,
                  price: item.price,
                })),
              },
            },
          }),
        },
      });
    }

    return NextResponse.json({ success: "سفارش با موفقیت بروزرسانی شد." });
  } catch (error) {
    console.log(error, " heree");
    return NextResponse.json({
      error: "در هنگام بروزرسانی سفارش خطایی رخ داده است",
    });
  }
};
