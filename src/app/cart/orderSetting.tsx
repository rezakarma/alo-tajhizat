"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { RadioGroup, Radio } from "@nextui-org/react";
import { orderSettingSchema } from "@/schema";
import { DeliveryTime, DeliveryType } from "@prisma/client";
import { deliveryTimeLabels, deliveryTypeLabels } from "../utils/enumUtils";
import OrderSettingItem from "./orderSettingItem";
import { useEffect } from "react";
import AddressSelector from "./addressSelector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceAction } from "@/store/cart-slice";

const submitOrder = async (values) => {
  const result = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
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

const OrderSetting = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof orderSettingSchema>>({
    resolver: zodResolver(orderSettingSchema),
    defaultValues: {
      deliveryTime: null,
      deliveryType: null,
      addressId: "",
      description: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: submitOrder,
    onError: (error, variables, context) => {
      toast.error(error.message);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(data);
      dispatch(cartSliceAction.clearCart());
      router.push("/profile/orders");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  const deliveryTimeErrorMessage =
    "زمان ارسال محصول باید یکی از گزینه های زیر باشد: شب، بعد از ظهر";
  const deliveryTypeErrorMessage =
    "نوع تامین محصول باید یکی از گزینه های زیر باشد: تحویل شخصی، ارسال";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <OrderSettingItem
        errorMessage={errors.deliveryTime ? deliveryTimeErrorMessage : null}
        control={control}
        items={DeliveryTime}
        isDisabled={cartProducts.length === 0}
        itemLabelConventor={deliveryTimeLabels}
        label="زمان ارسال محصولات"
        name="deliveryTime"
      />
      <OrderSettingItem
        errorMessage={errors.deliveryType ? deliveryTypeErrorMessage : null}
        control={control}
        items={DeliveryType}
        isDisabled={cartProducts.length === 0}
        itemLabelConventor={deliveryTypeLabels}
        label="نوع ارسال محصولات"
        name="deliveryType"
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">توضیحات سفارش</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            {...register("description")}
            variant="faded"
            placeholder="توضیحات سفارش را بنویسید"
            description="تا حدااکثر 300 نویسه"
            className=""
            maxRows={5}
            isDisabled={cartProducts.length === 0}
          />
        </CardContent>
      </Card>
      <AddressSelector
        errorMessage={errors.addressId ? errors.addressId.message : null}
        control={control}
        name={"addressId"}
        isDisabled={cartProducts.length === 0}
      />
      <Button
        type="submit"
        color="primary"
        isDisabled={isPending || cartProducts.length === 0}
        isLoading={isPending}
      >
        تایید و تکمیل سفارش
      </Button>
    </form>
  );
};

export default OrderSetting;
