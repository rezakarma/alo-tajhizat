"use client";

import HeroTextSection from "./heroHeader/heroTextSection";
import Navbar from "./navbar/navbar";

const Header = (props) => {
  return (
    <section className="bg-bgGray dark:bg-darkBg xl:w-full xl:h-screen">
      <Navbar />
      <HeroTextSection/>
    </section>
  );
};

export default Header;
