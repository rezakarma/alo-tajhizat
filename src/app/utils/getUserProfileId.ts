import { auth } from "@/auth";
import { NextResponse } from "next/server";

const GetUserProfileId = async (fieldName : string) => {
  const session = await auth();

  if (!session.user) {
    return NextResponse.json({
      error: `برای ایجاد ${fieldName} لطفا وارد حساب کاربری خود شوید`,
    });
  }

  if (!session.user.profile) {
    return NextResponse.json({
      error: `برای ایجاد ${fieldName} ابتدا باید پروفایل بسازید`,
    });
  }

    const userProfileId = session.user.profile.id;
    return userProfileId;
}
 
export default GetUserProfileId;