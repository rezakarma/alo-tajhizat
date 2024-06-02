import { Image } from "@nextui-org/react";
import ImageModal from "./imageModal";
import { useState } from "react";

const proData = [
  {
    img: "https://cdn.discordapp.com/attachments/1159570679620964383/1191687343304884366/camera.webp?ex=65a65853&is=6593e353&hm=9c632389fadbf0e73835dd78dfbf10d96a919e9e22ddebc243734dc15378e642&",
    key: "1",
  },
  {
    img: "https://nextui-docs-v2.vercel.app/images/album-cover.png",
    key: "2",
  },
  {
    img: "https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
    key: "3",
  },
  {
    img: "https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg",
    key: "4",
  },
  {
    img: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
    key: "5",
  },
];

const ProductHeaderImageSection = () => {
  const [pickedImage, setPickedImage] = useState(0);
  const displayedImages = proData.slice(0, 4);
  return (
    <div className="w-11/12 mx-auto lg:w-1/3">
      <div>
        <Image
          className=" w-[400px] h-[400px] object-contain"
          src={displayedImages[pickedImage].img}
          alt="product"
        />
      </div>
      <div className="h-28  lg:w-[470px] flex items-center justify-start px-3 gap-3 overflow-x-auto bg-[#EEEEEE] dark:bg-slate-600 rounded-2xl">
        {displayedImages.map((item, index) => (
          <Image
            key={index}
            className="w-[80px] h-[80px] rounded-xl object-cover"
            alt="NextUI Fruit Image with Zoom"
            src={item.img}
            onClick={() => setPickedImage(index)}
          />
        ))}
        <ImageModal
          OpenerbgImage={proData[4].img}
          images={proData}
          title="دوربین سونی مدل alpha 7r 3"
        />
      </div>
    </div>
  );
};

export default ProductHeaderImageSection;
