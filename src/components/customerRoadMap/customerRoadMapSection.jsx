"use client";

import React, { useState, useRef, useEffect } from 'react';
import RoadMapFleshSvg from "../../../public/assets/roadMapSvg/roadMapFleshSvg";
import RoadMapSvg1 from "../../../public/assets/roadMapSvg/roadMapSvg1";
import RoadMapItem from "./roadMapItem";
import RoadMapAbstractSvgs from './roadMapAbstractSvgs';

const CustomerRoadMap = () => {

  const elementRef = useRef(null);
  const [topOffset, setTopOffset] = useState();
  const [adjustedValues, setAdjustedValues] = useState([]);


  useEffect(() => {
    if (elementRef.current) {
      const { offsetTop } = elementRef.current;
      setTopOffset(offsetTop)

      const adjusted1 = offsetTop + 2000;
      const adjusted2 = offsetTop + 100;
      const adjusted3 = offsetTop + 50;

      // Update state variable with array of adjusted values
      setAdjustedValues([adjusted1, adjusted2, adjusted3]);
      
    }
  }, []);

 

  

    return ( 
        <div className="flex flex-col w-11/12 mx-auto xl:mx-0 xl:flex-row xl:w-[100%] xl:h-screen bg-bgGray dark:bg-darkBg  justify-center items-center ">
            <div ref={elementRef} className=" flex-col lg:flex-row lg:w-11/12 lg:h-11/12  dark:bg-primaryDark rounded-3xl bg-white flex justify-center items-center reletive">
                <RoadMapItem svg={<RoadMapSvg1/>} title='تحویل در محل' description='با خیال راحت تجهیزات مورد نیاز خود را در محل مورد نظرتان تحویل بگیرید بدون نیاز به مراجعه حضوری و پیمودن مسافت طولانی در ترافیک شهری'/>
                <RoadMapFleshSvg/>
                <RoadMapItem svg={<RoadMapSvg1/>} title='ثبت سفارش' description='پس از انتخاب تجهیزات مورد نیاز خود میتوناید سفارش خود را ثبت کنید و در سریع ترین زمان مورد بررسی قرار میگیرد جهت امکان سنجی'/>
                <RoadMapFleshSvg/>
                <RoadMapItem svg={<RoadMapSvg1/>} title='انتخاب تجهیزات' description='از میان انبوهی از تجهیزات دوربین ، نور، صدا، سه پایه، گیره، لوازم جانبی، مصرفی ها و... نیازمندی های خودتان را انتخاب کنید'/>

 
            </div>
                <RoadMapAbstractSvgs/>
        </div>
     );
}
 
export default CustomerRoadMap;