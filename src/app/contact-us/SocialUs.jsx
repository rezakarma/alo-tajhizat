import SocialIcon from "@/components/utils/socialIcon";
import React from "react";

function SocialUs() {
  return (
    <div className="flex flex-col items-center max-w-md gap-5 ">
      <div class="my-5 rounded-full border-primaryLight w-80 border-b-8 "></div>
      <p className="justify-center items-center text-center text-lg p-2  ">
        شما میتوانید با استفاده از شبکه های اجتماعی و صفحات مجازی ما با ما در
        ارتباط باشید و در سریع ترین زمان ممکن پاسخ خود را دریافت کنید
      </p>
      <SocialIcon
        className="justify-center items-center gap-8 w-11/12 "
        color="fill-primaryDark mb-7 dark:fill-primaryYellow hover:fill-primaryYellow transition-all"
      />
    </div>
  );
}

export default SocialUs;
