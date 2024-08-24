import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { addressSchema } from "@/schema/index";
import GetUserProfileId from "@/app/utils/getUserProfileId";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const userProfileId = await GetUserProfileId("آدرس");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }
    const userAddresses = await prisma.profile.findUnique({
      where: { id: userProfileId },
      include: {
        addresses: true,
      },
    });

    return NextResponse.json(userAddresses.addresses)
  } catch (error) {
    console.log(error, ' address error')
    return NextResponse.json({error: "در هنگام بارگیری آدرس ها خطتایی رخ داده است"})
  }
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const body = await request.json();
    const validation = addressSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors);
    }

    const userProfileId = await GetUserProfileId("آدرس");
    if (typeof userProfileId !== "string") {
      return userProfileId;
    }



    const updatedProfile = await prisma.profile.update({
      where: { id: userProfileId },
      data: {
        addresses: {
          create: {
            ...body,
          },
        },
      },
    });

    return NextResponse.json({ success: "آدرس با موفقیت اضافه شد" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "در هنگام اضافه کردن آدرس خطایی رخ داده است.",
    });
  }
};
