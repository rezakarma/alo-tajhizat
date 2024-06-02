"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import ArrowFilteringSvg from "../../../../../public/assets/equipmentRental/productSection/arrowFilteringSvg";

const brands = [
  { brand: "سونی", value: "sony" },
  { brand: "کانن", value: "canon" },
  { brand: "نیکون", value: "nikon" },
  { brand: "سیگما", value: "sigma" },
  { brand: "زاییس", value: "zeiss" },
];
const types = [
  { type: "دی اس ال ار", value: "DSLR" },
  { type: "بدون آیینه", value: "mirrorLess" },
  { type: "دوربین اکشن", value: "actionCamera" },
  { type: "دوربین 360 درجه", value: "360camera" },
  { type: "دورین فیلمبرداری", value: "filmingCamera" },
];
const categories = [
  { category: "همه ی دسته ها", value: "all" },
  { category: "دوربین ها", value: "cameras" },
  { category: "لنز ها", value: "lenses" },
  { category: "تجهیزات نور", value: "lights" },
  { category: "تجهیزات صدا", value: "sounds" },
];

const FilteringAccording = () => {
  const defaultContent = "sdsds";

  const checkboxItemClasses = {
    base: "flex gap-3 ",
    label: " hover:text-primaryLight transition-all dark:text-primaryYellow",
  };

  return (
    <Accordion selectionMode="multiple">
      <AccordionItem
        indicator={<ArrowFilteringSvg />}
        key="1"
        aria-label="Accordion 1"
        title="برند:"
      >
        <CheckboxGroup color="primary">
          {brands.map((item, index) => (
            <Checkbox
              key={index}
              value={item.value}
              classNames={checkboxItemClasses}
            >
              {item.brand}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </AccordionItem>
      <AccordionItem
        indicator={<ArrowFilteringSvg />}
        key="2"
        aria-label="Accordion 2"
        title="نوع:"
      >
        <CheckboxGroup color="primary">
          {types.map((item, index) => (
            <Checkbox
              key={index}
              value={item.value}
              classNames={checkboxItemClasses}
            >
              {item.type}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </AccordionItem>
      <AccordionItem
        indicator={<ArrowFilteringSvg />}
        key="3"
        aria-label="Accordion 3"
        title="دسته بندی:"
      >
        <CheckboxGroup color="primary">
          {categories.map((item, index) => (
            <Checkbox
              key={index}
              value={item.value}
              classNames={checkboxItemClasses}
            >
              {item.category}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </AccordionItem>
    </Accordion>
  );
};

export default FilteringAccording;
