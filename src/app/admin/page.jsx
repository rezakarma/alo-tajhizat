import React from "react";
import Card from "./Card";
import Chart from "./charts/Chart";

const page = () => {
  return (
    <div className="flex flex-col w-[100%] justify-center items-center ">
      <div className="w-[100%] " >
        <Card />
      </div>
      <div className="w-[100%] ">
        <Chart/>
      </div>
    </div>
  );
};

export default page;
