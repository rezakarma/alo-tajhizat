"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteringAction } from "@/store/filtering-slice";
import { useSearchParams } from "next/navigation";

const orders = [
  { title: "پیش فرض", key: "default" },
  { title: "گران ترین", key: "higher" },
  { title: "ارزان ترین", key: "lower" },
  { title: "جدید ترین", key: "newest" },
];

const ProductsOrder = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("default");
  const searchParams = useSearchParams();

  const queryParams = useSelector((state) => state.filtering.queryParams);

  const readQuery = useSelector((state) => state.filtering.readQuery);

  useEffect(() => {
    if (readQuery) {
      const order = searchParams.get("order");
      if (order) {
        setSelected(order);
      }
    }
  }, [readQuery]);

  const orderChangeHandler = (order) => {
    console.log("this line was run", order, selected);
    if (order === selected) {
      console.log("both values are same");
    }
    dispatch(filteringAction.updateQueryParams({ key: "order", value: order }));
    setSelected(order);
  };

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
          onSelectionChange={orderChangeHandler}
        >
          {orders.map((item) => (
            <Tab key={item.key} title={item.title} />
          ))}
        </Tabs>
      </div>
      <h4>
        تعداد کالاها <span> {props.productsCount}</span>
      </h4>
    </div>
  );
};

export default ProductsOrder;
