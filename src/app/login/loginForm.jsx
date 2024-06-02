"use client";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchemaWithNumber } from "@/schema/index";
import ErrorForm from "@/components/formValidateMessages/formError";
import SuccessForm from "../../components/formValidateMessages/formSuccess";
import { loginAction } from "@/actions/loginAction";
import { Button } from "@nextui-org/react";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchemaWithNumber),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const classOfInput = `border-2 rounded-full h-10 px-6 drop-shadow-lg text-gray-800
  focus:outline-none  focus:ring-1 
  focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-white`;

  const okInputClass = `border-black focus:border-primary focus:ring-primaryLight ${classOfInput}`;
  const errorInputClass = `${classOfInput} border-red-500 focus:border-red-500 focus:ring-red-500`;

const login = async (value) => {
  //  try {
      
  //   } catch (error) {
  //     console.log(error)
  //     setError(error.message);
  //   }

  const result = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(value),
  });

  if (result.ok) {
    //return json
    console.log(result);

    const response = await result.json();
    console.log(response);
    if(response.error){
      setError(response.error);
    }else if(response.success){
      setSuccess(response.success)
    }
  } else {
    console.log(response);
  }
} 
  
  const onSubmit = async (value) => {
    // console.log(value);
    // try {
    //   const result = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(value),
    //   });

    //   if (result.ok) {
    //     //return json
    //     // const response = await result.json();
    //     if(result) {
    //       console.log(result);
    //     }
    //   } else {
    //     console.log(response, response.status);
    //   }
    // } catch (error) {
    //   throw new Error(error.message)
    // }
    setError("");
    setSuccess("");
    startTransition(async() => {
      // loginAction(value).then((data) => {
      //   if(data.error){
      //     setError(data.error);
      //   }else if(data.success){
      //     setSuccess(data.success)
      //   }
      // })
      const result =await loginAction(value);
      if(result){
        console.log(result)
         if(result.error){
          setError(result.error);
        }else if(result.success){
          setSuccess(result.success)
        }
      }
      // await login(value)
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <div className="flex flex-col w-9/12 mx-auto  gap-1 mb-1 md:mx-0 md:w-11/12 pl-1">
          <label className="block mr-2 text-[#414141] font-medium dark:text-white">
            لطفا شماره موبایل یا ایمیل یا نام کاربری خود را وارد کنید:
          </label>
          <input
            type="text"
            disabled={isPending}
            {...register("phoneNumber")}
            className={errors.phoneNumber ? errorInputClass : okInputClass}
          />
          {errors.phoneNumber?.message && ( 
            <p className="text-red-500">{errors.phoneNumber?.message}</p>
          )}
        </div>
        <div className="flex flex-col w-9/12 mx-auto  gap-1 mb-1 md:mx-0 md:w-11/12 pl-1">
          <label className="block mr-2 font-medium dark:text-white">
            رمز عبور خود را وارد کنید:
          </label>
          <input
            type="password"
            disabled={isPending}
            {...register("password")}
            className={errors.password ? errorInputClass : okInputClass}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
          <span className="mr-3 mt-7 text-primary font-medium hover:text-primaryDark transition-all">
            <Link href="/forgot-password">فراموشی رمز عبور؟</Link>
          </span>
          <span className="mr-3 text-primary font-medium hover:text-primaryDark transition-all">
            <Link href="/signup">حساب ندارید؟ ثبت نام</Link>
          </span>
          <ErrorForm message={error} />
          <SuccessForm message={success} />
          <Button
          isDisabled={isPending}
          isLoading={isPending}
            type="submit"
            className="bg-primary rounded-full h-10 mt-7 text-white font-bold text-xl drop-shadow-lg hover:bg-primaryDark transition-all duration-200"
          >
            ورود
          </Button>
        </div>
      </form>
      <Link href="/">
        <div className="flex w-9/12 mx-auto">
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

export default LoginForm;
