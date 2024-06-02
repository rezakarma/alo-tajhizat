"use client";

import {Slider} from "@nextui-org/react";
import FilteringAccording from "./filteringAccordings";





const ProductsFiltering = () => {
    
    return ( 
        <div className="w-1/5 h-[800px] dark:text-primaryYellow dark:bg-primaryDark2 shadow-2xl rounded-3xl ">
            <div className="mt-10   ">
            <Slider 
      label="قیمت:"
      step={100000} 
      minValue={0} 
      maxValue={10000000} 
      defaultValue={[10000, 5000000]} 
      formatOptions={{style: "currency", currency: "IRR"}}
      className="max-w-md px-5 "
    />
            </div>
            <FilteringAccording/>
        </div>
     );
}
 
export default ProductsFiltering;