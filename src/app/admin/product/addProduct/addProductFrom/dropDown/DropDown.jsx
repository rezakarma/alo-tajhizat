import React, { useEffect, useState } from "react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";



const DropDown = (props) => {
  const [isLoading,setLoading] = useState(true)
  useEffect(() => {
    if(props.options.length > 0 || props.isLoading === true) {
      setLoading(false)
    }else if(props.isLoading === false) {
      setLoading(false)
    }
  },[props.options,props.isLoading])
  return (
    // <div >
    //   <label className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow">
    //     {props.label}
    //   </label>
    //   <select
    //    onChange={props.onChange}
    //    value={props.value}
    //     className="shadow-xl resize-none appearance-none border-solid border-2 border-primaryLight rounded-xl dark:text-gray-600 dark:bg-gray-300 w-[100%] md:w-[20rem] py-2 px-3 hover:border-primaryLight hover:ring-1 hover:ring-primaryLight hover:ring-offset-1 hover:ring-offset-primaryLight/[.1] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  transition-all duration-300"
    //   >
    //     {props.options.map((option, i) => (
    //       <option
    //         className=" text-gray-700 text-base font-medium"
    //         key={i}
    //         value={option.name}
    //       >
    //         {option.name}
    //       </option>
    //     ))}
    //   </select>
    // </div>
    // <Select
    //   items={props.options}
    //   label={props.label}
    //   placeholder="Select an animal"
    //   className="max-w-xs"
    // >
    //   {(option) => <SelectItem key={option}>{option.name}</SelectItem>}
    // </Select>
    <Select
    label={props.label}
    variant="bordered"
    isLoading={isLoading || props.isLoading}
    isDisabled={isLoading || props.isPending}
    labelPlacement='outside'
    placeholder={props.placeholder}
    isInvalid={props.error? true : false}
    selectedKeys={new Set([props.value])}
    errorMessage={props.error ? props.error.message : ""}
    // selectedKeys={props.value}
    className="max-w-xs"
    // onSelectionChange={props.onChange}
    onChange={props.onChange}
  >
    {props.options.map((option) => (
      <SelectItem key={option.id} textValue={props.persianValueExtractor(option)} value={props.englishValueExtractor(option)}>
        {/* {option.persianBrand} */}
        {props.persianValueExtractor(option)}
      </SelectItem>
    ))}
  </Select>
 
    // <div >
    //   <label className="block  text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow">
    //     {props.label}
    //   </label>
    //   <select
    //    onChange={props.onChange}
    //    value={props.value}
    //     className="shadow-xl w-11/12 resize-none appearance-none border-solid border-2 border-primaryLight rounded-xl dark:text-gray-600 dark:bg-gray-300  md:w-[20rem] py-2 px-3 hover:border-primaryLight hover:ring-1 hover:ring-primaryLight hover:ring-offset-1 hover:ring-offset-primaryLight/[.1] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  transition-all duration-300"
    //   >
    //     {props.options.map((option, i) => (
    //       <option
    //         className=" text-gray-700 text-base font-medium"
    //         key={i}
    //         value={option.name}
    //       >
    //         {option.name}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
};

export default DropDown;
