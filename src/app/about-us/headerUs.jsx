import Image from "next/image";
import aboutSvg from "../../../public/assets/aboutUsSvg/aboutSvg.svg"

function headerContact() {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-evenly items-center  ">
      <div className=" h-[15rem] lg:w-2/5  ">
        <h2 className="font-bold text-2xl text-center dark:text-primaryYellow lg:text-right lg:text-6xl  ">
          درباره <span className="text-primaryLight ">ما</span>
        </h2>
        <div class="my-5 w-9/12 border-b-8 rounded-full lg:w-80 border-primaryLight mx-auto lg:mx-0 "></div>
        <p className="text-lg w-9/12 mx-auto font-medium text-center lg:mx-0 lg:w-2/3 lg:text-right ">
          هدف ما راحت سازی امکان دسترسی به تجهیزات به روز برای تولید متحوای حرفه
          ای است
        </p>
      </div>
        <Image src={aboutSvg} alt="about-us" className=" lg:w-2/5 "/>
    </div>
  );
}

export default headerContact;
