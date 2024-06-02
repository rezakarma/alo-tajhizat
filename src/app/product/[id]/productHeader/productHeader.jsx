import { Image } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import ImageModal from "./imageModal";
import { useState } from "react";
import ProductHeaderImageSection from "./producHeaderImageSection";
import ProductHeaderTextSection from "./productHeaderTextSection";
import ProductHeaderCardSection from "./productHeaderCardSection";
import ProductFeaturesSection from "./productFeaturesSection";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";

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

const ProductHeader = () => {
  const [pickedImage, setPickedImage] = useState(0);
  const pathName = usePathname();
  console.log(pathName);
  const separatedPath = pathName.split("/");
  console.log(separatedPath);
  const displayedImages = proData.slice(0, 4);
  return (
    <>
        <div className="mr-12 mt-5 text-xl">
          <Link href='/'>product / </Link>
          <Link className="font-bold" href={pathName}>{separatedPath[separatedPath.length -1]}</Link>
        </div>
      {/* <h1>http://alo-tajhizat/{pathName}</h1> */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row justify-evenly">
          <ProductHeaderImageSection />
          <ProductHeaderTextSection />
          <ProductHeaderCardSection />
        </div>
        <ProductFeaturesSection />
        {/* <Divider className="mb-4 h-1 rounded-full w-[95%] mx-auto" /> */}
      </div>
    </>
  );
};

export default ProductHeader;
