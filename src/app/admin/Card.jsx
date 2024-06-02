import React from "react";

const Card = () => {
  const data = [
    { title: "درامد روزانه", value: "42000$" },
    { title: "درامد هفتگی", value: "100000$" },
    { title: "درامد ماهانه", value: "58000000$" },
  ];

  return (
    <div className="flex flex-col xl:flex-row xl:m-10">
      {data.map((item, index) => (
        <div
          className="w-96 mx-auto my-7 xl:mx-10 h-28 bg-gray-100 border-r-8 border-primary border-collapse rounded-2xl p-5 shadow-xl drop-shadow-xl hover:scale-110 hover:transition hover:duration-700 hover:ease-in-out  "
          key={index}
        >
          <div className="flex justify-between  ">
            <h2 className="font-bold text-xl "> {item.title} </h2>
            <p className="font-medium text-lg text-gray-400 mt-10 "> {item.value} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
