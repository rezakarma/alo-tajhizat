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
  currentEnglishType: "",
  currentPersianType: "",
  newEnglishType: "",
  newPersianType: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_ENGLISH_TYPE":
      return { ...state, currentEnglishType: action.payload };
    case "SET_CURRENT_PERSIAN_TYPE":
      return { ...state, currentPersianType: action.payload };
    case "SET_NEW_ENGLISH_TYPE":
      return { ...state, newEnglishType: action.payload };
    case "SET_NEW_PERSIAN_TYPE":
      return { ...state, newPersianType: action.payload };
    default:
      return state;
  }
};

const EditType = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // handleCurrentPhoneNumber();
    if (props.type) {
      dispatch({
        type: "SET_CURRENT_ENGLISH_TYPE",
        payload: props.type.englishName,
      });
      dispatch({
        type: "SET_CURRENT_PERSIAN_TYPE",
        payload: props.type.persianName,
      });
      if (isFirstRender.current) {
        dispatch({
          type: "SET_NEW_ENGLISH_TYPE",
          payload: props.type.englishName,
        });
        dispatch({
          type: "SET_NEW_PERSIAN_TYPE",
          payload: props.type.persianName,
        });
        setValue("persianName", props.type.persianType);
        setValue("englishName", props.type.englishType);

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
      id: props.type.id,
      persianName: "",
      englishName: "",
    },
  });

  const updateType = async(values : z.infer<typeof addProductSettingAdminWithIdSchema>)=> {
    const result = await fetch('/api/productType', {
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
    console.log(state.currentEnglishType)
    if (
      state.currentEnglishType === values.englishName &&
      state.currentPersianType === values.persianName
    ) {
      toast.error("مقدار وارد شده با مقداریر فعلی یکی است");
      console.log('error')
      return;
    }
    startTransition(async () => {
      await updateType(values);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Input
        isClearable
        type="text"
        variant="bordered"
        label="نوع فارسی"
        value={state.newPersianType}
        disabled={isPending}
        isInvalid={errors.persianName ? true : false}
        errorMessage={errors.persianName?.message}
        {...register("persianName")}
        onClear={() => {
          dispatch({ type: "SET_NEW_PERSIAN_TYPE", payload: "" });
        }}
        onChange={(event) => {
          dispatch({
            type: "SET_NEW_PERSIAN_TYPE",
            payload: event.target.value,
          });
        }}
        placeholder="لطفا نوع را به فارسی  وارد کنید"
      />
      <Input
        isClearable
        type="text"
        variant="bordered"
        label="نوع اینگلیسی"
        value={state.newEnglishType}
        disabled={isPending}
        isInvalid={errors.englishName ? true : false}
        errorMessage={errors.englishName?.message}
        {...register("englishName")}
        onClear={() => {
          dispatch({ type: "SET_NEW_ENGLISH_TYPE", payload: "" });
        }}
        onChange={(event) => {
          dispatch({
            type: "SET_NEW_ENGLISH_TYPE",
            payload: event.target.value,
          });
        }}
        placeholder="لطفا نوع را به اینگلیسی وارد کنید"
      />
      <Button
        type="submit"
        className="w-full"
        color="primary"
        isLoading={isPending}
      >
        تغییر نوع
      </Button>
    </form>
  );
};

export default EditType;
