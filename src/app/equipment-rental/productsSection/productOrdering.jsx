"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";

const orders = [
  { title: "گران ترین", key: "higher" },
  { title: "ارزان ترین", key: "lower" },
  { title: "محبوب ترین", key: "popular" },
  { title: "ارزان ترین", key: "default" },
];

const ProductsOrder = () => {
  const [selected, setSelected] = useState("popular");

  return (
    <div className="w-[97%] flex justify-between dark:bg-primaryDark2 px-5 gap-5 items-center drop-shadow-lg my-5 h-12 bg-white border-2 border-primary rounded-2xl">
      <div className="flex gap-5 items-center">
        <span className="text-lg font-bold">مرتب سازی:</span>
        <Tabs
          color="primary"
          variant="light"
          className="flex justify-evely gap-5"
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          {orders.map((item) => (
            <Tab key={item.key} title={item.title} />
          ))}
        </Tabs>
      </div>
      <h4>
        تعداد کالاها <span> 120</span>
      </h4>
    </div>
  );
};

export default ProductsOrder;
