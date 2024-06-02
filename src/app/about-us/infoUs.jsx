import Image from "next/image";
import ContactSvg from "../../../public/assets/aboutUsSvg/svg.svg";

function infoUs() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row justify-evenly items-center   ">
      <Image className="w-9/12 lg:w-2/6  " src={ContactSvg} alt="" />
      <div className="flex flex-col  h-[30rem] gap-5 lg:h-60 md:w-[50%] lg:w-[50%] ">
        <div class="border-b-8 w-9/12 mx-auto border-primaryLight lg:mx-0 lg:mb-5 lg:w-80 "></div>
        <p className="text-xl w-11/12 mx-auto font-base text-center lg:mx-0 lg:text-right   ">
          شرکت الو تجهیزات در سال 1398 با هدف گرد اوری فضایی حرفه ای برای پاسخ
          به نیازمندی های تولید کنندگان محتوا در سطوح مختلف اعم از سینما .
          تلویزون ، سینمای خانگی ، بلاگر ها ، یوتیوبر ها ، استریمر ها ، مستند
          ساز ها ، عکاس ها ، فیلم بردار ها ، کارگردان ها و... تاسیس شده است ، در
          طی این سال ها هدف ما ارائه خدمات با کیفیت و در عین حال مقرون به صرفه
          به مشتریان بوده است اکنون در سال 1402 با فراهم اوردن بستری انلاین برای
          سفارش تجهیزات بدون نیاز به مراجعه حضوری و ارسال به موقعیت شما و تحویل
          درب منزل توانستیم یک قدم به این هدف نزدیک شویم
        </p>
      </div>
    </div>
  );
}

export default infoUs;
