import React from "react";
import FormUs from "./FormUs";
import SocialUs from "./SocialUs";
import TextUs from "./TextUs";
import Image from "next/image";
import contactSvg from "../../../public/assets/contactSvg/contactSvg.svg";

function Main() {
  return (
    <>
      <div className="">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-evenly items-center  ">
          <div className="lg:w-[25%] ">
            <TextUs />
          </div>
          <div className="lg:w-[25%]">
            <Image src={contactSvg} alt="svg" className=" " />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-evenly items-center  ">
          <div className="h-[30%] lg:w-[30%]">
            <FormUs />
          </div>
          <div className="h-[20%] lg:w-[20%]">
            <SocialUs />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
