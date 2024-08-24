"use client";

import {Slider} from "@nextui-org/react";
import FilteringAccording from "./filteringAccordings";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteringAction } from "@/store/filtering-slice";
import useDebounce from '../../../../hooks/useDebounce'
import { useSearchParams } from "next/navigation";




const ProductsFiltering = () => {
    const [priceRange , setPriceRange] = useState()
    const reduxDispatch = useDispatch();
    const debouncedPrice = useDebounce(priceRange)
    const searchParams = useSearchParams();
    
    const readQuery = useSelector((state) => state.filtering.readQuery);
    useEffect(() => {
      if(readQuery) {

        const priceRange = searchParams.get("priceRange");
        if(priceRange){
          const arrayPrice = priceRange.split(",");
          setPriceRange(arrayPrice)

        }
      }
    },[readQuery])

    useEffect(() => {
      if(debouncedPrice){

        reduxDispatch(filteringAction.updateQueryParams({ key: "priceRange", value: debouncedPrice }));
      }
    },[debouncedPrice])

    const priceChangeHandler = (price) => {
      console.log('this line was rann')
        //  reduxDispatch(filteringAction.updateQueryParams({ key: "priceRange", value: price }));
      setPriceRange(price)
        
    };
    
    return ( 
        <div className="w-1/5 min-h-screen mb-10 dark:text-primaryYellow dark:bg-primaryDark2 shadow-xl rounded-3xl sticky top-0">
            <div className="mt-10">
            <Slider 
      label="قیمت:"
      step={100000} 
      minValue={0} 
      maxValue={10000000} 
      defaultValue={[10000, 5000000]} 
      value={priceRange}
      onChange={priceChangeHandler}
      formatOptions={{style: "currency", currency: "IRR"}}
      className="max-w-md px-5 "
    />
            </div>
            <FilteringAccording/>
        </div>
     );
}
 
export default ProductsFiltering;