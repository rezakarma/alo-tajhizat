"use client";
import UserProfileSimpleItem from "@/app/profile/orders/userProfileOrdersItem/userProfileSimpleItem";
import { statusLabels } from "@/app/utils/enumUtils";
import { Status } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { Card } from "@nextui-org/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import OrderItems from "./orderItems";
import GetOrders from "@/data/orders/getOrders";
import React, { useEffect, useState } from "react";
import OrderFiltering from "./orderFiltering";
import useDebounce from "@/hooks/useDebounce";
import OrderEditView from "./orderEdit/orderEditView";
const fetchOrders = async (queryString) => {
  const result = await fetch(`/api/order/admin`);
  if (!result.ok) {
    throw new Error("در هنگام ارتباط با سرور خطایی رخ داده است");
  }
  const response = await result.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

const Orders = () => {
  const [orderStatus, setOrderStatus] = useState();
  const [orderUserName, setOrderUserName] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const debouncedUsername = useDebounce(orderUserName);
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
  } = GetOrders("ADMIN", orderStatus?.currentKey, debouncedUsername);

  useEffect(() => {
    console.log(data, " data of query");
  }, [data]);

  // return (
  // <div className="h-screen w-screen">
  //   <OrderItems
  //     data={data}
  //     error={error}
  //     isError={isError}
  //     isPending={isPending}
  //   />
  // </div>
  // );
  return (
    <>
      <div className="h-screen w-screen flex">
        <Card shadow="sm" className="h-[95%] w-[40%] m-5">
          <OrderFiltering
            status={orderStatus}
            setStatus={setOrderStatus}
            username={orderUserName}
            setUsername={setOrderUserName}
          />
          <OrderItems
            data={data}
            error={error}
            isError={isError}
            isPending={isPending}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
            isFetchingNextPage={isFetchingNextPage}
            setSelectedOrder={setSelectedOrder}
          />
        </Card>
        <OrderEditView orderId={selectedOrder} />
      </div>
    </>
  );
};

export default Orders;
