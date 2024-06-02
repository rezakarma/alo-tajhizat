"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@nextui-org/react";
import { IoExitOutline } from "react-icons/io5";

const Sidebar = () => {
  const [openSections, setOpenSections] = useState(Array(10).fill(false)); 

  const toggleDropdown = (index) => {
    const updatedSections = [...openSections];
    updatedSections[index] = !updatedSections[index];
    setOpenSections(updatedSections);
  };

  const sidebarItems = [
    {
      title: "داشبورد",
      subItems: [
        { title: "Analytics", link: "/analytics" },
        { title: "Reports", link: "/reports" },
      ],
    },
    {
      title: "محصولات",
      subItems: [
        { title: "اضافه کردن محصولات", link: "/admin/product/addProduct" },
        { title: "تنظیمات اضافه کردن محصولات", link: "/admin/product/addProductSettings" },
      ],
    },
    {
      title: "سفارشات",
      subItems: [
        { title: "همه سفارشات", link: "/admin/orders/allorders" },
        { title: "در دست اقدام", link: "/admin/orders/pending" },
        { title: "در انتظار تایید", link: "/admin/orders/inactive" },
      ],
    },
    {
      title: "کاربران",
      subItems: [{ title: "همه کاربران", link: "/admin/users/allusers" }],
    },
    {
      title: "پیام ها",
      subItems: [{ title: "همه پیام ها", link: "/admin/notification/allNotification" }],
    },
  ];

  return (
    <aside className="bg-primaryDark  w-full h-full">
      <div className="mt-16">
        <div className="flex  justify-center items-center">
          <Avatar
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            className="w-20 h-20 text-large"
          />
        </div>
        <h2 className="text-gray-100 font-medium text-lg cursor-pointer py-5 px-6 flex items-center justify-between">
          <Link href="/admin">حساب کاربری</Link>
        </h2>
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => toggleDropdown(index)}
              className="text-gray-100 font-medium text-lg cursor-pointer py-5 px-6 flex items-center justify-between "
            >
              {item.title}
              <span>{openSections[index] ? "-" : "+"}</span>
            </div>
            {openSections[index] && (
              <ul className="pl-12">
                {item.subItems.map((subItems, subIndex) => (
                  <li key={subIndex} className="py-2 text-gray-100 mr-10">
                    <Link href={subItems.link}>{subItems.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="mr-5 mt-20 text-gray-100 font-medium text-lg ">
        <Link  href='/'><IoExitOutline viewBox="0 90 600 600" size={50} /> </Link>
      </div>
    </aside>
  );
};


export default Sidebar;
