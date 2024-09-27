import ProductContainerWithScoroll from "@/components/utils/productContainerWithScoroll";
import { Card, CardBody, Image, Tooltip } from "@nextui-org/react";

const UserProfileOrderProductContainer = (props) => {
    return ( 
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
                  <div className="text-small font-bold">{item.product.title}</div>
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
                      alt={item.product.title}
                      className="w-[100%] object-cover"
                      src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${item.product.images[0]}`}
                    />
                  </CardBody>
                </Card>
              </div>

              {/* <Product className="snap-center"/> */}
            </Tooltip>
          ))}
        </ProductContainerWithScoroll>
     );
}
 
export default UserProfileOrderProductContainer;