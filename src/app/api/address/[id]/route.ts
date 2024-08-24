import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { addressSchema } from "@/schema/index";
import GetUserProfileId from "@/app/utils/getUserProfileId";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const addressId = params.id;
    const userProfileId = await GetUserProfileId("آدرس");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }
    const isAddressBelongToUser = await prisma.address.findUnique({
      where: { id: addressId, userProfileId: userProfileId },
    });

    if (!isAddressBelongToUser) {
      return NextResponse.json({
        error: "آدرس مورد نظر در پروفایل شما پیدا نشد",
      });
    }

    return NextResponse.json(isAddressBelongToUser);
  } catch (error) {
    console.log(error, " address error");
    return NextResponse.json({
      error: "در هنگام بارگیری آدرس خطتایی رخ داده است",
    });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const addressId = params.id;
    const userProfileId = await GetUserProfileId("آدرس");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }

    const isAddressBelongToUser = await prisma.address.findUnique({
      where: { id: addressId, userProfileId: userProfileId },
    });

    if (!isAddressBelongToUser) {
      return NextResponse.json({
        error: "آدرس مورد نظر در پروفایل شما پیدا نشد",
      });
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    return NextResponse.json({ success: "آدرس با موفقیت حذف شد." });
  } catch (error) {
    return NextResponse.json({ error: "در هنگام حذف آدرس خطایی رخ داده است!" });
  }
};

export const PUT = async ( request: NextRequest,
  { params }: { params: { id: string } }) => {
  try {
    const body = await request.json();
    const validation = addressSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors);
    }
    const addressId = params.id;
    const userProfileId = await GetUserProfileId("آدرس");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }

    const isAddressBelongToUser = await prisma.address.findUnique({
      where: { id: addressId, userProfileId: userProfileId },
    });

    if (!isAddressBelongToUser) {
      return NextResponse.json({
        error: "آدرس مورد نظر در پروفایل شما پیدا نشد",
      });
    }

    await prisma.address.update({
      where: { id: addressId },
      data: {
        ...body
      }
    });

    return NextResponse.json({ success: "آدرس با موفقیت بروزرسانی شد." });
  } catch (error) {
    return NextResponse.json({ error: "در هنگام بروزرسانی آدرس خطایی رخ داده است!" });
  }
};
