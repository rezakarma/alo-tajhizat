"use client";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Button,
  CardFooter,
} from "@nextui-org/react";
import UserProfileSimpleItem from "./userProfileOrdersItem/userProfileSimpleItem";
import React, { useState } from "react";
import { Status } from "@prisma/client";
import { statusLabels } from "@/app/utils/enumUtils";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import GetOrders from "@/data/orders/getOrders";
import UserProfileOrderList from "./userProfileOrdersItem/userProfileOrderList";

const UserProfileOrderSection = () => {
  const [orderStatus, setOrderStatus] = useState();

  return (
    <div className="flex border-2 flex-col border-black w-11/12 xl:w-[70%] h-[100%] gap-2 p-3 rounded-2xl bg-bgGray dark:bg-primaryDark2 ">
      <Tabs
        onSelectionChange={(key) => {
          setOrderStatus(key);
          console.log(key, " keey");
        }}
        aria-label="Options"
        color="primary"
        radius="full"
        variant="bordered"
        classNames={{
          tabList: "bg-white",
          cursor: "",
          tab: "",
          tabContent: "",
        }}
      >
        {Object.keys(Status).map((item) => {
          return <Tab key={item} title={statusLabels[Status[item]]} />;
        })}
      </Tabs>
      {/* {Object.keys(Status).map((item) => {
        return orderStatus === item && (
          <UserProfileOrderList key={item} status={item} />
        );
      })} */}

      {/* {orderStatus === Status.pendingConfirmation && (
        <UserProfileOrderList status="pendingConfirmation" />
      )}
      {orderStatus === Status.pendingPayment && (
        <UserProfileOrderList status="pendingPayment" />
      )}
      {orderStatus === Status.canceled && (
        <UserProfileOrderList status="canceled" />
      )}
      {orderStatus === Status.inProgress && (
        <UserProfileOrderList status="inProgress" />
      )}
      {orderStatus === Status.delivered && (
        <UserProfileOrderList status="delivered" />
      )} */}

      <UserProfileOrderList status={orderStatus} />
    </div>
  );
};
export default UserProfileOrderSection;
