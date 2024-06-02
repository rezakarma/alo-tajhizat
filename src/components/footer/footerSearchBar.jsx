"use client";

import SearchBar from "./shearchBar";

function FooterSearchBar() {
  return (
    <div className="flex flex-col gap-5 mt-10 lg:justify-center lg:items-center">
      <p className=" w-2/3 px-5  text-gray-300 text-sm font-medium dark:text-primaryYellow lg:w-11/12 lg:mt-8 lg:font-bold lg:text-2xl  xl:w-[350px]  ">
        در بین انبوهی از<span className="text-yellow-300 dark:text-primaryLight ">تجهیزات</span> موارد
        مورد نیاز خودرا پیدا کنید
      </p>
        <SearchBar />
    </div>
  );
}

export default FooterSearchBar;
