"use client";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import UserProfileSimpleItem from "./userProfileOrdersItem/userProfileSimpleItem";
import { useState } from "react";

// 2 ta ravesh dashtim 1. filed status va sepas search ba filter status morder nazar , 2. bakhsh orders va zir bakhsh pending current cancel delicered baraye hameye karbar ha

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


const UserProfileOrderSection = () => {
  const [renderedOrder, setRenderOrder] = useState(<div className="flex justify-center"> <span className="font-bold text-2xl">سفارشی موجود نیست</span> </div>);

  const test =  <UserProfileSimpleItem
  status="جاری"
  date="10 بهمن 1400"
  price="5,000,000"
  trackingCode="35365768432684"
  products={sampleProOrder}
/> 


console.log(test)
  // let data = ''
  
  // <div className="flex justify-center"> <span className="font-bold text-2xl">سفارشی موجود نیست</span> </div>;
  const renderOrders = (status) => {
    const newStatus = status.toString()
    console.log(status)
     const data = orders.map((item, index) => {
      // console.log(item.orderStatus)
        if(item.orderStatus === status) {

          return <UserProfileSimpleItem
          key={index}
          status={item.status}
          orderStatus={item.orderStatus}
          date={item.date}
          price={item.totalPrice}
          trackingCode={item.trackingCode}
          products={item.products}
          />
        }
        
        });
     setRenderOrder(data)
    console.log(data);
  };

  return (
    <div className="flex border-2 flex-col border-black w-11/12 xl:w-[70%] h-[100%] gap-2 p-3 rounded-2xl bg-bgGray dark:bg-primaryDark2 ">
      <Tabs
        onSelectionChange={(key) => {
          console.log(key)
          renderOrders(key)
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
        <Tab key="current" title="جاری" className="h-[90%]" />
        <Tab key="pendingConfirmation" title="در انتظار تایید" />
        <Tab key="pendingPayment" title="در انتظار پرداخت" />
        <Tab key="delivered" title="تحویل شده" />
        <Tab key="cancel" title="لغو شده" />
      </Tabs>
      <Card className="h-[90%]">
        <CardBody className="bg-bgGray gap-2 dark:bg-slate-600 ">
          {/* <UserProfileSimpleItem
            status="جاری"
            orderStatus="pendingPayment"
            date="10 بهمن 1400"
            price="5,000,000"
            trackingCode="35365768432684"
            products={sampleProOrder}
          />
          <UserProfileSimpleItem
            status="جاری"
            date="10 بهمن 1400"
            price="5,000,000"
            trackingCode="35365768432684"
            products={sampleProOrder}
          /> */}
          {renderedOrder}
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfileOrderSection;
