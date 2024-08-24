"use client";

import { useEffect, useState } from "react";
import YellowCircleArrow from "../../../../../public/assets/yellowCircleArrow";
import ProductDecreaseIncrease from "./productDecreaseIncrease";
import { Card, Skeleton, Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Plus } from "lucide-react";
import { addProduct } from "@/store/cart-slice";
import { useDispatch } from "react-redux";
const Product = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [produts, setProducts] = useState();
  const dispatch = useDispatch();
  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  const addToCartHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(addProduct(props.id));
  };

  return (
    <>
      {isLoaded && (
        <div className="flex flex-col gap-3 ">
          <Card
            className="w-[250px] h-[250px]  space-y-5 p-4 rounded-[25px]"
            radius="lg"
          >
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-gray-400"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-gray-300"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-gray-400"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-gray-300"></div>
              </Skeleton>
            </div>
          </Card>
          {/* <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={toggleLoad}
            >
            {isLoaded ? "Show" : "Hide"} Skeleton
            </Button> */}
        </div>
      )}
      {!isLoaded && (
        // <Link className="z-1" href={`/product/${props.id}`}>
          <div className={`flex flex-col gap-3  ${props.className}`}>
            <div className="group flex flex-col dark:bg-primaryDark2 w-64 h-64 shadow-lg rounded-[25px] hover:scale-105 transition-all hover:shadow-2xl">
              <img
                src={`${props.img}`}
                className="w-full h-3/4 rounded-tl-[25px] rounded-tr-[25px] border-2 border-primary dark:border-primaryYellow dark:bg-slate-600 group-hover:border-primaryLight object-contain"
                alt="product"
              />
              <div className="w-full h-1/4 rounded-bl-[25px] rounded-br-[25px]">
                <div className="flex justify-center mt-1.5  ">
                  <span className="font-bold">{props.title}</span>
                  {/* <ProductDecreaseIncrease /> */}
                </div>
                <div className="flex justify-center items-center gap-5 -mt-2">
                  <h6>
                    <span>{props.price}</span> تومان
                  </h6>
                  {/* <YellowCircleArrow className="w-[25px] w-[25px]" /> */}
                  <Button
                    className="mt-2 z-10"
                    color="primary"
                    size="sm"
                    radius="large"
                    onClick={addToCartHandler}
                  >
                    <ShoppingCart /> <Plus />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        // </Link>
      )}
    </>
  );
};

export default Product;
