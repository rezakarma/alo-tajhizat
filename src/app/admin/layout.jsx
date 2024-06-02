import React from "react";

import Sidebar from "./sidebar";

const adminLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="flex w-full md:w-[25%] xl:w-[15%] ">
        <Sidebar />
      </div>
      <div className="flex w-full xl:w-[85%] ">
        {children}
        </div>
    </div>
  );
};

export default adminLayout;
