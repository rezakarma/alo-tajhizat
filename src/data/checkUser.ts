"use server"
import { auth } from "@/auth";
const checkUser = async () => {
    const session = await auth();
    if (!session.user) {
      return {
        error: "برای حذف برند لطفا وارد حساب کاربری خود شود",
      };
    }
  
    if (session.user.role !== "ADMIN") {
      return {
        error: "شما ادمین نیستید ، و نمیتوانید برند حذف کنید",
      };
    }
  
    return null;
  };

  
export default checkUser;