import { Card, CardBody } from "@nextui-org/react";
import CirclePointSvg from "../../../../../public/assets/product/circlePointSvg";

const ProductHeaderCardSection = ({details}) => {
  const limitedDteails = details.slice(0,4)
  return (
    <Card className=" w-9/12 mx-auto mt-5 lg:mt-0 lg:w-[20%] hover:scale-105 border-2 border-primary transition-all hover:duration-300 dark:bg-slate-800 ">
      <CardBody className="text-right gap-5">
        <h3 className="text-xl font-bold text-primary">ارسال از:</h3>
        <p>ارسال از دفتر مرکزی الو تجهیزات</p>
        <h3 className="text-xl font-bold text-primary">ویژگی های مهم محصول:</h3>
        <div className="flex flex-col gap-3">
          {limitedDteails.map((item,index) => {
            return <span key={index} class="flex gap-2 items-center">
            <CirclePointSvg />
            <p>
              {`${item.title}:`}
            </p>
            <p>
              {`${item.description}`}
            </p>
          </span>
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductHeaderCardSection;
