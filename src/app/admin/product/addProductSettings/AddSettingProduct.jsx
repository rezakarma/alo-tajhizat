"use client";
import { Button } from "@nextui-org/react";
import UserProfileCard from "@/components/card/userProfileCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSettingAdminSchema } from "@/schema/index";
import { useTransition } from "react";

const AddSettingProduct = ({ title, onSubmitHandler }) => {
  const classOfInput = `border-2 rounded-full h-10 px-6 drop-shadow-lg text-gray-800
  focus:outline-none  focus:ring-1 
  focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-white`;

  const okInputClass = `border-primary w-[100%] focus:border-primary focus:ring-primaryLight ${classOfInput}`;
  const errorInputClass = `${classOfInput} border-red-500 w-[100%] my-0 focus:border-red-500 focus:ring-red-500`;
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductSettingAdminSchema),
    defaultValues: {
      persianName: "",
      englishName: "",
    },
  });

  const onSubmit = async (value) => {
    startTransition(async () => {
      await onSubmitHandler  (value);
    });
    console.log(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col xl:flex-row w-full mx-auto  items-center gap-10"
    >
      <UserProfileCard title={title}>
        <div className=" flex flex-col my-16 xl:flex-row md:justify-start items-center gap-10 p-10">
          <div className="m-4">
            <input
              type="text"
              id="productPersianName"
              // value={statePr}
              placeholder="متن فارسی"
              className={errors.persianName ? errorInputClass : okInputClass}
              // onChange={(e)=>dispatchPr(e.target.value)}
              {...register("persianName")}
            />
            {errors.persianName?.message && (
              <p className="text-red-500">{errors.persianName?.message}</p>
            )}
          </div>

          <div className="m-4">
            <input
              type="text"
              id="productEnglishName"
              // value={stateEn}
              placeholder="English text"
              className={errors.englishName ? errorInputClass : okInputClass}
              // onChange={(e)=>dispatchEn(e.target.value)}
              {...register("englishName")}
            />
            {errors.englishName?.message && (
              <p className="text-red-500">{errors.englishName?.message}</p>
            )}
          </div>
          <Button
            type="submit"
            isDisabled={isPending}
            isLoading={isPending}
            className="bg-primary text-gray-200 text-base font-semibold"
          >
            + اضافه کردن
          </Button>
        </div>
      </UserProfileCard>
    </form>
  );
};

export default AddSettingProduct;
