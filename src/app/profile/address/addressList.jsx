"use client";
import React, { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddressItem from "./addressItem";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const getAdresses = async () => {
  const result = await fetch("/api/address");
  if (!result.ok) {
    toast.error("در هنگام ارتباط با سرور خطایی رخ داده است.");
    throw new Error("در هنگام ارتباط با سرور خطایی رخ داده است.");
  }
  const response = await result.json();
  if (response.error) {
    toast.error(response.error);
    throw new Error(response.error);
  } else {
    return response;
  }
};

const AddressList = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAdresses,
  });

  // const [addresses, setAddresses] = useState();
  // useEffect(() => {
  //   const getAddress = async () => {
  //     const result = await fetch("/api/address");
  //     if (!result.ok) {
  //       toast.error("در هنگام ارتباط با سرور خطایی رخ داده است.");
  //       return;
  //     }
  //     console.log(result, " injaaaaaaaaa");
  //     const response = await result.json();
  //     console.log(response, " injaaaaaaaaa2");

  //     if (response.error) {
  //       toast.error(response.error);
  //       return;
  //     } else {
  //       setAddresses(response);
  //       return;
  //     }
  //   };
  //   getAddress();
  // }, []);

  return (
    <div className="w-[90%] h-[90%] bg-gray-50 border-solid border-2 border-gray-400  rounded-3xl p-5 space-y-5 dark:bg-darkBg">
      {isPending && <p>loading...</p>}
      {data && data.length > 0 && (
        <ScrollArea className="h-full">
          <div className="h-full flex flex-col gap-2 p-2">
            {data.map((item, index) => (
              <AddressItem key={index} item={item} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default AddressList;
