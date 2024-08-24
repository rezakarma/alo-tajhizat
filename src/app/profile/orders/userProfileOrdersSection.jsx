"use client";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import UserProfileSimpleItem from "./userProfileOrdersItem/userProfileSimpleItem";
import { useState } from "react";
import { Status } from "@prisma/client";
import { statusLabels } from "@/app/utils/enumUtils";
import { useQuery } from "@tanstack/react-query";

const orders = [
  {
    status: "جاری",
    orderStatus: "current",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "در انتظار تایید",
    orderStatus: "pendingConfirmation",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "تحویل شده",
    orderStatus: "delivered",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "لغو شده",
    orderStatus: "cancel",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "در انتظار پرداخت",
    orderStatus: "pendingPayment",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "جاری",
    orderStatus: "current",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "در انتظار تایید",
    orderStatus: "pendingConfirmation",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "تحویل شده",
    orderStatus: "delivered",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "لغو شده",
    orderStatus: "cancel",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "در انتظار پرداخت",
    orderStatus: "pendingPayment",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "جاری",
    orderStatus: "current",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "در انتظار تایید",
    orderStatus: "pendingConfirmation",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "تحویل شده",
    orderStatus: "delivered",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "لغو شده",
    orderStatus: "cancel",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
  {
    status: "در انتظار پرداخت",
    orderStatus: "pendingPayment",
    products: [
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
      },
      {
        title: "دوربین سونی الفا a7",
        img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
        price: "25000",
      },
    ],
    date: "10 بهمن 1400",
    trackingCode: "53635t653567",
    totalPrice: "500000",
  },
];

const sampleProOrder = [
  {
    title: "دوربین سونی الفا a7",
    img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
    price: "25000",
  },
  {
    title: "دوربین سونی الفا a7",
    img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png",
    price: "25000",
  },
];

const fetchOrders = async (status) => {
  const result = await fetch(`/api/orders?status=${status}`);
  if (!result.ok) {
    throw new Error("در ارتباط با سرور خطایی رخ داده است");
  }
  const response = await result.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

const UserProfileOrderSection = () => {
  const [status, setStatus] = useState();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["orders", status],
    queryFn: fetchOrders,
  });

  return (
    <div className="flex border-2 flex-col border-black w-11/12 xl:w-[70%] h-[100%] gap-2 p-3 rounded-2xl bg-bgGray dark:bg-primaryDark2 ">
      <Tabs
        onSelectionChange={(key) => {
          setStatus(key);
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
          return (
            <Tab
              key={item}
              title={statusLabels[Status[item]]}
            />
          );
        })}
      </Tabs>
      <Card className="h-[90%]">
        <CardBody className="bg-bgGray gap-2 dark:bg-slate-600 ">
          {isError && <h3>{error}</h3>}
          {isPending && !isError && <h3>loading...</h3>}
          {!isPending &&
            data &&
            data.map((item, index) => {
              return (
                <UserProfileSimpleItem
                  key={index}
                  status={item.status}
                  orderStatus={item.orderStatus}
                  date={item.date}
                  price={item.totalPrice}
                  trackingCode={item.trackingCode}
                  products={item.products}
                />
              );
            })}
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfileOrderSection;
