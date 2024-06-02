"use client";


import localFont from "@next/font/dist/local";
import Link from "next/link";
import ThemeSwitcher from "@/components/utils/themeSwitcher";

const NavbarItem = (props) => {
 

    const primaryHandler = () => {
        return props.isPrimary ? 'text-center text-white w-max' : 'text-center  text-black w-max dark:text-white dark:hover:text-primaryYellow hover:text-primaryDark';
    
        // if(props.isPrimary === true){
        //     return 'bg-blue-500 text-white'
        // } else {
        //     return 'text-center  text-black'
        // }
    }
  return (
  
<li className={`${primaryHandler()}`}>
      <Link href={props.link}>{props.text}</Link>
    </li>
  );
};

export default NavbarItem;
