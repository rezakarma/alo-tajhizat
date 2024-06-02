'use client';

import PrimaryButton from "@/components/button/primaryButton";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactUsForm } from "@/schema/index";

function FormUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactUsForm),
    defaultValues: {
      name:"",
      email:"",
      phoneNumber:"",
      description:""
    },
  });

  const onSubmit = async (value) => {
    try {
      const response = await fetch("/api/ContactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
  
      if (!response.ok) {
        throw new Error("response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(value)
  };

  return (
    <form className="md:w-11/12 lg:mb-12 w-11/12 mx-auto lg:mx-0 " onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-3 lg:mb-4 ">
        <label
          htmlFor="first_name"
          className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow "
        >
          نام و نام خانوادگی
        </label>
        <input
          type="text"
          id="first_name"
          className=" shadow-xl border-solid border-2 border-primary rounded-full dark:bg-gray-200 appearance-none w-[100%] md:w-[20rem] py-2 px-3 hover:border-primaryLight hover:ring-1 hover:ring-primaryLight hover:ring-offset-1 hover:ring-offset-primaryLight/[.1] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  transition-all duration-300"
          placeholder="نام و نام خانوادگی خود را وارد کنید"
          {...register("name")}
        />
        {errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="last_name"
          className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
        >
          شماره تماس
        </label>
        <input
          type="number"
          id="phonNumber"
          className="shadow-xl appearance-none border-solid border-2 border-primaryLight rounded-full dark:bg-gray-200 w-[100%] md:w-[20rem] py-2 px-3 hover:border-primaryLight hover:ring-1 hover:ring-primaryLight hover:ring-offset-1 hover:ring-offset-primaryLight/[.1] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  transition-all duration-300"
          placeholder="شماره تماس خود را وارد کنید"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber?.message && <p className="text-red-500">{errors.phoneNumber?.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="last_name"
          className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
        >
          ایمیل
        </label>
        <input
          type="text"
          id="Email"
          className="shadow-xl appearance-none border-solid border-2 border-primaryLight rounded-full dark:bg-gray-200 w-[100%] md:w-[20rem] py-2 px-3 hover:border-primaryLight hover:ring-1 hover:ring-primaryLight hover:ring-offset-1 hover:ring-offset-primaryLight/[.1] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  transition-all duration-300"
          placeholder="ایمیل خود را وارد کنید"
          {...register("email")}
        />
        {errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
        >
          پیام
        </label>
        <textarea
          id="message"
          className="shadow-xl resize-none appearance-none border-solid border-2 border-primaryLight rounded-xl dark:bg-gray-200 w-[100%] md:w-[20rem] py-2 px-3 hover:border-primaryLight hover:ring-1 hover:ring-primaryLight hover:ring-offset-1 hover:ring-offset-primaryLight/[.1] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  transition-all duration-300"
          rows="4"
          placeholder="پیام خود را وارد کنید"
          {...register("description")}
        ></textarea>
      {errors.description?.message && <p className="text-red-500">{errors.description?.message}</p>}
      </div>
      <PrimaryButton
      type="submit"
            title="ثبت پرسش"
            className="bg-primary shadow-xl w-[13rem] mx-auto h-12 font-bold rounded-full lg:w-80  text-white drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)]  hover:bg-primaryDark hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-300"
          />
    </form>
  );
}

export default FormUs;
