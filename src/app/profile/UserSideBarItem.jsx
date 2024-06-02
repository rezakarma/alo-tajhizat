"use client";
import React from "react";
import ArrowFilteringSvg from "../../../public/assets/equipmentRental/productSection/arrowFilteringSvg";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

const UserSideBarItem = (props) => {
  return (
    <li className=" w-[80%] flex flex-col  justify-center item text-black gap-5 dark:text-white dark:hover:text-primaryYellow hover:scale-110 hover:text-primary hover:transition-all hover:duration-1000">
      <div className="flex items-center justify-between">
        <Link
          href={props.href}
          className="flex gap-2 items-center justify-center text-xl font-semibold"
        >
          <div>{props.svg}</div>
          {props.title}
        </Link>
        <ArrowFilteringSvg />
      </div>
      <Divider className="py-[1px] rounded-full" />
    </li>
  );
};

export default UserSideBarItem;
