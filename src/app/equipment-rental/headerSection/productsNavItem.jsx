"use client";

/* eslint-disable */ 

import React from "react";

const ProductsNavItem = React.memo((props) => {
  const listClass = props.isActive
    ? "transform scale-110 font-bold "
    : " hover:font-semibold";
  return (
    <li className={`text-white cursor-pointer text-lg transition-all ${listClass}`} onClick={props.onClick}>
      {props.title}
    </li>
  );
});

export default ProductsNavItem;
