import { useEffect, useState } from "react";
import Product from "./product";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Card, Skeleton } from "@nextui-org/react";

const numberOfSkeleton = 16;
const ProductsContainer = (props) => {
  return (
    <>
      {props.products?.length === 0 &&
        <div className="w-[800px] flex justify-center ">
          <h3 className="text-3xl my-32">
            کالایی یافت نشد
          </h3>
        </div>
      }
      {props.products?.length > 0 && (
        <div className="w-[100%] h-full grid grid-cols-4 gap-4 self-start">
          {props.products &&
            props.products.map((item) => {
              return (
                <Product
                  key={item.id}
                  img={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${item.images[0]}`}
                  title={item.title}
                  price={item.rentPrice}
                  id={item.id}
                />
              );
            })}
          {!props.products &&
            Array(numberOfSkeleton)
              .fill(0)
              .map((_, index) => (
                <Card
                  key={index}
                  className="w-[200px] space-y-5 p-4"
                  radius="lg"
                >
                  <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>
                </Card>
              ))}
          {/* <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/> */}
        </div>
      )}
    </>
  );
};

export default ProductsContainer;
