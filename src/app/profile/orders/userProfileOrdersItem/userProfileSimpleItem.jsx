import Product from "@/app/equipment-rental/productsSection/productsContainer/product";
import ProductContainerWithScoroll from "@/components/utils/productContainerWithScoroll";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
const UserProfileSimpleItem = (props) => {
  return (
    <div className="flex flex-col gap-2 border-2 border-primary rounded-xl h-[95%] dark:bg-primaryDark2 ">
      <div className="flex flex-col justify-start px-5 gap-5 bg-white rounded-xl py-3 dark:bg-primaryDark ">
        <div className="flex gap-3">
          <span className="w-fit">{props.status}</span>
          {props.orderStatus === "pendingPayment" && (
            <div className="flex gap-3">
              <Button color="primary" size="sm">
                پرداخت
              </Button>
              <Button color="danger" size="sm">
                انصراف
              </Button>
            </div>
          )}
          {props.orderStatus === "pendingConfirmation" && (
            <div className="flex gap-3">
              <Button color="danger" size="sm">
                انصراف
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center xl:flex-row xl:justify-between ">
          <span>تاریخ: {props.date}</span>
          <span className="" >کد رهگیری: {props.trackingCode}</span>
          <span>مبلغ:{props.price}</span>
        </div>
      </div>
      <div className="flex gap-2 p-1">
        <ProductContainerWithScoroll>
          {props.products.map((item, index) => (
            <Tooltip
              key={index}
              classNames={{
                content: "bg-bgGray",
              }}
              showArrow
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">{item.title}</div>
                  <div className="text-tiny">قیمت: {item.price}</div>
                </div>
              }
            >
              <div className={` ${props.className}`}>
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
                className="h-12 w-12"
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-[100%] object-cover"
                    src={item.img}
                  />
                </CardBody>
              </Card>
        </div>
          
               {/* <Product className="snap-center"/> */}
            </Tooltip>
          ))}
        </ProductContainerWithScoroll>
      </div>
    </div>
  );
};

export default UserProfileSimpleItem;
