"use client";

import Link from "next/link";

function FooterNavList() {
  const list = [
    { id: 1, title: "اجاره تجهیزات", href: "/equipment-rental" },
    { id: 2, title: "خرید و فروش", href: "/buy-sell" },
    { id: 3, title: "انجام پروژه", href: "/project-order" },
    { id: 4, title: "آفیش عوامل", href: "/agent-poster" },
    { id: 5, title: "سوییچ و لایو", href: "/switch-live" },
    { id: 6, title: "محصولات", href: "/product" },
    { id: 7, title: "درباره ما", href: "/about-us" },
    { id: 8, title: "تماس باما", href: "/contact-us" },
    { id: 9, title: "ثبت نام", href: "/sign-up" },
    { id: 10, title: "ورود", href: "/login" },
  ];

  return (
    <>
      <ul className=" flex flex-col grid grid-cols-2 text-gray-300 text-sm mr-12 pt-2  xl:px-4 xl:pt-10 xl:mr-5 xl:mt-5  xl:flex-row xl:gap-3 xl:grid-cols-5 xl:w-4/5  xl:text-base">
        {list.map((item) => (
          <li
            key={item.id}
            className=" border-r-4 border-[#389eac] mb-2 lg:border-r-4 md:h-7 lg:mb-5  xl:py-2 xl:grid-cols-6  "
          >
            <Link className="mr-1 hover:text-primaryLight transition-all xl:mr-3 xl:hover:text-primaryLight xl:transition-all" href={item.href}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FooterNavList;
