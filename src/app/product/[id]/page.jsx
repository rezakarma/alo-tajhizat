"use client";

import { Suspense, useState } from 'react'
import SearchBarWithBtn from "@/components/utils/searchBars/searcBarWithBtn";
import ProductHeader from "./productHeader/productHeader";
import Navbar from "@/components/header/navbar/navbar";
import ProductFeaturesSection from "./productHeader/productFeaturesSection";
import ProductInfos from "./productInfos/productInfos";
import ProductSuggestion from "./productSuggestion";
import { Footer } from '@/components/footer/footer';

const ProductPage = () => {
  return (
    <>

    
      <div className="h-full w-[100%]">
        <div className="hidden lg:h-[65px] lg:min-h-fit lg:w-[100%] lg:z-10 lg:bg-white dark:bg-darkBg lg:flex lg:justify-center lg:items-center lg:shadow-lg">
          <Navbar />
        </div>
        <SearchBarWithBtn />
        <div>
        <ProductHeader />
        </div>
      </div>
      <div className="lg:h-full lg:w-full">
        <ProductInfos />
      </div>
      <div className="lg:h-full lg:w-full lg:flex lg:justify-center lg:mt-10">
        <ProductSuggestion />
      </div>
      <Footer/>
    </>
  );
};

export default ProductPage;
