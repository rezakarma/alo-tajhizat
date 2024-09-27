"use client";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavbarItem from "./navbarItem";
import { auth } from "@/auth";
import logo from "../../../../public/assets/logo.png";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import UserButton from "@/components/auth/user-button";
import { Badge } from "@nextui-org/react";
import { useSelector } from "react-redux";
// import useUser from '@/hooks/useCurrentUser'
// const list = [
//     { id: 1, title: "اجاره تجهیزات", href: "/equipment-rental" },
//     { id: 2, title: "خرید و فروش", href: "/buy-sell" },
//     { id: 3, title: "انجام پروژه", href: "/project-order" },
//     { id: 4, title: "آفیش عوامل", href: "/agent-poster" },
//     { id: 5, title: "سوییچ و لایو", href: "/switch-live" },
//     { id: 6, title: "محصولات", href: "/product" },
//     { id: 7, title: "درباره ما", href: "/about-us" },
//     { id: 8, title: "تماس باما", href: "/contact-us" },
//     { id: 9, title: "ثبت نام", href: "/sign-up" },
//     { id: 10, title: "ورود", href: "/login" },
//   ];

const navbarData = [
  { id: 3, text: "اجاره تجهیزات", link: "/equipment-rental", isPrimary: false },
  { id: 4, text: "خرید و فروش", link: "/buy-sell", isPrimary: false },
  { id: 5, text: "انجام پروژه", link: "/project-order", isPrimary: false },
  { id: 6, text: "آفیش عوامل", link: "/agent-poster", isPrimary: false },
  { id: 7, text: "سوییچ و لایو", link: "/switch-live", isPrimary: false },
  { id: 8, text: "تماس باما", link: "/contact-us", isPrimary: false },
];

const navbarUnauthorizedData = [
  { id: 1, text: "ثبت نام", link: "/signup", isPrimary: true },
  { id: 2, text: "ورود", link: "/login", isPrimary: false },
];
//hover:text-primary hover:underline decoration-2  underline-offset-4 decoration-primary transition-all duration-250

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  const cartProducts = useSelector(state => state.cart.products)
  // const user = useCurrentUser()
  const session = useSession();

  // console.log(user)

  const homeNavHandler = () => {
    if (pathname === "/") {
      return;
    }
    return <NavbarItem isPrimary={false} text="خانه" link="/" />;
  };

  const defaultClass = "w-auto flex justify-around items-center";
  return (
    <div className="hidden w-full px-3 lg:flex justify-between pt-3 dark:bg-darkBg ">
      <ul className="w-full h-10 flex justify-start gap-10">
        {session.status === "authenticated" && <UserButton />}

        {session.status === "unauthenticated" &&
          navbarUnauthorizedData.map((item) => {
            return (
              <div
                className={
                  item.isPrimary
                    ? "w-max px-5 py-4 flex justify-center items-center bg-primary text-white rounded-full dark:text-white hover:bg-primaryDark transition-all duration-250 lg:text-base md:text-sm sm:text-xs"
                    : "w-max  flex justify-center items-center relative cursor-pointer transition-all duration-500 before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-primary  hover:before:w-full hover:before:opacity-100 hover:text-primaryDark lg:text-base md:text-sm sm:text-xs "
                }
                key={item.id}
              >
                <NavbarItem
                  isPrimary={item.isPrimary}
                  text={item.text}
                  link={item.link}
                />
              </div>
            );
          })}

        {navbarData.map((item) => {
          return (
            <div
              className={
                item.isPrimary
                  ? "w-max px-5 py-4 flex justify-center items-center bg-primary text-white rounded-full dark:text-white hover:bg-primaryDark transition-all duration-250 lg:text-base md:text-sm sm:text-xs"
                  : "w-max  flex justify-center items-center relative cursor-pointer transition-all duration-500 before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-primary  hover:before:w-full hover:before:opacity-100 hover:text-primaryDark lg:text-base md:text-sm sm:text-xs "
              }
              key={item.id}
            >
              <NavbarItem
                isPrimary={item.isPrimary}
                text={item.text}
                link={item.link}
              />
            </div>
          );
        })}

        <div
          className="w-max  flex justify-center items-center relative cursor-pointer transition-all duration-500 before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-primary  hover:before:w-full hover:before:opacity-100 hover:text-primaryDark lg:text-base md:text-sm sm:text-xs "
          key="home"
        >
          {homeNavHandler()}
        </div>
      </ul>
     {session.status === "authenticated" && <Link href={'/cart'}>
      <Badge content={cartProducts.length} color="danger">
        <ShoppingCart />
      </Badge>
      </Link>}
      <div>
        <img
          className="w-auto h-9 ml-0 rounded-full"
          src="https://cdn.discordapp.com/attachments/1159570679620964383/1177191601995530240/logo_neon_bi_face.png?ex=65719c1d&is=655f271d&hm=c03e02c2dd441f329815d1fde446e858bd7324763cf2cc97c94f90291f532eae&"
        />
      </div>
    </div>
  );
};

export default Navbar;
