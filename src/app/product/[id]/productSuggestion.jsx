import Product from "@/app/equipment-rental/productsSection/productsContainer/product";
import RightArrowSvg from "../../../../public/assets/product/rightArrowSvg";
import LeftArrowSvg from "../../../../public/assets/product/leftArrowSvg";
import { useRef, useState } from "react";
import { current } from "@reduxjs/toolkit";
import { Card, CardBody, Image } from "@nextui-org/react";
import ProductContainerWithScoroll from "@/components/utils/productContainerWithScoroll";

const ProductSuggestion = () => {
    
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
        // <div className="w-[95%] h-max my-5  rounded-2xl border-3 border-primary shadow-lg flex flex-col items-center justify-center px-5">
        //     <div className="h-[10%] self-start flex flex-col gap-1.5 pt-2">
        //         <h3 className="font-bold text-xl">محصولات دیگر:</h3>
        //         <div className="border-b-4 w-[70%] rounded-full border-primary"></div>
        //     </div>
        //     <div className="w-full h-[90%] flex justify-between gap-2">

        //     <button onClick={scrollRight}>
        //         <RightArrowSvg/>
        //     </button>
        //     <div ref={productContainerRef} className="flex h-full w-[100%] items-center py-5 gap-5 overflow-x-auto snap-x">
        //     <Product className="snap-center"/>
        //     <Product className="snap-center"/>
        //     <Product className="snap-center"/>
        //     <Product className="snap-center"/>
        //     <Product className="snap-center"/>
        //     <Product className="snap-center"/>
        //     <Product className="snap-center"/>
        //     <Product className="snap-center"/>
        //     <Product className="snap-center"/>
           
            

            
        //     </div>
        //     <button onClick={scrollLeft} className="justify-items-end">
        //         <LeftArrowSvg/>
        //     </button>
        //     </div>
        // </div>
        <ProductContainerWithScoroll  title='محصولات مشابه'>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
       
        </ProductContainerWithScoroll>
     );
}
 
export default ProductSuggestion;