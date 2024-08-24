"use client";

// import ProductsNav from "./productsNav";
// import Camera from "./camera.png";
// import Image from "next/image";
// import SearchBar from "@/components/utils/shearchBar";
// import HeaderProductChanger from "./headerProductChanger";
// import HeaderProductInfo from "./headerProductInfo";
// import HeaderBrands from "./headerBrands";
// import PrimaryButton from "@/components/button/primaryButton";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import HeaderImage from "./headerImage";

// const MainHeader = () => {
//   const [productNumber, setProductNumber] = useState(0);

//   const [isVisible, setIsVisible] = useState(false);

//   const [animationKey, setAnimationKey] = useState(0);
//   const [debouncedClick, setDebouncedClick] = useState(false);

// const products = useSelector((state) => state.products.products)

// let bgNumberArray;
// let imageStyle;

// const bgNumberCreator = () => {
//   let bgNumber;
//   if(productNumber <= 9){
//     bgNumber = '0' + (productNumber +1).toString()
//   }else {
//     bgNumber = (productNumber + 1).toString();
//   }
//    bgNumberArray =bgNumber.split('');
//    imageStyle= 'fade-in'
// }

// bgNumberCreator();

// useEffect(() => {

//     setIsVisible(true); // Trigger fade-in effect after the image source is updated

// }, [productNumber]);

// const increaseProductHandler = () => {
//   setIsVisible(false)
//   setTimeout(() => {
//     if(productNumber === products.length -1){
//       setProductNumber(0)
//     }else {
//       setProductNumber(state => state + 1);
//     }
//     console.log(productNumber);
//     bgNumberCreator();
//     // setDebouncedClick(true)
//     setAnimationKey(animationKey + 1);

//   }, 500); // Adjust the delay as needed

// }

// const handleAnimationEnd = () => {
//   setIsVisible(false);
// };

// const decreaseProductHnadler = () => {
//   if(productNumber === 0){
//     setProductNumber(products.length -1);
//   } else {
//     setProductNumber(state => state -1);
//   }
//   console.log(productNumber);
// }

// const handleImageLoad = () => {
//   setIsVisible(false);
// };

//   return (
//     <div className="w-full h-[91%]">
//     <div className="w-full h-[85%] flex">
//       <div className="w-3/5  bg-equipmentRentalGrayBg flex flex-col justify-start gap-32 items-center relative">
//         <h1 className="absolute w-auto h-[90%] text-[rgba(0,0,0,0.03)]  text-[500px] top-0 left-0 font-extrabold overflow-hidden">{bgNumberArray[1]}</h1>
//         <div className="flex mt-5">
//           <PrimaryButton href="/" title="جستجو" className="bg-primary w-32 h-12 font-bold rounded-full text-white drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)] hover:scale-110 hover:bg-primaryDark hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-150"/>
//           <SearchBar/>
//         </div>
//         <div data-te-animation-init
//   data-te-animation-start="onHover"
//   data-te-animation-reset="true"
//   data-te-animation="[fade-in-down_1s_ease-in-out]" className="w-full flex justify-center items-center gap-10">
//         <HeaderProductChanger increace={increaseProductHandler} decrease={decreaseProductHnadler} productNumber={productNumber}/>
//         <HeaderProductInfo brand={products[productNumber].brand} model={products[productNumber].model} persianTitle={products[productNumber].persianTitle} />
//         </div>
//       </div>
//       <div className="w-2/5 h-[100%] float-left gradient-background flex justify-center relative">
//         <ProductsNav className="flex flex-col items-end h-[40%] gap-8 mt-[20%] z-10" />
//         <h1 className="absolute w-auto h-[90%] text-[rgba(0,0,0,0.03)] text-[500px] z-1 right-0 top-0 font-extrabold overflow-hidden">{bgNumberArray[0]}</h1>
//       </div>
//       {/* <img className={`w-[350px] absolute left-[27%] top-[27%]  ${debouncedClick  ? 'fade-in' : ''}`} src={products[productNumber].images[0]} onAnimationEnd={handleAnimationEnd} alt="camera"/> */}
//     <HeaderImage src={products[productNumber].images[0]} onLoad={handleImageLoad} isVisible={isVisible}/>
//     </div>
//     <HeaderBrands className="h-[15%]"/>
//         </div>
//   );
// };

// export default MainHeader;

import ProductsNav from "./productsNav";
import Camera from "./camera.png";
import Image from "next/image";
import SearchBar from "@/components/utils/searchBars/shearchBar";
import HeaderProductChanger from "./headerProductChanger";
import HeaderProductInfo from "./headerProductInfo";
import HeaderBrands from "./headerBrands";
import PrimaryButton from "@/components/button/primaryButton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HeaderImage from "./headerImage";
import SearchBarWithBtn from "@/components/utils/searchBars/searcBarWithBtn";
import { Skeleton } from "@nextui-org/react";
import { ClipLoader, HashLoader } from "react-spinners";

const MainHeader = () => {
  const [productNumber, setProductNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const products = useSelector((state) => state.products.products);

  let bgNumberArray;
  let imageStyle;

  const bgNumberCreator = () => {
    let bgNumber;
    if (productNumber <= 9) {
      bgNumber = "0" + (productNumber + 1).toString();
    } else {
      bgNumber = (productNumber + 1).toString();
    }
    bgNumberArray = bgNumber.split("");
    imageStyle = "fade-in";
  };

  bgNumberCreator();
  useEffect(() => {
    setIsVisible(true); // Trigger fade-in effect after the image source is updated
  }, [productNumber]);

  const increaseProductHandler = () => {
    setIsVisible(false);
    if (productNumber === products.length - 1) {
      setProductNumber(0);
    } else {
      setProductNumber((state) => state + 1);
    }
  };

  const decreaseProductHnadler = () => {
    setIsVisible(false);
    if (productNumber === 0) {
      setProductNumber(products.length - 1);
    } else {
      setProductNumber((state) => state - 1);
    }
  };

  return (
    <div className="w-full h-[91%] ">
      <div className="w-full h-[85%] flex ">
        <div className="w-3/5  bg-equipmentRentalGrayBg dark:bg-primaryDark2 flex flex-col justify-start gap-32 items-center relative">
          <h1 className="xl:absolute w-auto h-[90%] text-[rgba(0,0,0,0.03)] dark:text-slate-600 text-[500px] top-0 left-0 font-extrabold overflow-hidden">
            {bgNumberArray[1]}
          </h1>
          <SearchBarWithBtn />
          <div className="w-full flex justify-center  items-center gap-10">
            <HeaderProductChanger
              increace={increaseProductHandler}
              decrease={decreaseProductHnadler}
              productNumber={productNumber}
            />
            {products?.length > 0 && (
              <HeaderProductInfo
                isVisible={isVisible}
                brand={products[productNumber].brand.englishBrand}
                model={products[productNumber].model}
                persianTitle={products[productNumber].title}
              />
            )}
            {products?.length === 0 && 
            <div>
              <h3 className="text-xl">کالایی پیدا نشد</h3>
            </div>
            }
            {!products && (
              <div className={`flex flex-col w-[70%] ml-52 items-end gap-4 `}>
                <Skeleton className="h-6 w-1/5 rounded-lg" />
                <Skeleton className="h-6 w-2/5 rounded-lg" />
                <Skeleton className="h-3 w-3/5 rounded-lg" />
              </div>
            )}
          </div>
        </div>
        <div className="w-2/5 h-[100%] float-left  bg-primary dark:bg-primaryDark2  flex justify-center relative">
          <ProductsNav className="flex flex-col  items-end h-[40%] gap-8 mt-[20%] z-10" />
          <h1 className="absolute w-auto h-[90%] text-[rgba(0,0,0,0.03)] text-[500px] dark:text-slate-600 z-1 right-0 top-0 font-extrabold overflow-hidden">
            {bgNumberArray[0]}
          </h1>
        </div>
        {/* <img className={`w-[350px] absolute left-[27%] top-[27%]  ${debouncedClick  ? 'fade-in' : ''}`} src={products[productNumber].images[0]} onAnimationEnd={handleAnimationEnd} alt="camera"/> */}
        {products?.length > 0 && (
          <HeaderImage
            src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${products[productNumber].images[0]}`}
            isVisible={isVisible}
          />
        )}
        {!products && (
          <div className={`w-[350px] absolute left-[27%] top-[27%]`}>
            <HashLoader color="#eaeaea" size={300} />
          </div>
        )}
      </div>
      <HeaderBrands className="h-[15%]" />
    </div>
  );
};

export default MainHeader;
