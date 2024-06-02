"use client";

import FooterSearchBar from "./footerSearchBar";
import FooterNavList from "./footerNavList";
import FooterSocialIcon from "./footerSocialIcon";

export const Footer = () => {
  return (
    <>
      <div className="bg-[#1f6777] h-[40rem] w-[100%] dark:bg-primaryDark2 inset-x-0  pt-10 text-gray-300 lg:grid lg:grid-cols-2 xl:h-[27rem] ">
        <FooterNavList />
        <FooterSearchBar />
        <FooterSocialIcon />
      </div>
    </>
  );
};
