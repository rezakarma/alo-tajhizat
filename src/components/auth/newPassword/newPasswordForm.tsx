"use client";
import Link from "next/link";
import { useReducer, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordClientSchema } from "@/schema/index";
import ErrorForm from "@/components/formValidateMessages/formError";
import SuccessForm from "@/components/formValidateMessages/formSuccess";
import { Button } from "@nextui-org/react";
import useFingerPrint from "@/hooks/useFingerPrint";
import { useSearchParams } from "next/navigation";

const initialState = {
  userFingerPrintHash: null,
  userIP: "",
  success: "",
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FINGERPRINT":
      return { ...state, userFingerPrintHash: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "SET_USER_IP":
      return { ...state, userIP: action.payload };
    default:
      return state;
  }
};

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const fingerPrintHash = useFingerPrint();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordClientSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    async function fetchUserIP() {
      const response = await fetch("/api/get-ip");
      const data = await response.json();
      dispatch({ type: "SET_USER_IP", payload: data.userIP });
    }
    dispatch({ type: "SET_FINGERPRINT", payload: fingerPrintHash });

    fetchUserIP();
  }, [fingerPrintHash]);

  const classOfInput = `border-2 rounded-full h-10 px-6 drop-shadow-lg text-gray-800
  focus:outline-none  focus:ring-1 
  focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-white`;

  const okInputClass = `border-black focus:border-primary focus:ring-primaryLight ${classOfInput}`;
  const errorInputClass = `${classOfInput} border-red-500 focus:border-red-500 focus:ring-red-500`;

  const newPassword = async (value) => {
    try {
      const result = await fetch("/api/new-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...value,
          identifier: state.userFingerPrintHash,
          ipAddress: state.userIP,
          token: token,
        }),
      });
      console.log(result);
      if (result.ok) {
        const response = await result.json();
        console.log(response);
        if (response.success) {
          dispatch({ type: "SET_SUCCESS", payload: response.success });
        } else if (response.error) {
          dispatch({ type: "SET_ERROR", payload: response.error });
        }
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const onSubmit = async (value) => {
    console.log(value, state.userFingerPrintHash, state.userIP);

    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_SUCCESS", payload: "" });
    startTransition(async () => {
      await newPassword(value);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <div className="flex flex-col gap-4 mb-8">
          <label className="block mr-2 text-[#414141] font-medium">
            لطفا رمزعبور جدید خود را وارد کنید
          </label>
          <input
            type="password"
            disabled={isPending}
            placeholder="********"
            {...register("password")}
            className={errors.password ? errorInputClass : okInputClass}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
          <label className="block mr-2 text-[#414141] font-medium">
            لطفا رمزعبور جدید خود مجددا وارد کنید
          </label>
          <input
            type="password"
            disabled={isPending}
            placeholder="********"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? errorInputClass : okInputClass}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="mr-3 text-primary font-medium hover:text-primaryDark transition-all">
            <Link href="/login">ورود به حساب کاربری</Link>
          </span>
          <span className="mr-3 text-primary font-medium hover:text-primaryDark transition-all">
            <Link href="/signup">حساب ندارید؟ ثبت نام</Link>
          </span>
          <ErrorForm message={state.error} />
          <SuccessForm message={state.success} />
          <Button
            isDisabled={isPending}
            isLoading={isPending}
            type="submit"
            className="bg-primary rounded-full h-10 text-white font-bold text-xl drop-shadow-lg hover:bg-primaryDark transition-all duration-200"
          >
            ثبت رمز عبور جدید
          </Button>
        </div>
      </form>
      <Link href="/">
        <div className="flex">
          <span>صفحه اصلی</span>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.25392 7.24514C9.25392 7.24514 5.25192 11.2498 3.69361 12.809C3.56383 12.9397 3.49805 13.1104 3.49805 13.2801C3.49805 13.4508 3.56383 13.6215 3.69361 13.7522C5.25192 15.3105 9.25126 19.3134 9.25126 19.3134C9.38193 19.4441 9.55261 19.5081 9.72417 19.5063C9.89307 19.5054 10.062 19.4396 10.1909 19.3099C10.4513 19.0503 10.4531 18.6289 10.1944 18.3711L5.77106 13.9468L18.8313 13.9468C19.1994 13.9468 19.498 13.6482 19.498 13.2801C19.498 12.913 19.1994 12.6134 18.8313 12.6134L5.77106 12.6134L10.1962 8.18834C10.454 7.93144 10.4513 7.51094 10.1909 7.25054C10.062 7.12164 9.89307 7.05584 9.72417 7.05404C9.55349 7.05224 9.38282 7.11624 9.25392 7.24514Z"
              fill="black"
            />
          </svg>
        </div>
      </Link>
    </>
  );
};

export default NewPasswordForm;
