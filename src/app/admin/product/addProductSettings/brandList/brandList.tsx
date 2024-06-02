"use client";
import SyncLoader from "react-spinners/SyncLoader";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { io } from "socket.io-client";
import useSocketIo from "@/hooks/useSocketIo";

export type Brand = {
  id: string;
  persianBrand: string;
  englishBrand: string;
};

async function getData(): Promise<Brand[]> {
  const result = await fetch("/api/productBrand");
  if (!result.ok) {
    toast.error("در ارتباط با سرور خطایی رخ داده است");
    console.log("data fetched: ", result);

    return [];
  }
  console.log("data fetched");
  const response = await result.json();
  if (response.error) {
    toast.error(response.error);
    return [];
  }
  const brandListData =response.map((brand: Brand) => {
    return {
      id: brand.id,
      persianName: brand.persianBrand,
      englishName: brand.englishBrand,
    };
  });

  return brandListData;
}

const BrandList = () => {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const data = await getData();
      setBrandList(data);
    };
    setData();
  }, []);

  // useEffect(() => {
  //   const eventSource = new EventSource("/api/see");

  //   eventSource.onmessage = (event) => {
  //     const parsedData = JSON.parse(event.data);
  //     setBrandList((prevData) => [
  //       ...prevData,
  //       {
  //         id: parsedData.id,
  //         persianBrand: parsedData.persianBrand,
  //         englishBrand: parsedData.englishBrand,
  //       },
  //     ]);
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("SSE error:", error);
  //     toast.error('error of sse')
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  //   useEffect(() => {
  // //     const socket = io('http://localhost:3002/realtimeBrands');

  // // socket.on('connect', () => {
  // //   console.log('Connected to service 1');
  // // });

  // // socket.on('infoData', (data) => {
  // //   console.log('Received info data:', data);
  // // });

  // // socket.on('addBrand', (data) => {
  // //   console.log('addBrand', data);
  // //   setBrandList((prevData) => [
  // //           ...prevData,
  // //           {
  // //             id: data.id,
  // //             persianBrand: data.persianBrand,
  // //             englishBrand: data.englishBrand,
  // //           },
  // //         ]);
  // // });

  //   },[])

  const connection = useSocketIo((data: any, actionType: string) => {
    switch (actionType) {
      case "ADD_BRAND":
        return setBrandList((prevData) => [
          ...prevData,
          {
            id: data.id,
            persianName: data.persianBrand,
            englishName: data.englishBrand,
          },
        ]);
      case "DELETE_BRAND":
        return setBrandList((prevData) =>
          prevData.filter((item) => item.id !== data.id)
        );
      case "UPDATE_BRAND":
        return setBrandList((prevData) =>
          prevData.map((item) =>
            item.id === data.id
              ? {
                  id: data.id,
                  persianName: data.persianBrand,
                  englishName: data.englishBrand,
                }
              : item
          )
        );
      default:
        return;
    }
  });

  return (
    <>
      <div className="container mx-auto py-10">
        {brandList.length >= 1 && (
          <DataTable columns={columns} data={brandList} />
        )}
      </div>
      {brandList.length < 1 && (
        <div className="flex justify-evenly items-center flex-col gap-15 min-h-[200px]">
          <SyncLoader />
          <p>در حال بارگیری برند ها...</p>
        </div>
      )}
    </>
  );
};

export default BrandList;
