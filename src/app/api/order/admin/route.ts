import { orderSettingSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import GetUserProfileId from "@/app/utils/getUserProfileId";
import { auth } from "@/auth";
import { NextApiRequest } from "next";
import { Status, UserRole } from "@prisma/client";
import isEnumValue from "@/app/utils/isValidEnumValue";

type WhereOfGet = {
  status: Status | null;
  userId: string | null;
  cursor: string | null;
  user: any | null
};

export const GET = async (request: NextApiRequest) => {
  try {
    const userProfileId = await GetUserProfileId("سفارش");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }

    const session = await auth();
    const role = session.user.role;

    if (role !== "ADMIN") {
      return NextResponse.json({
        error: "شما به این آدرس دسترسی ندارید، این ادرس مخصوص ادیمن ها است",
      });
    }

    const url = new URL(request.url, `http://${request.headers.host}`);
    const status = url.searchParams.get("status") as Status | undefined;
    const userId = url.searchParams.get("userId");
    const username = url.searchParams.get("username");
    let cursor = url.searchParams.get("cursor");
    let limit = url.searchParams.get("limit");
    const where = {} as WhereOfGet;

    if (status && Object.values(Status).includes(status)) {
      where.status = status;
    }

    if (userId) {
      where.userId = userId;
    }

    if (username) {
      where.user = {
        userName: {
          contains: username,
          mode: 'insensitive',
        },
      };
    }

    if (!cursor) {
      cursor = "0";
    }

    if (!limit) {
      limit = "1";
    }

    const orders = await prisma.order.findMany({
      where,
      take: parseInt(limit),
      skip: parseInt(cursor),
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
        : parseInt(cursor) + parseInt(limit);

    return NextResponse.json({
      data: orders,
      nextCursor,
    });
  } catch (error) {
    return NextResponse.json({
      error: "در هنگام دریافت سفارش ها خطایی رخ داده است",
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
    const role = session.user.role;

    if (role !== "ADMIN") {
      return NextResponse.json({
        error: "شما به این آدرس دسترسی ندارید، این ادرس مخصوص ادیمن ها است",
      });
    }


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

    const orderExist = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!orderExist) {
      return NextResponse.json({
        error: "سفارش مئرد نظر پیدا نشد",
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