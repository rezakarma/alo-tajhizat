import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import EditOrderProductItem from "./editOrderProductItem";
import React, { useEffect, useState } from "react";
import { buildQueryString } from "@/app/utils/buildQueryString";
import { BeatLoader } from "react-spinners";
import { Button, Card, CardBody } from "@nextui-org/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { orderProduct } from "@prisma/client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { dragAndDropActions } from "@/store/drandAndDrop-slice";
const fetchAllProducts = async ({ pageParam }) => {
  const params = {
    cursor: pageParam,
  };
  const queryString = buildQueryString(params);
  console.log(`?${queryString}`, "  check this");
  const result = await fetch("/api/products/admin?" + queryString);
  if (!result.ok) {
    throw new Error("درهنگام ارتباط با سرور خطایی رخ داده است");
  }
  const response = await result.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

const OrderEditProductsList = ({
  cartExistingProduct,
}: {
  cartExistingProduct: orderProduct[];
}) => {
  // const [products, setPorducts] = useState([]);
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.dragAndDrop.productList);
  const orderProducts = useSelector(
    (state) => state.dragAndDrop.orderProductList
  );
  useEffect(() => {
    dispatch(
      dragAndDropActions.setColomun({
        colId: "productList",
        data: [],
      })
    );
  }, []);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  useEffect(() => {
    if (data && orderProducts) {
      const newProducts = data.pages
        .map((group, i) => {
          return group.data.filter((product) => {
            return !orderProducts.some((orderProduct) => {
              return orderProduct.productId === product.id;
            });
          });
        })
        .flat();

      if (
        JSON.stringify(newProducts) === JSON.stringify(productsList) &&
        newProducts.length === productsList.length &&
        hasNextPage
      ) {
        fetchNextPage();
        return;
      }
      dispatch(
        dragAndDropActions.setColomun({
          colId: "productList",
          data: newProducts,
        })
      );
      // setPorducts(newProducts);
    }
  }, [data, orderProducts]);

  return (
    <Card className="h-[450px]" shadow="none">
      <CardBody>
        <Droppable droppableId={"productList"}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ScrollArea>
                {isError && <h3>{`${error}`}</h3>}
                {isPending && !isError && (
                  <div className="self-center place-self-center justify-self-center items-center pt-20 text-xl flex flex-col justify-center">
                    <BeatLoader />
                    <h3>در حال دریافت سفارش ها...</h3>
                  </div>
                )}
                {!isPending && data && data.pages[0].data.length === 0 && (
                  <h3 className="self-center place-self-center justify-self-center items-center pt-20 text-xl ">
                    هیچ سفارشی با این وضیعت موجود نیست
                  </h3>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {
                    !isPending &&
                      data &&
                      productsList &&
                      productsList.map((item, index) => (
                        <EditOrderProductItem
                          index={index}
                          count={null}
                          type="all"
                          key={item.id}
                          product={item}
                        />
                      ))
                    // data.pages.map((group, i) => (
                    //   <React.Fragment key={i}>
                    //     {group.data.map((item,index) => (
                    //       <EditOrderProductItem
                    //       index={index}
                    //         count={null}
                    //         type="all"
                    //         key={item.id}
                    //         product={item}
                    //       />
                    //     ))}
                    //   </React.Fragment>
                    // ))
                  }
                </div>
                <Button
                  color="primary"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                  isDisabled={isFetchingNextPage || !hasNextPage}
                  isLoading={isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? "...در حال بارگیری بیشتر"
                    : hasNextPage
                    ? "بارگیری بیشتر"
                    : "سفارش دیگری موجود نیست"}
                </Button>
              </ScrollArea>
            </div>
          )}
        </Droppable>
      </CardBody>
    </Card>
  );
};

export default OrderEditProductsList;
