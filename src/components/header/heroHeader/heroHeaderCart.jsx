import Image from "next/image";
import img1 from "../../../../public/assets/imgHeaderCart1.jpg";
import img2 from "../../../../public/assets/imgHeaderCart2.jpg";
import img3 from "../../../../public/assets/imgHeaderCart3.webp";
import PrimaryButton from "@/components/button/primaryButton";

const HeroHeaderCart = (props) => {
  return (
    <div className="w-11/12 mx-auto mt-10 h-16 md:w-1/2 xl:w-4/12 xl:h-24 rounded-[30px] bg-white  hover:scale-110 transition-all duration-200 dark:bg-primary dark:hover:bg-primaryLight ">
      <div className="flex w-full h-full justify-center gap-12 relative">
        <Image
          src={props.img}
          alt="image"
          className="w-16 h-16 xl:w-24 xl:h-24 rounded-full border-4 border-primary object-cover mt-[-35px]"
        />
        <h1 className="text-xl xl:text-2xl my-auto font-bold">{props.title}</h1>
        <PrimaryButton title={props.buttonTitle} href={props.href} className="bg-primary text-sm w-20 h-12 font-bold rounded-full text-white my-auto dark:bg-primaryDark hover:bg-primaryDark transition-all "/>
      </div>
    </div>
  );
};

export default HeroHeaderCart;
