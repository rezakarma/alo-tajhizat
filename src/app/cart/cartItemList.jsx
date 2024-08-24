"use client";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useEffect } from "react";
const CartItemList = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const cartIsLoading = useSelector((state) => state.cart.isLoading);
  console.log(cartProducts, " injah");

  return (
    <ScrollShadow className="h-screen w-[50%] p-5" size={1}>
      <div className="flex flex-col  gap-10">
        {!cartProducts || (cartIsLoading && <div>Loading...</div>)}
        {cartProducts && !cartIsLoading && cartProducts.length === 0 && (
          <h1 className="mt-20 text-2xl font-bold self-center justify-self-center place-self-center">
            سبد خرید شما خالی است.
          </h1>
        )}
        {cartProducts &&
          cartProducts.length > 0 &&
          cartProducts.map((item) => {
            return (
              <CartItem
                key={item.product.id}
                id={item.product.id}
                title={item.product.title}
                img={item.product.images[0]}
                price={item.product.rentPrice}
                count={item.count}
              />
            );
          })}
      </div>
    </ScrollShadow>
  );
};

export default CartItemList;
