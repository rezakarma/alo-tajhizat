"use client";

import React from "react";
import UserNotificationListSvg from "../../../../public/assets/userNotificationListSvg";
import {ScrollShadow} from "@nextui-org/react";
const notificationsForm = () => {
  const formContent = [
    {
      title: "پرفروش ترین محصولات امروز رو دیدی؟",
      description: "تا 40% تخفیف",
      date: "7 بهمن 1402",
    },
    {
      title: "پرفروش ترین محصولات امروز رو دیدی؟",
      description: "تا 40% تخفیف",
      date: "7 بهمن 1402",
    },
    {
      title: "پرفروش ترین محصولات امروز رو دیدی؟",
      description: "تا 40% تخفیف",
      date: "7 بهمن 1402",
    },
    {
        title: "پرفروش ترین محصولات امروز رو دیدی؟",
        description: "تا 40% تخفیف",
        date: "7 بهمن 1402",
      },
      {
        title: "پرفروش ترین محصولات امروز رو دیدی؟",
        description: "تا 40% تخفیف",
        date: "7 بهمن 1402",
      },
      {
        title: "پرفروش ترین محصولات امروز رو دیدی؟",
        description: "تا 40% تخفیف",
        date: "7 بهمن 1402",
      },
      {
        title: "پرفروش ترین محصولات امروز رو دیدی؟",
        description: "تا 40% تخفیف",
        date: "7 بهمن 1402",
      },
  ];

  return (
    <div className="w-9/12 h-[100%] bg-gray-100  border-solid border-2 border-black rounded-3xl p-5 space-y-5 dark:bg-darkBg">
      <ScrollShadow hideScrollBar className="h-full flex flex-col gap-2">
      {formContent.map((item, index) => (
        <div
          key={index}
          className="items-center  bg-white border-solid border-2 p-5 border-primaryLight rounded-2xl dark:border-primaryDark dark:bg-slate-600"
        >
          <div className="flex ">
            <div className="ml-5 mb-5">
              <UserNotificationListSvg />
            </div>
            <span className="font-semi text-base xl:font-bold xl:text-lg dark:text-gray-300">{item.title}</span>
          </div>
          <div className="flex flex-col mt-5 xl:flex-row justify-between">
            <p className="font-base text-gray-400">{item.description}</p>
            <span className="font-medium text-base xl:text-lg dark:text-white">{item.date}</span>
          </div>
        </div>
      ))}
      </ScrollShadow>
    </div>
  );
};

export default notificationsForm;
