import { profileSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { getUserByEmail, getUserById, getUserProfileById } from "@/data/user";
import { auth } from "@/auth";

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const validation = profileSchema.safeParse(body);
  if (!validation.success) {
    console.log(validation.error.erros)
    return NextResponse.json(validation.error.errors);
  }
  // return NextResponse.json({ success: "کاربر در سیستم وجود ندارد" });
  try {
    const session = await auth();
    const existingUser = await getUserById(body.id);

    if (!existingUser) {
      return NextResponse.json({ error: "کاربر در سیستم وجود ندارد" });
    }

    if (!session.user) {
      return NextResponse.json({
        error: "برای ایجاد پروفایل لطفا وارد حساب کاربری خود شود",
      });
    }

    const userIdCheck = session.user.id === body.id;
    if (!userIdCheck) {
      return NextResponse.json({
        error: "کاربر ارائه شده با حساب شما مغایرت دارد",
      });
    }

    const existingProfile = await getUserProfileById(body.id);

    if (existingProfile.profile) {
      return NextResponse.json({
        error:
          "شما قبلا پروفایل ساخته اید ، در صورت لزوم میتوانید همان را ویرایش کنید",
      });
    }

    // create profile here

    const userProfile = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        profile: {
          create: {
            nationalCode: body.nationalCode,
            ...(body.birthDate !== "" && {
              birthDate: body.birthDate
            }),
            job: body.job || "",
            landlineNumber: body.landlineNumber,
            fatherName: body.fatherName,
            PhotoWithIDCard: {
              verify: false,
              photo: body.photoWithIDCard,
            } || {
              verify: false,
              photo: "",
            },
            firstName: body.firstName,
            lastName: body.lastName,
            profileImage: body.profileImage || "",
          },
        },
      },
    });

    return NextResponse.json({ success: "پروفایل با موفقیت ساخته شد" });
  } catch (error) {
    return NextResponse.json({ error: "خطایی رخ داده" });
  }
}
