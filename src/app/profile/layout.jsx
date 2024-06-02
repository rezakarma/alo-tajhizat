"use client";

import { Children } from "react";
import UserSideBar from "./sidebar";
import Navbar from "@/components/header/navbar/navbar";

const UserProfileLayout = ({ children }) => {
  return (
    <div>
      <div className="hidden xl:absolute xl:h-[65px] xl:min-h-fit xl:w-[100%] xl:z-10 xl:bg-white xl:flex xl:justify-center xl:items-center xl:shadow-lg">
        <Navbar />
      </div>
      <div className="flex flex-col xl:flex-row xl:w-[100%] h-screen">
        <div className="flex w-[100%] justify-start xl:w-1/5">
          <UserSideBar />
        </div>
        <div className=" w-full xl:w-4/5 dark:bg-gray-700 bg-bgGray flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
