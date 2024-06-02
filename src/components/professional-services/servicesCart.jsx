import Image from "next/image";
import camera from "../../../public/assets/camera.svg";
import Ps1svg from "../../../public/assets/professionalServicesSvg/ps1";
import Ps2svg from "../../../public/assets/professionalServicesSvg/ps2";
import Ps3svg from "../../../public/assets/professionalServicesSvg/ps3";
function ServicesCart() {
  const cart = [
    {
      id: 1,
      image: (
        <Ps2svg className="m-auto mb-4 dark:fill-primaryYellow lg:group-hover:fill-primaryYellow lg:transition-all lg:duration-300" />
      ),
      title: "تجهیزات کامل و بروز",
      description:
        "از بین انبوهی از تجهیزات سینماییمیتوانید ابزار موردنیاز خود را انتخاب کنید",
    },
    {
      id: 2,
      image: (
        <Ps3svg className="m-auto mb-4 dark:fill-primaryYellow lg:group-hover:fill-primaryYellow lg:transition-all lg:duration-300" />
      ),
      title: "مشاوره حضور و انلاین",
      description:
        "قبل از انتخاب محصول میتوانید باکارشناسان مامشورت کنید و بهترین انتخاب را انجام دهید",
    },
    {
      id: 3,
      image: (
        <Ps1svg className="m-auto mb-4 dark:fill-primaryYellow lg:group-hover:fill-primaryYellow lg:transition-all lg:duration-300" />
      ),
      title: "تحویل در سریع ترین زمان",
      description:
        "تجهیزات موردنیاز خودرا به سرعت در محل موردنظر بدون نیاز به مراجعه حضوری تحویل بگیرید",
    },
  ];

  return (
    <div className=" w-11/12 mx-auto xl:w-9/12 lg:flex lg:flex-row lg:justify-between lg:gap-20  ">
      {cart.map((item) => (
        <div
          key={item.id}
          className="group dark:bg-primaryDark lg:w-1/3 border-solid rounded-3xl mb-5 px-5 py-10 shadow-xl bg-gray-50 lg:hover:scale-110 lg:hover:bg-primaryDark lg:hover:text-white  lg:transition-all lg:duration-300"
        >
          {item.image}
          <h2 className="flex text-primary text-2xl font-bold items-center justify-center dark:text-primaryYellow lg:group-hover:text-primaryYellow lg:transition-all lg:duration-300">
            {item.title}
          </h2>
          <p className="py-5 text-center text-lg">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ServicesCart;
