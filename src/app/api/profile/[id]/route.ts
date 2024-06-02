import { NextRequest, NextResponse } from "next/server";
import { patchProfile, editIdentity } from "@/schema/index";
import prisma from "@/prisma/client";
import { auth } from "@/auth";
import { getUserProfileById } from "@/data/user";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = patchProfile.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.erros);
  }

  if (!params.id) {
    return NextResponse.json({ error: "شناسه پروفایل ارائه نشده" });
  }
  const profileId = await params.id;

  const {
    birthDate,
    job,
    landlineNumber,
    names,
    photoWithIDCard,
    profileImage,
  } = body;

  const session = await auth();

  if (!session.user) {
    return NextResponse.json({
      error: "برای تغییر اطلاعات حساب کاربری لطفا وارد حساب کاربری خود شود",
    });
  }

  const userProfile = await prisma.profile.findUnique({
    where: { id: profileId },
  });
  if (!userProfile) {
    return NextResponse.json({ error: "پروفایل یافت نشد" });
  }

  const profileIdCheck = session.user.profile.id === profileId;
  if (!profileIdCheck) {
    return NextResponse.json({
      error: "پروفایل ارائه شده با حساب شما مغایرت دارد",
    });
  }

  if (landlineNumber) {
    try {
      const updatedProfile = await prisma.profile.update({
        where: { id: profileId },
        data: {
          landlineNumber: landlineNumber,
        },
      });

      return NextResponse.json({
        success: "شماره تلفن ثابت با موفقیت تغییر کرد.",
      });
    } catch (error) {
      return NextResponse.json({
        error: "خطایی رخ داده است ، لطفا در زمانی دیگر مجدد تلاش کنید",
      });
    }
  }

  if (names) {
    try {
      await prisma.profile.update({
        where: { id: profileId },
        data: {
          firstName: names.firstName,
          lastName: names.lastName,
          fatherName: names.fatherName,
          nationalCode: names.nationalCode,
        },
      });
      return NextResponse.json({ success: "مشخصات شما با موفقیت تغییر کرد" });
    } catch (error) {
      return NextResponse.json({
        error: "خطایی رخ داده اس ، لطفا در زمانی دیگر مجدد تلاش کنید",
      });
    }
  }

  if(job) {
    try {
      await prisma.profile.update({
        where: { id: profileId },
        data : {
          job: job
        }
      })

      return NextResponse.json({success : "شغل شما با موفقیت تغییر کرد"})
    } catch(error) {
      return NextResponse.json({error : "خطایی رخ داده است ، لطفا در زمان دیگر مجدد تلاش کنید"})

    }
  }

  if(birthDate) {
    try {
      await prisma.profile.update({
        where: { id: profileId },
        data : {
          birthDate: birthDate
        }
      })

      return NextResponse.json({success : "شغل شما با موفقیت تغییر کرد"})
    } catch(error) {
      return NextResponse.json({error : "خطایی رخ داده است ، لطفا در زمان دیگر مجدد تلاش کنید"})

    }
  }

  if(photoWithIDCard) {
    try {
      await prisma.profile.update({
        where: { id: profileId },
        data : {
          PhotoWithIDCard: {
            verify: false,
            photo: photoWithIDCard
          }
        }
      })

      return NextResponse.json({success : "عکس شما به همراه کارت ملی با موفقیت تغییر کرد"})
    } catch(error) {
      return NextResponse.json({error : "خطایی رخ داده است ، لطفا در زمان دیگر مجدد تلاش کنید"})

    }
  }

  if(profileImage) {
    try {
      await prisma.profile.update({
        where: { id: profileId },
        data : {
          profileImage: profileImage
        }
      })

      return NextResponse.json({success : "عکس پروفایل  با موفقیت تغییر کرد"})
    } catch(error) {
      return NextResponse.json({error : "خطایی رخ داده است ، لطفا در زمان دیگر مجدد تلاش کنید"})

    }
  }

}
