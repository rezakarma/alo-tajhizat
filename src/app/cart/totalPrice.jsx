"use client"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Button} from "@nextui-org/button";
import { useSelector } from "react-redux";
import OrderSetting from "./orderSetting";
const TotalPrice = () => {
  const cartProducts = useSelector(state => state.cart.products)

  const totalProductNumber = cartProducts.reduce((sum,item) => {
    return sum + item.count
  },0)

  const totalProductPrice = cartProducts.reduce((sum,item) => {
    return sum + (item.product.rentPrice * item.count)
  },0)

  return (
    <Card className="w-[20%] p-8 font-bold text-lg gap-5 dark:bg-primaryDark2" shadow="sm">
      <div className="flex gap-2 justify-evenly">
        <span>تعداد کالا ها: </span>
        <span>{totalProductNumber}</span>
      </div>
      <Divider />
      <div className="flex gap-2 justify-evenly">
        <span>جمع سبد خرید:</span>
        <span>{totalProductPrice}</span>
      </div>
      <OrderSetting/>
      
    </Card>
  );
};

export default TotalPrice;
