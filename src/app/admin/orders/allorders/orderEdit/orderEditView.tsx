"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@nextui-org/react";
import { orderEditSchema } from "@/schema";
import { DeliveryTime, DeliveryType, Status } from "@prisma/client";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import OrderSettingItem from "@/app/cart/orderSettingItem";
import {
  deliveryTimeLabels,
  deliveryTypeLabels,
  statusLabels,
} from "@/app/utils/enumUtils";
import OrderEditStatusAction from "./orderEditStatusAction";
import UserProfileOrderProductContainer from "@/app/profile/orders/userProfileOrdersItem/userProfileOrderProductContainer";
import { GridLoader } from "react-spinners";
import OrderInfos from "./orderInfos";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import OrderEditproducts from "./orderEditProducts/orderEditProducts";
import { useSelector } from "react-redux";

const fetchOrder = async ({ queryKey }) => {
  if (!queryKey[1]) {
    return null;
  }
  const result = await fetch(`/api/order/admin/${queryKey[1]}`);
  if (!result.ok) {
    throw new Error("در هنگام ارتباط با سرور خطایی رخ داده است!");
  }
  const response = await result.json();

  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

const editOrder = async ({ data, orderId }) => {
  const result = await fetch(`/api/order/admin/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!result.ok) {
    throw new Error("در هنگام ارتباط با سرور خطایی رخ داده است");
  }
  const response = await result.json();
  if (response.error) {
    throw new Error(response.error);
  } else if (response.success) {
    return response.success;
  }
  return;
};

const OrderEditView = ({ orderId }) => {
  const {
    isPending: queryIsPending,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: fetchOrder,
  });

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof orderEditSchema>>({
    resolver: zodResolver(orderEditSchema),
    defaultValues: {
      deliveryTime: null,
      deliveryType: null,
      productsList: null,
    },
  });

  const orderProductList = useSelector(
    (state: any) => state?.dragAndDrop?.orderProductList
  );

  useEffect(() => {
    if (orderProductList) {
      const shapedProductList = orderProductList.map((item) => {
        return {
          id: item.id,
          productId: item.productId,
          orderId: item.orderId,
          count: item.count,
          price: item.product ? item.product.rentPrice : item.price,
        };
      });
      setValue("productsList", shapedProductList);
    }
  }, [orderProductList]);

  useEffect(() => {
    console.log(data, " hereeeeee");
    if (data) {
      setValue("deliveryTime", data.deliveryTime);
      setValue("deliveryType", data.deliveryType);
    }
  }, [data]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editOrder,
    onError: (error, variables, context) => {
      toast.error(error.message);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(data);

    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate({ data, orderId });
  };
  const deliveryTimeErrorMessage =
    "زمان ارسال محصول باید یکی از گزینه های زیر باشد: شب، بعد از ظهر";
  const deliveryTypeErrorMessage =
    "نوع تامین محصول باید یکی از گزینه های زیر باشد: تحویل شخصی، ارسال";
  return (
    <Card className="w-[60%] m-5">
      <CardHeader>
        <CardTitle>اطالاعات سفارش</CardTitle>
        <CardDescription>
          میتوانید جزییات سفارش را مشاهده کنید و آن را ویرایش کنید
        </CardDescription>
        {!queryIsPending && data && <OrderEditStatusAction orderId={orderId} status={data.status}/>}
      </CardHeader>

      <CardContent>
        {queryIsPending && !data && (
          <div className="flex justify-center items-center">
            <GridLoader />
          </div>
        )}
        {!orderId && (
          <div className="flex justify-center items-center text-xl">
            هیچ سفارشی انتخاب نشده است
          </div>
        )}
        {!queryIsPending && data && (
          <div className="h-[500px] overflow-y-auto flex flex-col gap-4 ">
            <OrderInfos
              address={data.address}
              price={data.price}
              adminsOfOrder={data.adminsOfOrder}
              description={data.description}
              status={data.status}
              discountCode={data.discountCode}
              createdAt={data.createdAt}
              updatedAt={data.updatedAt}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <OrderSettingItem
                errorMessage={
                  errors.deliveryTime ? deliveryTimeErrorMessage : null
                }
                control={control}
                items={DeliveryTime}
                isDisabled={false}
                itemLabelConventor={deliveryTimeLabels}
                label="زمان ارسال محصولات"
                name="deliveryTime"
              />
              <OrderSettingItem
                errorMessage={
                  errors.deliveryType ? deliveryTypeErrorMessage : null
                }
                control={control}
                items={DeliveryType}
                isDisabled={false}
                itemLabelConventor={deliveryTypeLabels}
                label="نوع ارسال محصولات"
                name="deliveryType"
              />
              <OrderEditproducts productsList={data.productsList} />
              <Button type="submit" color="primary" className="mx-10">
                ویرایش سفارش
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderEditView;
