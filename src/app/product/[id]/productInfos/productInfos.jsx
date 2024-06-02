import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import ProductInfosTable from "./productInfosTable";
import ProductInfosOrderCard from "./productInfosOrderCard";
import { useEffect, useRef } from "react";

const infos = [
  { title: "برند", value: "sony" },
  { title: "برند", value: "sony" },
  { title: "برند", value: "sony" },
  { title: "برند", value: "sony" },
  { title: "برند", value: "sony" },
  { title: "برند", value: "sony" },
];

const comments = [
  { title: "reza", value: "عالی بود دوربین بسیار خنی است پیشنهاد میکنم" },
  { title: "علی", value: "خوبه" },
  {
    title: "mmd",
    value:
      "mahsol dir resid ama awli bod keyfiyatesh albate masir man ham dore taghriban vasli khob hodod 2 saat takhir dashtan vvali raftareshon awli bod o ozr khahi kardan",
  },
  { title: "سارا", value: "awli" },
  { title: "alireza", value: "من کانن رو بیشتر میپسندم" },
  { title: "مهدی", value: "sمثل همیشه عالی و به موقع به دستم رسیدny" },
];

const ProductInfos = () => 
{
  let onSelectionChangeFn = (key) => {}
  useEffect(()=>{
     onSelectionChangeFn = (key) => {
           
            switch (key) {
              case "$.0":
                introduceSection.current.scrollIntoView({ behavior: "smooth" });
                break;
              case "$.1":
                specificationsSection.current.scrollIntoView({
                  behavior: "smooth",
                });
                break;
              case "$.2":
                commentsSections.current.scrollIntoView({ behavior: "smooth" });
                break;
            }
            console.log(key);
          }
  },[])
  const introduceSection = useRef(null);
  const specificationsSection = useRef(null);
  const commentsSections = useRef(null);
  const tab1=useRef(null);

  if(tab1.current) {
    console.log(tab1.current)
  }
  return (
    <div className="w-11/12 lg:w-full lg:h-full lg:flex lg:gap-5 lg:justify-evenly">
      <div className=" mr-10 lg:w-2/3 flex flex-col gap-5">
        <Tabs
          color="primary"
          aria-label="Tabs colors"
          size="lg"
          variant="light"
          radius="full"
          className="bg-white border-2 rounded-full border-primary sticky top-0 z-20 dark:bg-slate-600 "
          defaultSelectedKey = {null}
          onSelectionChange={(key) => onSelectionChangeFn(key)}
        >
          <Tab title="معرفی" className="w-full"></Tab>
          <Tab title="مشخصات" className="w-full"></Tab>
          <Tab title="نظرات" className="w-full"></Tab>
        </Tabs>

        <div className="flex flex-col gap-5">
          <Card className="dark:bg-slate-800" ref={introduceSection}>
            <CardHeader>
              <span>معرفی</span>
            </CardHeader>
            <CardBody className="text-right gap-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>

          <Card className="dark:bg-slate-800" ref={specificationsSection}>
            <CardHeader>مشخصات</CardHeader>
            <CardBody className="text-right gap-5 ">
              دوربین سونی الفا 7 عالیه خیلی خوبه من خودم واسه خونه همینو بردم
              واسه داداشم هم بردم همه راضی ام عالیه خیلی خوبه شمام ببر راضی
              نبودی بیار برام ...
              <ProductInfosTable infos={infos} />
            </CardBody>
          </Card>

          <Card className="dark:bg-slate-800" ref={commentsSections}>
            <CardHeader>نظرات</CardHeader>
            <CardBody className="text-right gap-5">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
              <ProductInfosTable infos={comments} />
            </CardBody>
          </Card>
        </div>
      </div>
      <ProductInfosOrderCard />
    </div>
  );
};

export default ProductInfos;
