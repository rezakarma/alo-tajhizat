import Link from "next/link";
import SocialIcon from "../utils/socialIcon";

export default function footerSocialIcon() {
  return (
    <div className="mt-8">
      <div class=" bg-gray-200 border-b-2 w-1/3 lg:mr-20 lg:w-[30rem]  "></div>
      <div className=" flex flex-row py-2 text-white lg:flex lg:flex-row lg:mt-5 lg:text-white ">
      <SocialIcon className='justify-center gap-2 w-1/3  md:gap-3 md:mt-5  xl:gap-10 lg:w-2/3 ' color='fill-white  hover:fill-primaryYellow transition-all'/>
      </div>
    </div>
  );
}
