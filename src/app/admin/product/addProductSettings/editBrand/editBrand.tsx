"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addProductSettingAdminWithIdSchema } from "@/schema/index";
import { z } from "zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useEffect, useReducer, useRef, useTransition } from "react";
import { toast } from "sonner";

const initialState = {
  currentEnglishBrand: "",
  currentPersianBrand: "",
  newEnglishBrand: "",
  newPersianBrand: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_ENGLISH_BRAND":
      return { ...state, currentEnglishBrand: action.payload };
    case "SET_CURRENT_PERSIAN_BRAND":
      return { ...state, currentPersianBrand: action.payload };
    case "SET_NEW_ENGLISH_BRAND":
      return { ...state, newEnglishBrand: action.payload };
    case "SET_NEW_PERSIAN_BRAND":
      return { ...state, newPersianBrand: action.payload };
    default:
      return state;
  }
};

const EditBrand = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // handleCurrentPhoneNumber();
    if (props.brand) {
      dispatch({
        type: "SET_CURRENT_ENGLISH_BRAND",
        payload: props.brand.englishName,
      });
      dispatch({
        type: "SET_CURRENT_PERSIAN_BRAND",
        payload: props.brand.persianName,
      });
      if (isFirstRender.current) {
        dispatch({
          type: "SET_NEW_ENGLISH_BRAND",
          payload: props.brand.englishName,
        });
        dispatch({
          type: "SET_NEW_PERSIAN_BRAND",
          payload: props.brand.persianName,
        });
        setValue("persianName", props.brand.persianName);
        setValue("englishName", props.brand.englishName);

        isFirstRender.current = false; // Update the ref value after the first render
      }
    }
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductSettingAdminWithIdSchema),
    defaultValues: {
      id: props.brand.id,
      persianName: "",
      englishName: "",
    },
  });

  const updateBrand = async(values : z.infer<typeof addProductSettingAdminWithIdSchema>)=> {
    const result = await fetch('/api/productBrand', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    })
    if(!result.ok) {
        toast.error("خطایی در ارتباط با سرور رخ داده است");
        return
    }

    const response = await result.json()

    if(response.error){
        toast.error(response.error);
    }else if(response.success) {
        toast.success(response.success)
    }
    return

  }

  function onSubmit(values: z.infer<typeof addProductSettingAdminWithIdSchema>) {
    console.log(state.currentEnglishBrand)
    if (
      state.currentEnglishBrand === values.englishName &&
      state.currentPersianBrand === values.persianName
    ) {
      toast.error("مقدار وارد شده با مقداریر فعلی یکی است");
      console.log('error')
      return;
    }
    startTransition(async () => {
      console.log(values);
      await updateBrand(values);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Input
        isClearable
        type="text"
        variant="bordered"
        label="برند فارسی"
        value={state.newPersianBrand}
        disabled={isPending}
        isInvalid={errors.persianName ? true : false}
        errorMessage={errors.persianName?.message}
        {...register("persianName")}
        onClear={() => {
          dispatch({ type: "SET_NEW_PERSIAN_BRAND", payload: "" });
        }}
        onChange={(event) => {
          dispatch({
            type: "SET_NEW_PERSIAN_BRAND",
            payload: event.target.value,
          });
        }}
        placeholder="لطفا برند را به فارسی  وارد کنید"
      />
      <Input
        isClearable
        type="text"
        variant="bordered"
        label="برند اینگلیسی"
        value={state.newEnglishBrand}
        disabled={isPending}
        isInvalid={errors.englishName ? true : false}
        errorMessage={errors.englishName?.message}
        {...register("englishName")}
        onClear={() => {
          dispatch({ type: "SET_NEW_ENGLISH_BRAND", payload: "" });
        }}
        onChange={(event) => {
          dispatch({
            type: "SET_NEW_ENGLISH_BRAND",
            payload: event.target.value,
          });
        }}
        placeholder="لطفا برند را به اینگلیسی وارد کنید"
      />
      <Button
        type="submit"
        className="w-full"
        color="primary"
        isLoading={isPending}
      >
        تغییر برند
      </Button>
    </form>
  );
};

export default EditBrand;
