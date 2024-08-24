"use client"
import { Image } from "@nextui-org/react";
import ImageModal from "./imageModal";
import { useState } from "react";



const ProductHeaderImageSection = ({images,title}) => {
  const [pickedImage, setPickedImage] = useState(0);
  const displayedImages = images.slice(0, 4);
  return (
    <div className="w-11/12 mx-auto lg:w-1/3">
      <div>
        <Image
          className=" w-[400px] h-[400px] object-contain"
          src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${images[pickedImage]}`}
          alt="product"
        />
      </div>
      <div className="h-28  lg:w-[470px] flex items-center justify-start px-3 gap-3 overflow-x-auto bg-[#EEEEEE] dark:bg-slate-600 rounded-2xl">
        {displayedImages.map((item, index) => (
          <Image
            key={index}
            className="w-[80px] h-[80px] rounded-xl object-cover"
            alt="NextUI Fruit Image with Zoom"
            src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${item}`}
            onClick={() => setPickedImage(index)}
          />
        ))}
        <ImageModal
          OpenerbgImage={images[0]}
          images={images}
          title={title}
        />
      </div>
    </div>
  );
};

export default ProductHeaderImageSection;
