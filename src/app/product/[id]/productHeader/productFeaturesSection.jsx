import ProductFeaturesSvg1 from "../../../../../public/assets/product/features/productFeaturesSvg1";
import ProductFeaturesSvg2 from "../../../../../public/assets/product/features/productFeaturesSvg2";
import ProductFeaturesSvg3 from "../../../../../public/assets/product/features/productFeaturesSvg3";
import ProductFeaturesSvg4 from "../../../../../public/assets/product/features/productFeaturesSvg4";
import ProductFeaturesSvg5 from "../../../../../public/assets/product/features/productFeaturesSvg5";
import { Divider } from "@nextui-org/react";

const list = [
  { title: "پرداخت در محل", svg: <ProductFeaturesSvg1 /> },
  { title: "ضمانت اصالت کالا", svg: <ProductFeaturesSvg2 /> },
  { title: "پس گرفتن کالا در محل", svg: <ProductFeaturesSvg3 /> },
  { title: "پشتیبانی در هر زمان", svg: <ProductFeaturesSvg4 /> },
  { title: "ارسال اکسپرس در محل", svg: <ProductFeaturesSvg5 /> },
];
const ProductFeaturesSection = () => {
  return (
    <div className="flex flex-col gap-5 my-5  lg:w-full dark:bg-slate-800 ">
      <div className="flex justify-around w-[100%] ">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center "
          >
            {item.svg}
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <Divider className="my-2 h-1 rounded-full w-[96%] mx-auto" />
    </div>
  );
};

export default ProductFeaturesSection;
