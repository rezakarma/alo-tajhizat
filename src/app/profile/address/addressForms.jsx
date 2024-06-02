import React from "react";
import {ScrollShadow} from "@nextui-org/react";

const AddressForms = () => {
  const formContent = [
    {
      address:
        "تهران ، خیابان  فلان ، کوچه ی اول  ، پلاک سه ، طبقه دوم ، واحد اول",
      city: "تهران",
      postalCode: "14250345697",
      number: "0912000000",
      name: "مهدی تقی نژاد",
    },
    {
        address:
          "تهران ، خیابان  فلان ، کوچه ی اول  ، پلاک سه ، طبقه دوم ، واحد اول",
        city: "تهران",
        postalCode: "14250345697",
        number: "0912000000",
        name: "مهدی تقی نژاد",
      },
      {
        address:
          "تهران ، خیابان  فلان ، کوچه ی اول  ، پلاک سه ، طبقه دوم ، واحد اول",
        city: "تهران",
        postalCode: "14250345697",
        number: "0912000000",
        name: "مهدی تقی نژاد",
      },
        
  ];
  return (
    <div className="w-[90%] h-[100%] bg-gray-100 border-solid border-2 border-black rounded-3xl p-5 space-y-5 dark:bg-darkBg">
        <ScrollShadow hideScrollBar className="h-full flex flex-col gap-2">
      {formContent.map((item, index) => (
        <div
          key={index}
          className="space-y-5 items-center h-full justify-around bg-white border-solid border-2 p-5 border-primaryLight rounded-2xl dark:border-primaryDark dark:bg-slate-600"
        >
          <div className="flex ">
            <h2 className="font-bold text-lg dark:text-gray-300">
              {item.address}
            </h2>
          </div>
          <div className="flex font-xl justify-between">
            <div className="flex flex-col space-y-2 ">
              <p className="font-sm text-base xl:font-bold xl:text-lg">{item.city}</p>
              <p className="font-sm text-base xl:font-semibold xl:text-lg">{item.postalCode}</p>
              <p className="font-sm text-base xl:font-medium xl:text-lg">{item.number}</p>
              <p className="font-sm text-base xl:font-base xl:text-lg">{item.name}</p>
            </div>
            <span className="w-24 h-20 xl:w-[20%] xl:h-40  flex bg-gray-100  border-solid border-2 border-black rounded-3xl p-5 space-y-5 dark:bg-darkBg"></span>
          </div>
        </div>
      ))}
      </ScrollShadow>
    </div>
  );
};

export default AddressForms;
