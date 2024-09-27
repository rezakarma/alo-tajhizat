import { Card, CardBody } from "@nextui-org/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { orderProduct } from "@prisma/client";
import EditOrderProductItem from "./editOrderProductItem";
import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Store } from "@reduxjs/toolkit";
import { dragAndDropActions } from "@/store/drandAndDrop-slice";
const OrderCartProduct = ({
  productsList,
}: {
  productsList: orderProduct[];
}) => {
  const dispatch = useDispatch();

  const orderProducts = useSelector(
    (state) => state.dragAndDrop.orderProductList
  );

  useEffect(() => {
    if (productsList && !orderProducts) {
      dispatch(
        dragAndDropActions.setColomun({
          colId: "orderProductList",
          data: productsList,
        })
      );
    }
  }, [productsList]);

  return (
    <Card className="h-[450px]" shadow="none">
      <CardBody>
        <Droppable droppableId={"orderProductList"}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ScrollArea className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-2">
                  {orderProducts && orderProducts.map((item, index) => (
                    <EditOrderProductItem
                      index={index}
                      key={item.id}
                      type="cart"
                      product={item.product}
                      count={item.count}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </Droppable>
      </CardBody>
    </Card>
  );
};

export default OrderCartProduct;
