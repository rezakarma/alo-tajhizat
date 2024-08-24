"use client";

import React, { useState, useCallback, useEffect } from "react";
import ProductsNavItem from "./productsNavItem";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { filteringAction } from "@/store/filtering-slice";
import {Skeleton} from "@nextui-org/skeleton";
const navItems = [
  { title: "دوربین ها", index: 1 },
  { title: "لنز ها", index: 2 },
  { title: "تجهیزات نور", index: 3 },
  { title: "تجهیزات صدا", index: 4 },
  { title: "سه پایه و حرکتی", index: 5 },
  { title: "تجهیزات جانبی", index: 6 },
];

const ProductsNav = (props) => {
  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState([]);


  const categolyList = useSelector((state) => state.categoryList.categoryList)

  const category = useSelector((state) => state.filtering.queryParams.category, shallowEqual);
 
  useEffect(() => {
    if(category){
      setActiveItem(category)
    }
  },[category])

  useEffect(() => {
    dispatch(filteringAction.updateQueryParams({ key: "category", value: activeItem }))
  },[activeItem])


  const activeItemHandler = (id) => {
    if (activeItem.includes(id)) {
      setActiveItem((prevIds) => prevIds.filter((selectedIds) => selectedIds !== id));
    } else {
      setActiveItem((prevIds) => [...prevIds, id]);
    }
  };

  useEffect(() => {}, [activeItem]);

  return (
    <>
    <ul className={props.className}>
      {categolyList && categolyList.map((item) => (
        <ProductsNavItem
        key={item.id}
        isActive={activeItem.includes(item.id)}
        onClick={() => activeItemHandler(item.id)}
        title={item.persianCategory}
        />
      ))}
    </ul>
    {!categolyList && 
       <div className="max-w-[300px] w-full flex flex-col justify-center items-end gap-5">
         <Skeleton className="h-2 w-1/5 rounded-lg"/>
         <Skeleton className="h-2 w-2/5 rounded-lg"/>
         <Skeleton className="h-2 w-1/5 rounded-lg"/>
         <Skeleton className="h-2 w-2/5 rounded-lg"/>
         <Skeleton className="h-2 w-2/5 rounded-lg"/>
         <Skeleton className="h-2 w-1/5 rounded-lg"/>
         <Skeleton className="h-2 w-1/5 rounded-lg"/>
         <Skeleton className="h-2 w-2/5 rounded-lg"/>
         <Skeleton className="h-2 w-1/5 rounded-lg"/>
         <Skeleton className="h-2 w-2/5 rounded-lg"/>
         <Skeleton className="h-2 w-2/5 rounded-lg"/>
         <Skeleton className="h-2 w-1/5 rounded-lg"/>



     </div>
      }
      </>
  );
};

export default ProductsNav;
