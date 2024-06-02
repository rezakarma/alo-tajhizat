"use client"

import Product from "@/app/equipment-rental/productsSection/productsContainer/product";
import { Children, useRef, useState } from "react";
import { current } from "@reduxjs/toolkit";
import { Card, CardBody, Image } from "@nextui-org/react";
import RightArrowSvg from "../../../public/assets/product/rightArrowSvg";
import LeftArrowSvg from "../../../public/assets/product/leftArrowSvg";

const ProductContainerWithScoroll = (props) => {
    
    const productContainerRef = useRef(null);
    const [currentScrollPosition , setCurrentScrollPosition] = useState(0);
    const scrollLeft = () => {
        if (productContainerRef.current) {
            setCurrentScrollPosition(() => productContainerRef.current.scrollLeft)
            console.log(productContainerRef.current.scrollLeft);
            console.log(currentScrollPosition);

            const newScrollPOsition= currentScrollPosition - 250
            console.log(newScrollPOsition)
            productContainerRef.current.scrollLeft -= 250// Adjust the scroll amount as needed
            setCurrentScrollPosition(productContainerRef.current.scrollLeft)
        }
      };
    
      const scrollRight = () => {
        if (productContainerRef.current) {
            productContainerRef.current.scrollLeft += 250; // Adjust the scroll amount as needed
        }

      };

    return ( 
        <div className="w-[95%] h-max my-5  rounded-2xl border-3 border-primary shadow-lg flex flex-col items-center justify-center px-5">
            {props.title && <div className="h-[10%] self-start flex flex-col gap-1.5 pt-2">
                <h3 className="font-bold text-xl">{props.title}</h3>
                <div className="border-b-4 w-[70%] rounded-full border-primary"></div>
            </div>}
            <div className="w-full h-[90%] flex justify-between gap-2">

            <button onClick={scrollRight}>
                <RightArrowSvg/>
            </button>
            <div ref={productContainerRef} className="flex justify-start  h-full w-full  items-center py-5 gap-5 overflow-x-auto snap-x">
           {props.children}
            </div>
            <button onClick={scrollLeft} className="justify-items-end">
                <LeftArrowSvg/>
            </button>
            </div>
        </div>
     );
}
 
export default ProductContainerWithScoroll;