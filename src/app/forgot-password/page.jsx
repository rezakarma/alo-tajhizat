"use client";

import { Footer } from "@/components/footer/footer";

import ForgotPasswordSvg from "../../../public/assets/forgotPassword/forgotPassword.svg";
import Image from "next/image";
import ForgotPasswordForm from "./forgotPasswordForm";
const ForgotPassword = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-primaryDark dark:bg-darkBg ">
        <div className="flex justify-center h-[90%] w-[95%] rounded-3xl bg-white dark:bg-primaryDark2">
          <div className="flex flex-col gap-12 md:w-1/2 justify-center lg:pr-24">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-2xl md:mr-5 lg:text-4xl text-black dark:text-primaryYellow">
                رمز عبور خود را<span className="text-primary">فراموش</span> کرده
                اید؟
              </h1>
              <p className="flex justify-center lg:justify-start text-lg mr-2 dark:text-white">
                لطفا اطلاعات کاربری خود را وارد کنید
              </p>
            </div>
            <ForgotPasswordForm />
          </div>
          <div className="hidden md:w-1/2 md:flex md:items-center md:justify-center bg-bgLoginSignup md:rounded-l-3xl dark:bg-primaryDark">
            <Image src={ForgotPasswordSvg} alt="forgot password" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
