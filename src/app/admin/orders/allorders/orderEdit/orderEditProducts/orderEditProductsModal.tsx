import ProfileEditorModal from "@/components/modal/profileEditModal";
import OrderEditProductsList from "./orderEditProductsList";
import { orderProduct } from "@prisma/client";
import OrderCartProduct from "./orderCartProduct";
import { Divider } from "@nextui-org/react";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import EditOrderProductItem from "./editOrderProductItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dragAndDropActions } from "@/store/drandAndDrop-slice";

const OrderEditProductsModal = ({
  productsList,
}: {
  productsList: orderProduct[];
}) => {
  const allProductsList = useSelector((state) => state.dragAndDrop.productList);
  const orderProductList = useSelector(
    (state) => state.dragAndDrop.orderProductList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(allProductsList, " reduxState1");
    console.log(orderProductList, " reduxState2");
  }, [allProductsList, orderProductList]);

  function handleDragEnd(result) {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "productList") {
        const newAllPproductList = [...allProductsList];
        const [reorderedItem] = newAllPproductList.splice(source.index, 1);
        newAllPproductList.splice(destination.index, 0, reorderedItem);
        dispatch(
          dragAndDropActions.setColomun({
            colId: "productList",
            data: newAllPproductList,
          })
        );
      } else if (source.droppableId === "orderProductList") {
        const newOrderedPproductList = [...orderProductList];
        const [reorderedItem] = newOrderedPproductList.splice(source.index, 1);
        newOrderedPproductList.splice(destination.index, 0, reorderedItem);
        dispatch(
          dragAndDropActions.setColomun({
            colId: "orderProductList",
            data: newOrderedPproductList,
          })
        );
      }
    } else if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === "orderProductList") {
        const draggedItem = allProductsList.find(
          (item) => item.id === draggableId
        );
        dispatch(
          dragAndDropActions.addItemToCol({
            colId: "orderProductList",
            data: {
              count: 1,
              id: draggedItem.id,
              product: draggedItem,
              orderId: productsList[0].orderId,
              productId: draggedItem.id,
            },
          })
        );
        dispatch(
          dragAndDropActions.removeItemToCol({
            colId: "productList",
            targetId: draggedItem.id,
          })
        );
      }
    }
  }

  const handleDragStart = (result) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <ProfileEditorModal size="5xl" modalID="orderEditProductsModal">
        <div className="flex justify-between gap-5">
          <OrderEditProductsList cartExistingProduct={productsList} />
          <Divider orientation="vertical" className="h-auto my-2" />
          <OrderCartProduct productsList={productsList} />
        </div>
      </ProfileEditorModal>
    </DragDropContext>
  );
};

export default OrderEditProductsModal;
