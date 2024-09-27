"use client";
import UserProfileSimpleItem from "@/app/profile/orders/userProfileOrdersItem/userProfileSimpleItem";
import { statusLabels } from "@/app/utils/enumUtils";
import { Status } from "@prisma/client";
import { BeatLoader } from "react-spinners";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import OrderFiltering from "./orderFiltering";
import React from "react";
import { Button } from "@nextui-org/react";

const OrderItems = ({
  data,
  isError,
  isPending,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  setSelectedOrder
}) => {
  return (
    <ScrollArea className="rounded-md border p-4">
      <CardBody className="gap-5">
        {isError && <h3>{error}</h3>}
        {isPending && !isError && (
          <div className="self-center place-self-center justify-self-center items-center pt-20 text-xl flex flex-col justify-center">
            <BeatLoader />
            <h3>در حال دریافت سفارش ها...</h3>
          </div>
        )}
        {!isPending && data && data.pages[0].data.length === 0 && (
          <h3 className="self-center place-self-center justify-self-center items-center pt-20 text-xl ">
            هیچ سفارشی با این وضیعت موجود نیست
          </h3>
        )}
        {!isPending &&
          data &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((item) => (
                <UserProfileSimpleItem
                  key={item.id}
                  status={item.status}
                  orderStatus={statusLabels[Status[item.orderStatus]]}
                  date={item.date}
                  price={item.price}
                  trackingCode={item.id}
                  setSelected={setSelectedOrder}
                  products={item.productsList}
                />
              ))}
            </React.Fragment>
          ))}
        <Button
          color="primary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          isDisabled={isFetchingNextPage || !hasNextPage}
          isLoading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "...در حال بارگیری بیشتر"
            : hasNextPage
            ? "بارگیری بیشتر"
            : "سفارش دیگری موجود نیست"}
        </Button>
      </CardBody>
    </ScrollArea>
  );
};

export default OrderItems;
