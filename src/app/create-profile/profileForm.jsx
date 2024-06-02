"use client";
import "jalaali-react-date-picker/lib/styles/index.css";
import Link from "next/link";
import { useReducer, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorForm from "@/components/formValidateMessages/formError";
import SuccessForm from "@/components/formValidateMessages/formSuccess";
import moment from "moment-jalaali";
import "moment/locale/fa"; // Import the Persian (Farsi) locale
// import { DatePicker } from "zaman";
import { InputDatePicker, DatePicker } from "jalaali-react-date-picker";
import { profileClientSchema } from "@/schema/index";
import UploadImage from "@/components/profile/uploadImage";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { CalendarDays } from "lucide-react";
import { Eraser } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";
const initialState = {
  step: 1,
  formValue: "",
  email: "",
  userId: "",
  birthDate: "",
  solarBirthDate: "",
  ISO8601BirthDate: "",
  success: "",
  error: "",
  redirect: null,
  profilePhoto: [],
  photoWithIdCart: [],
  profilePhotoKey: "",
  photoWithIdCartKey: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "SET_FORM_VALUE":
      return { ...state, formValue: action.payload };
    case "SET_USER_EMAIL":
      return { ...state, email: action.payload };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_REDIRECT":
      return { ...state, redirect: action.payload };
    case "SET_PROFILE_PHOTO":
      return { ...state, profilePhoto: action.payload };
    case "SET_PHOTO_WITH_ID_CART":
      return { ...state, photoWithIdCart: action.payload };
    case "SET_PROFILE_PHOTO_KEY":
      return { ...state, profilePhotoKey: action.payload };
    case "SET_PHOTO_WITH_ID_CART_KEY":
      return { ...state, photoWithIdCartKey: action.payload };
    case "SET_BIRTH_DATE":
      return { ...state, birthDate: action.payload };
    case "SET_SOLAR_BIRTH_DATE":
      return { ...state, solarBirthDate: action.payload };
    case "SET_ISO_BIRTH_DATE":
      return { ...state, ISO8601BirthDate: action.payload };
    default:
      return state;
  }
};

const ProfileForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useCurrentUser();

  const nextStep =async () => { 

    // trigger()

    // if(Object.keys(errors).length !== 0) {
    //   return 
    // }

    dispatch({ type: "NEXT_STEP" });
  };

 const prevStep = (e) => {
  e.preventDefault()
  console.log(state)
  dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_SUCCESS", payload: "" });
    dispatch({ type: "PREV_STEP" });

 }

  const handleDateChange = (date) => {
    console.log(date);
    if (date) {
      const gregorianDate = date._i;
      const solarDate = moment(gregorianDate, "YYYY-MM-DD").format(
        "jYYYY/jMM/jDD"
      );
      dispatch({ type: "SET_SOLAR_BIRTH_DATE", payload: solarDate });
      dispatch({ type: "SET_BIRTH_DATE", payload: date });
      dispatch({ type: "SET_ISO_BIRTH_DATE", payload: date.toISOString() });
      console.log(gregorianDate);
      console.log(solarDate);
      setValue("birthDate", solarDate);
      // trigger('birthDate');
    }
  };

  const clearDateHandler = () => {
    dispatch({ type: "SET_SOLAR_BIRTH_DATE", payload: "" });
    dispatch({ type: "SET_BIRTH_DATE", payload: "" });
    dispatch({ type: "SET_ISO_BIRTH_DATE", payload: "" });
    setValue("birthDate", "");

    // trigger('birthDate');
  };

  const profileImageDeleteHandler = (img) => {
    dispatch({ type: "SET_PROFILE_PHOTO", payload: [] });
  };
  const idCartImageDeleteHandler = (img) => {
    dispatch({ type: "SET_PHOTO_WITH_ID_CART", payload: [] });
  };

  const setProfileImage = (image) => {
    dispatch({ type: "SET_PROFILE_PHOTO", payload: image });
  };

  const setIdCartImage = (image) => {
    dispatch({ type: "SET_PHOTO_WITH_ID_CART", payload: image });
  };

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileClientSchema),
    defaultValues: {
      nationalCode: "",
      birthDate: "",
      job: "",
      landlineNumber: "",
      fatherName: "",
      photoWithIDCard: "",
      firstName: "",
      lastName: "",
      profileImage: "",
    },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const classOfInput = `border-2 rounded-full h-10 px-6 drop-shadow-lg text-gray-800
  focus:outline-none  focus:ring-1 
  focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-white flex items-center justify-between`;

  const okInputClass = `border-black focus:border-primary focus:ring-primaryLight ${classOfInput}`;
  const errorInputClass = `${classOfInput} border-red-500 focus:border-red-500 focus:ring-red-500`;

  const [isPending, startTransition] = useTransition();

  const uploadFile = async (image, folder) => {
    // const result =await uploadImage(image[0])
    // console.log(result)
    const userName = user.userName
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("folder", folder);
    formData.append("userName", userName);
    try {
      const result = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (result.ok) {
        const response = await result.json();
        if (response.error) {
          console.log(response.error);
          dispatch({
            type: "SET_ERROR",
            payload:
              "در هنگام بارگذاری عکس ها مشکلی پیش امده است ، لطفا مجدد تلاش کنید",
          });
          return;
        } else if (response.success) {
          console.log(response.success);
          dispatch({ type: "SET_SUCCESS", payload: "عکس ها بارگذاری شداند" });
          return response;
        }
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "در ارتباط با سرور خطایی رخ داده است لطفا مجدد تلاش کنید",
        });
        console.log(result);
        return;
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          "در بارگذاری عکس ها خطایی رخ داده است لطفا بعدا مجدد تلاس کنید",
      });
    }
  };

  const uploadImage = async (image,imageKey, folder, setKey) => {
    if(image.length > 1) {
      if(imageKey !== "") {
        console.log(imageKey)
        return imageKey
      }
      const result = await uploadFile(image, folder);
      if (result.success && result.result.key) {
        // set success
        dispatch({ type: setKey, payload: result.result.key });
        console.log("result: ",result)
        return result.result.key
      }else{
        return false
      }
    }else {
      return ""
    }
  };

  const createProfile = async (value, profileImageKey,idCartImageKey) => {
    console.log('function execute')
    if (!user.id) {
      // set error
      dispatch({
        type: "SET_ERROR",
        payload: "خطایی رخ داده لطفا صفحه را مجدد بارگذاری کنید",
      });
      return;
    }


    try {
      const result = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...value,
          email: user.email,
          id: user.id,
          ...(state.birthDate !== "" && {
            birthDate: {
              birthDate: state.birthDate,
              solarBirthDate: state.solarBirthDate,
              ISO8601BirthDate: state.ISO8601BirthDate,
            },
          }),
          ...(state.photoWithIdCartKey === "" ? {photoWithIDCard:idCartImageKey }: {
            photoWithIDCard: state.photoWithIdCartKey,
          }),
          ...(state.profilePhotoKey === "" ? {profileImage:profileImageKey} : {
            profileImage: state.profilePhotoKey,
          }),
        }),
      });
      if (result.ok) {
        const response = await result.json();
        if (response.success) {
          dispatch({ type: "SET_SUCCESS", payload: response.success });
        } else if (response.error) {
          dispatch({ type: "SET_ERROR", payload: response.error });
          return;
        } else {
          console.log(response)
        }
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          "در روند ساخت پروفایل خطایی رخ داده لطفا در زمان دیگری تلاش کنید",
      });
      return;
    }
  };

  const submitProfileCreation = async (e) => {
    e.preventDefault()
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_SUCCESS", payload: "" });
  
  const profileImageKey = await uploadImage(state.profilePhoto,state.profilePhotoKey, "profile", "SET_PROFILE_PHOTO_KEY");

     const idCartImageKey = await uploadImage(
        state.photoWithIdCart,
        state.photoWithIdCartKey,
        "idCart",
        "SET_PHOTO_WITH_ID_CART_KEY"
      );

    const newValue = { ...state.formValue };
    delete newValue.birthDate;
    if(profileImageKey !== false && idCartImageKey !==false) {
      console.log("profileImageKey:" ,profileImageKey , " idCartImageKey: ",idCartImageKey)
      await createProfile(newValue,profileImageKey,idCartImageKey );
    } else {
      return
    }
    console.log(state.formData);
    console.log(newValue);
    console.log('state: ',state)
  }

  const onSubmit = async (value) => {
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_SUCCESS", payload: "" });
    dispatch({type:"SET_FORM_VALUE", payload: value})
    nextStep()
  };

  // const onSubmit = async (value) => {
  //   dispatch({ type: "SET_ERROR", payload: "" });
  //   dispatch({ type: "SET_SUCCESS", payload: "" });
  //   if (state.profilePhoto.length > 1) {
  //     await uploadImage(state.profilePhoto, "profile", "SET_PROFILE_PHOTO_KEY");
  //   }
  //   if (state.photoWithIdCart.length > 1) {
  //     await uploadImage(
  //       state.photoWithIdCart,
  //       "idCart",
  //       "SET_PHOTO_WITH_ID_CART_KEY"
  //     );
  //   }
  //   const newValue = { ...value };
  //   delete newValue.birthDate;
  //   await createProfile(newValue);
  //   console.log(newValue);
  //   console.log('state: ',state)
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md h-[70%] lg:h-[80%] ">
      {state.step === 1 && (
        <>
          <div className="overflow-y-auto h-[80%] md:h-[75%] lg:h-[70%] xl:h-[80%] ">
            <div className="flex flex-col gap-2 mt-2 ">
              <div className="flex ">
                <div className="flex flex-col gap-1 mb-1 w-1/2 pl-1 ">
                  <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                    نام:
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    disabled={isPending}
                    type="text"
                    {...register("firstName")}
                    className={
                      errors.firstName ? errorInputClass : okInputClass
                    }
                  />
                  {errors.firstName?.message && (
                    <p className="text-red-500">{errors.firstName?.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 mb-1 w-1/2 pr-1">
                  <label className="block mr-2 font-medium dark:text-white">
                    نام خانوادگی:
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    disabled={isPending}
                    type="text"
                    {...register("lastName")}
                    className={errors.lastName ? errorInputClass : okInputClass}
                  />
                  {errors.lastName?.message && (
                    <p className="text-red-500">{errors.lastName?.message}</p>
                  )}
                </div>
              </div>
              <div className="flex ">
                <div className="flex flex-col gap-1 mb-1 w-1/2 pl-1 ">
                  <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                    کد ملی:
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    disabled={isPending}
                    type="text"
                    {...register("nationalCode")}
                    className={
                      errors.nationalCode ? errorInputClass : okInputClass
                    }
                  />
                  {errors.nationalCode?.message && (
                    <p className="text-red-500">
                      {errors.nationalCode?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 mb-1 w-1/2 pr-1">
                  <label className="block mr-2 font-medium dark:text-white">
                    شغل:
                  </label>
                  <input
                    disabled={isPending}
                    type="text"
                    {...register("job")}
                    className={errors.job ? errorInputClass : okInputClass}
                  />
                  {errors.job?.message && (
                    <p className="text-red-500">{errors.job?.message}</p>
                  )}
                </div>
              </div>
              <div className="flex ">
                <div className="flex flex-col gap-1 mb-1 w-1/2 pl-1 ">
                  <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                    شماره تلفن ثابت:
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    disabled={isPending}
                    type="text"
                    {...register("landlineNumber")}
                    className={
                      errors.landlineNumber ? errorInputClass : okInputClass
                    }
                  />
                  {errors.landlineNumber?.message && (
                    <p className="text-red-500">
                      {errors.landlineNumber?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 mb-1 w-1/2 pr-1">
                  <label className="block mr-2 font-medium dark:text-white">
                    نام پدر:
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    disabled={isPending}
                    type="text"
                    {...register("fatherName")}
                    className={
                      errors.fatherName ? errorInputClass : okInputClass
                    }
                  />
                  {errors.fatherName?.message && (
                    <p className="text-red-500">{errors.fatherName?.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-1">
                <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                  تاریخ تولد:
                  <span className="text-red-600 font-bold text-xl"> *</span>
                </label>
                <div
                  //   className="border-2 rounded-full h-max w-full border-black px-6 drop-shadow-lg text-gray-800
                  // focus:outline-none focus:border-primary focus:ring-primaryLight focus:ring-1
                  // focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] flex flex-row bg-white "
                  className={
                    errors.birthDate
                      ? `${errorInputClass} bg-white`
                      : `${okInputClass} bg-white`
                  }
                >
                  <button
                    onClick={clearDateHandler}
                    type="button"
                    className=" active:scale-125 hover:text-primary"
                  >
                    <Eraser />
                  </button>

                  <input
                    disabled={isPending}
                    type="text"
                    value={state.solarBirthDate}
                    // {...register('birthDate')}
                    className="appearance-none outline-none"
                    readOnly
                  />

                  <Popover placement="right">
                    <PopoverTrigger>
                      <button
                        type="button"
                        className=" active:scale-125 hover:text-primary"
                      >
                        <CalendarDays />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <DatePicker
                        dateFormat="jYYYY/jMM/jDD"
                        value={state.birthDate}
                        disabled={isPending}
                        onChange={handleDateChange}
                        wrapperClassName="rounded-full flex flex-row"
                        wrapperStyle={{
                          all: "unset",
                          display: "flex",
                          justifyContent: "between",
                          width: "100%",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {errors.birthDate?.message && (
                  <p className="text-red-500">{errors.birthDate?.message}</p>
                )}
                {/* <DatePicker 
          defaultValue={selectedDate}
          onChange={handleDateChange}
          required
          inputClass='border-2 rounded-full h-8 w-full border-black px-6 drop-shadow-lg text-gray-800
          focus:outline-none focus:border-primary focus:ring-primaryLight focus:ring-1 
          focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] flex flex-row'
        /> */}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary rounded-full h-10 my-2 text-white font-bold text-xl drop-shadow-lg hover:bg-primaryDark transition-all duration-200 w-full"
          >
            بعدی
          </button>
        </>
      )}
      {state.step === 2 && (
        <div>
          <div className="flex flex-col gap-1 mt-1">
            <label className="block mr-2 text-[#414141] font-medium dark:text-white">
              عکس پروفایل:
            </label>
            <UploadImage
              image={state.profilePhoto}
              setImage={setProfileImage}
              imageDeleteHandler={profileImageDeleteHandler}
            />
          </div>

          <div className="flex flex-col mt-2">
            <div className="flex items-center">
              <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                عکس خودتان به همراه کارت ملی:
              </label>
              <Button
                onClick={onOpen}
                size="sm"
                variant="bordered"
                color="primary"
                radius="full"
                className="m-2 "
              >
                راهنما
              </Button>
            </div>
            <UploadImage
              image={state.photoWithIdCart}
              setImage={setIdCartImage}
              imageDeleteHandler={idCartImageDeleteHandler}
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <ErrorForm message={state.error} />
            <SuccessForm message={state.success} />
            <div className="flex justify-between">
            <button
              onClick={submitProfileCreation}
              className="bg-primary rounded-full h-10 text-white font-bold text-xl drop-shadow-lg hover:bg-primaryDark transition-all duration-200 w-[47%]"
            >
              ساختن پروفایل
            </button>
            <button
              onClick={prevStep}
              className="bg-primary rounded-full h-10 text-white font-bold text-xl drop-shadow-lg hover:bg-primaryDark transition-all duration-200 w-[47%]"
            >
              قبلی
            </button>
            </div>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
      <Link href="/">
        <div className="flex mt-2 fill-black hover:text-primary hover:fill-primary transition-all">
          <span>صفحه اصلی</span>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.25392 7.24514C9.25392 7.24514 5.25192 11.2498 3.69361 12.809C3.56383 12.9397 3.49805 13.1104 3.49805 13.2801C3.49805 13.4508 3.56383 13.6215 3.69361 13.7522C5.25192 15.3105 9.25126 19.3134 9.25126 19.3134C9.38193 19.4441 9.55261 19.5081 9.72417 19.5063C9.89307 19.5054 10.062 19.4396 10.1909 19.3099C10.4513 19.0503 10.4531 18.6289 10.1944 18.3711L5.77106 13.9468L18.8313 13.9468C19.1994 13.9468 19.498 13.6482 19.498 13.2801C19.498 12.913 19.1994 12.6134 18.8313 12.6134L5.77106 12.6134L10.1962 8.18834C10.454 7.93144 10.4513 7.51094 10.1909 7.25054C10.062 7.12164 9.89307 7.05584 9.72417 7.05404C9.55349 7.05224 9.38282 7.11624 9.25392 7.24514Z" />
          </svg>
        </div>
      </Link>
    </form>
  );
};

export default ProfileForm;
