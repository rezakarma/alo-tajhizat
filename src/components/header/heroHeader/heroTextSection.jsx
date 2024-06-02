import headerSVG from "../../../../public/assets/headerSVG.svg";
import Image from "next/image";
import HeroButtons from "./heroButtons";
import HeroHeaderCart from "./heroHeaderCart";

import img1 from "../../../../public/assets/imgHeaderCart1.jpg";
import img2 from "../../../../public/assets/imgHeaderCart2.jpg";
import img3 from "../../../../public/assets/imgHeaderCart3.webp";
import SocialIcon from "@/components/utils/socialIcon";

const HeroTextSection = () => {
  return (
    <div className="">
      <div className="flex flex-col-reverse lg:flex-row xl:w-4/5 lg:m-auto justify-center lg:gap-36 ">
        <div className="flex flex-col justify-center items-center gap-10 lg:gap-5 lg:mt-12">
          <h1 className=" font-bold text-4xl  xl:text-6xl dark:text-primaryYellow">
            سفارش آنلاین
            <span className="text-primary"> تجهیزات</span>
          </h1>
          <p className=" w-11/12 text-center xl:text-right xl:w-[522px] xl:h-auto text-2xl">
            به راحتی و به صورت انلاین تمام تجهیزات سینمایی حرفه ای و غیر حرفه ای
            را به راحتی اجاره کنید و در محل مورد خود ان را تحویل بگیرید، تمامی
            تجهیزات در سایت موجود است و میتوانید به راحتی از بین محصولات انتخاب
            کنید
          </p>
          <HeroButtons />
        </div>
        <Image src={headerSVG} alt="svg" className="md:w-96 md:mx-auto" />
      </div>
      <div className="flex flex-col mt-5 lg:flex-row lg:w-11/12 lg:mx-auto justify-evenly lg:gap-8">

      <HeroHeaderCart img={img1} title='اجاره تجهیزات' buttonTitle='مشاهده' href='/equipment-rental'/><HeroHeaderCart img={img2} title='خرید و فروش' buttonTitle='مشاهده' href='/equipment-rental'/><HeroHeaderCart img={img3} title='آفیش عوامل' buttonTitle='مشاهده' href='/equipment-rental'/>
      </div>
      <SocialIcon className='w-11/12 mx-auto mt-8 justify-center gap-10 ' color='fill-black mb-7 dark:fill-white dark:hover:fill-primaryYellow hover:fill-primary hover:scale-110 transition-all duration-200'/>
    </div>
  );
};

export default HeroTextSection;
