"use client";
import { Button, Card, CardFooter } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import UserProfileSimpleItem from "./userProfileSimpleItem";
import { statusLabels } from "@/app/utils/enumUtils";
import { Status } from "@prisma/client";
import { BeatLoader } from "react-spinners";
import GetOrders from "@/data/orders/getOrders";
import { ScrollArea } from "@/components/ui/scroll-area";
import useProductStatusSocket from "@/hooks/useProductStatusSocket";

type PropsOrderList = {
  status: Status;
};

const UserProfileOrderList = (props: PropsOrderList) => {
  const [products, setProducts] = useState<any[]>();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isPending,
    isError,
  } = GetOrders("USER", props.status, null);

  useEffect(() => {
    if (data) {
      const productsArr = data.pages
        .map((group, i) => {
          return group.data.map((item) => {
            return item;
          });
        })
        .flat();
      setProducts(productsArr);
    }
  }, [data]);

  const connection = useProductStatusSocket((data: any,selectedStatus: Status) => {
    console.log(data, "srtaefdfd");
    console.log(props.status,selectedStatus, " props.status");
    if (data.id) {
      setProducts((products) => {
        const orderExist = products.find((product) => product.id === data.id);
    console.log(orderExist, " orderExist", (orderExist && props.status !== data.status));

        if (orderExist && selectedStatus !== data.status) {
          const newProducts = products.filter((product) => product.id !== data.id);
          console.log(newProducts, " newProducts");
          return newProducts;
        } else if (!orderExist && props.status === data.status) {
          return [data, ...products];
        }
        return products;
      });
    }
  },props.status);

  return (
    <ScrollArea>
      <Card className="h-[90%] gap-3 p-2">
        {isError && <h3>{error}</h3>}
        {isPending && !isError && (
          <div className="self-center place-self-center justify-self-center items-center pt-20 text-xl flex flex-col justify-center">
            <BeatLoader />
            <h3>در حال دریافت سفارش ها...</h3>
          </div>
        )}
        {!isPending && data && data.length === 0 && (
          <h3 className="self-center place-self-center justify-self-center items-center pt-20 text-xl ">
            هیچ سفارشی با این وضیعت موجود نیست
          </h3>
        )}
        {!isPending &&
          data &&
          products &&
          products.map((item) => (
            <UserProfileSimpleItem
              key={item.id}
              status={item.status}
              orderStatus={statusLabels[Status[item.orderStatus]]}
              date={item.date}
              price={item.price}
              trackingCode={item.id}
              products={item.productsList}
            />
          ))}
        <CardFooter className="flex justify-center">
          <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
          <Button
            color="primary"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            isDisabled={isFetchingNextPage || !hasNextPage}
            isLoading={isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </Button>
        </CardFooter>
      </Card>
    </ScrollArea>
  );
};

export default UserProfileOrderList;
