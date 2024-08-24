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
  currentEnglishCategory: "",
  currentPersianCategory: "",
  newEnglishCategory: "",
  newPersianCategory: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_ENGLISH_CATEGORY":
      return { ...state, currentEnglishCategory: action.payload };
    case "SET_CURRENT_PERSIAN_CATEGORY":
      return { ...state, currentPersianCategory: action.payload };
    case "SET_NEW_ENGLISH_CATEGORY":
      return { ...state, newEnglishCategory: action.payload };
    case "SET_NEW_PERSIAN_CATEGORY":
      return { ...state, newPersianCategory: action.payload };
    default:
      return state;
  }
};

const EditCategory = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // handleCurrentPhoneNumber();
    if (props.category) {
      dispatch({
        type: "SET_CURRENT_ENGLISH_CATEGORY",
        payload: props.category.englishName,
      });
      dispatch({
        type: "SET_CURRENT_PERSIAN_CATEGORY",
        payload: props.category.persianName,
      });
      if (isFirstRender.current) {
        dispatch({
          type: "SET_NEW_ENGLISH_CATEGORY",
          payload: props.category.englishName,
        });
        dispatch({
          type: "SET_NEW_PERSIAN_CATEGORY",
          payload: props.category.persianName,
        });
        setValue("persianName", props.category.persianCategory);
        setValue("englishName", props.category.englishCategory);

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
      id: props.category.id,
      persianName: "",
      englishName: "",
    },
  });

  const updateCategory = async(values : z.infer<typeof addProductSettingAdminWithIdSchema>)=> {
    const result = await fetch('/api/productCategory', {
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
      state.currentEnglishCategory === values.englishName &&
      state.currentPersianCategory === values.persianName
    ) {
      toast.error("مقدار وارد شده با مقداریر فعلی یکی است");
      console.log('error')
      return;
    }
    startTransition(async () => {
      console.log(values);
      await updateCategory(values);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Input
        isClearable
        type="text"
        variant="bordered"
        label="دسته بندی فارسی"
        value={state.newPersianCategory}
        disabled={isPending}
        isInvalid={errors.persianName ? true : false}
        errorMessage={errors.persianName?.message}
        {...register("persianName")}
        onClear={() => {
          dispatch({ type: "SET_NEW_PERSIAN_CATEGORY", payload: "" });
        }}
        onChange={(event) => {
          dispatch({
            type: "SET_NEW_PERSIAN_CATEGORY",
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
        value={state.newEnglishCategory}
        disabled={isPending}
        isInvalid={errors.englishName ? true : false}
        errorMessage={errors.englishName?.message}
        {...register("englishName")}
        onClear={() => {
          dispatch({ type: "SET_NEW_ENGLISH_CATEGORY", payload: "" });
        }}
        onChange={(event) => {
          dispatch({
            type: "SET_NEW_ENGLISH_CATEGORY",
            payload: event.target.value,
          });
        }}
        placeholder="لطفا دسته بندی را به اینگلیسی وارد کنید"
      />
      <Button
        type="submit"
        className="w-full"
        color="primary"
        isLoading={isPending}
      >
        تغییر دسته بندی
      </Button>
    </form>
  );
};

export default EditCategory;
