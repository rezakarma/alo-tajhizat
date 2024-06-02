"use client"

import React, { useState, useCallback, useEffect } from "react";
import ProductsNavItem from "./productsNavItem";

const navItems = [
  { title: "دوربین ها", index: 1 },
  { title: "لنز ها", index: 2 },
  { title: "تجهیزات نور", index: 3 },
  { title: "تجهیزات صدا", index: 4 },
  { title: "سه پایه و حرکتی", index: 5 },
  { title: "تجهیزات جانبی", index: 6 },
];

const ProductsNav = (props) => {
  const [activeItem, setActiveItem] = useState(null);

  const activeItemHandler = (index) => {
    setActiveItem((prevIndex) => index);
};

useEffect(() => {

  }, [activeItem]);


  return (
    <ul className={props.className}>
      {navItems.map((item) => (
        <ProductsNavItem
          key={item.index}
          isActive={activeItem === item.index}
          onClick={() => activeItemHandler(item.index)}
          title={item.title}
        />
      ))}
    </ul>
  );
};

export default ProductsNav;