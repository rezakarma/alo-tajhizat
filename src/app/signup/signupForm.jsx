"use client";
import React, { useEffect, useReducer } from "react";
import "jalaali-react-date-picker/lib/styles/index.css";
import Link from "next/link";
import moment from "moment-jalaali";
import "moment/locale/fa"; // Import the Persian (Farsi) locale
import { DatePicker } from "zaman";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupClientSchema } from "@/schema/index";
import ErrorForm from "@/components/formValidateMessages/formError";
import SuccessForm from "../../components/formValidateMessages/formSuccess";
import ConfirmFormModal from "./confirmFormModal";
import { useDispatch, useSelector } from "react-redux";
import { profileEditMoadalAction } from "../../store/profileEditModal-slice";
import useFingerPrint from "@/hooks/useFingerPrint";
import { Button, Input } from "@nextui-org/react";
import CountDown from "@/components/utils/countDown";
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

const initialState = {
  step: 1,
  formValue: "",
  userFingerPrintHash: null,
  verificationCode: "",
  userIP: "",
  verificationcodeExpired: false,
  expireDate: null,
  success: "",
  error: "",
  redirect: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "SET_FORM_VALUE":
      return { ...state, formValue: action.payload };
    case "SET_FINGERPRINT":
      return { ...state, userFingerPrintHash: action.payload };
    case "SET_VERIFICATION_CODE":
      return { ...state, verificationCode: action.payload };
    case "SET_USER_IP":
      return { ...state, userIP: action.payload };
    case "VERIFICATION_CODE_EXPIRED":
      return { ...state, verificationcodeExpired: action.payload };
    case "SET_EXPIRE_DATE":
      return { ...state, expireDate: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_REDIRECT":
      return { ...state, redirect: action.payload };
    default:
      return state;
  }
};

const SignupForm = () => {
  // const [selectedDate, setSelectedDate] = useState(null);
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   if (date) {
  //     const gregorianDate = date._i;
  //     const solarDate = moment(gregorianDate, "YYYY-MM-DD").format(
  //       "jYYYY/jMM/jDD"
  //     );
  //     console.log(gregorianDate);
  //     console.log(solarDate);
  //   }

  const reduxDispatch = useDispatch();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isPending, startTransition] = useTransition();

  const fingerPrintHash = useFingerPrint();
const [stateRedirect, setRedirect]= useState(null)
  useEffect(() => {
    async function fetchUserIP() {
      const response = await fetch("/api/get-ip");
      const data = await response.json();
      dispatch({ type: "SET_USER_IP", payload: data.userIP });
    }
    dispatch({ type: "SET_FINGERPRINT", payload: fingerPrintHash });

    fetchUserIP();
    if (stateRedirect) {
      // router.replace('/signup');
      dispatch({type:'SET_REDIRECT', payload: null})
      window.location.reload()
      
      console.log('execute redirect')
    }
  }, [fingerPrintHash, stateRedirect]);

  const openModal = () => {
    reduxDispatch(profileEditMoadalAction.openModal("signupSubmitModal"));
  };
  const modalState = useSelector(
    (state) => state.profileEditModal["signupSubmitModal"]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupClientSchema),
    defaultValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      TOSAgreement: false,
    },
  });

  const handleCountdownFinish = () => {
    dispatch({ type: "VERIFICATION_CODE_EXPIRED", payload: true });
    dispatch({ type: "SET_EXPIRE_DATE", payload: null });

    console.log("Countdown finished!", state.verificationcodeExpired);
  };

  const editPhoneNumberHandler = () => {
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_SUCCESS", payload: "" });
    dispatch({ type: "PREV_STEP" });

  };

  const onModalConfirm = async () => {
    // this function must triger from confirm button inside our modal
    // this is send api and create user
    const codeSend = await sendVerificationCode();
    if (codeSend === true) {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const onSubmit = async (value) => {
    // console.log(value)
    // open modal
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_SUCCESS", payload: "" });
    startTransition(async () => {
      if (modalState) {
        dispatch({ type: "SET_FORM_VALUE", payload: value });
        await onModalConfirm();
        // Submit the form
      } else {
        dispatch({ type: "SET_FORM_VALUE", payload: value });
        openModal();
      }
    });
  };

  const classOfInput = `border-2 rounded-full my-auto drop-shadow-lg text-gray-800
  focus:outline-none  focus:ring-1 
  focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-white`;

  const okInputClass = `border-black focus:border-primary focus:ring-primaryLight ${classOfInput}`;
  const errorInputClass = `${classOfInput} border-red-500  focus:border-red-500 focus:ring-red-500`;

  const setExpireTime = (inputTime) => {
    const inputDate = new Date(inputTime);
    console.log(inputDate);
    const nowDate = new Date(Date.now());
    console.log(nowDate);

    const currentDate = inputDate < nowDate;

    if (!currentDate) {
      const diffInSeconds = Math.floor(
        (inputDate.getTime() - nowDate.getTime()) / 1000
      );
      console.log(diffInSeconds);
      dispatch({ type: "SET_EXPIRE_DATE", payload: diffInSeconds });
    }
  };

  const sendVerificationCode = async () => {
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_SUCCESS", payload: "" });
    try {
      const result = await fetch("/api/verification-signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: state.formValue.phoneNumber,
          identifier: state.userFingerPrintHash,
          ipAddress: state.userIP,
          email:state.formValue.email,
          userName: state.formValue.userName
        }),
      });
      if (result.ok) {
        const response = await result.json();
        console.log(response);
        if (response.success) {
          dispatch({ type: "SET_SUCCESS", payload: response.success });
          setExpireTime(response.expireDate);
          dispatch({ type: "VERIFICATION_CODE_EXPIRED", payload: false });
          return true;
        } else if (response.error) {
          dispatch({ type: "SET_ERROR", payload: response.error });
          if (response.redirect) {
            router.push({
              pathname: `/${response.redirect}`,
            });
          }
        }
      } else {
        dispatch({
          type: "SET_ERROR",
          payload:
            "مشکلی در ارتباط با سرور وجود دارد لطفا در زمانی دیگر تلاش کنید",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error });
    }
  };

  const resendCode = async (event) => {
    event.preventDefault();
    dispatch({ type: "SET_ERROR", payload: '' });
    dispatch({ type: "SET_SUCCESS", payload: '' });

    startTransition(async()=> {
      await sendVerificationCode();
    })
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_SUCCESS", payload: "" });
    startTransition(async () => {
      try {
        const result = await fetch("/api/verify-code", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: state.formValue.phoneNumber,
            identifier: state.userFingerPrintHash,
            code: state.verificationCode,
          }),
        });
        if (result.ok) {
          const response = await result.json();

          if (response.success) {
            console.log(response);
            dispatch({ type: "SET_SUCCESS", payload: response.success });
            await createAccount(state.formValue);
          } else if (response.error) {
            dispatch({ type: "SET_ERROR", payload: response.error });
            console.log(response);
            if (response.redirect) {
              dispatch({
                type: "SET_REDIRECT",
                payload: `/${response.redirect}`,
              });
              setRedirect('/signup')
            }
          }
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "مشکلی در ارتباط با سرور وجود دارد",
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: "SET_ERROR",
          payload: "مشکلی در ارتباط با سرور وجود داد",
        });
      }
    });
  };

  const createAccount = async (value) => {
    const result = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...value,
        identifier: state.userFingerPrintHash,
      }),
    });
    if (result.ok) {
      const response = await result.json();
      if (response.success) {
        dispatch({ type: "SET_SUCCESS", payload: response.success });
        if (response.redirect) {
          router.push(`/${response.redirect}`);
          // redirect(`/${response.redirect}`)
        }
      } else if (response.error) {
        dispatch({ type: "SET_ERROR", payload: response.error });
        if (response.redirect) {
          router.push(`/${response.redirect}`);
          // redirect(`/${response.redirect}`)

        }
      }
    }
  };


  return (
    <>
      {state.step === 1 && (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm ">
          <div className="flex flex-row justify-center items-center  ">
            <div className="flex flex-col w-[10rem] gap-1 mb-1 md:w-1/2 pl-1  ">
              <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                نام کاربری:
              </label>
              <input
                disabled={isPending}
                type="text"
                {...register("userName")}
                className={errors.userName ? errorInputClass : okInputClass}
              />
              {errors.userName?.message && (
                <p className="text-red-500 text-xs ">{errors.userName?.message}</p>
              )}
            </div>
            <div className="flex flex-col w-[10rem] gap-1 mb-1 md:w-1/2 pl-1">
              <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                ایمیل:
              </label>
              <input
                disabled={isPending}
                type="text"
                {...register("email")}
                className={errors.email ? errorInputClass : okInputClass}
              />
              {errors.userName?.message && (
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col  w-[10rem] -mx-16 ssm:-mx-14 xmd:-mx-7 2xmd:-mx-2 md:mx-0 gap-1 mb-1 md:w-1/2 pl-1">
            <label className="block mr-2 text-[#414141] font-medium dark:text-white">
              شماره موبایل:
            </label>
            <input
              disabled={isPending}
              type="tel"
              {...register("phoneNumber")}
              className={errors.phoneNumber ? errorInputClass : okInputClass}
            />
            {errors.phoneNumber?.message && (
              <p className="text-red-500 text-xs">{errors.phoneNumber?.message}</p>
            )}
          </div>

          <div className="flex flex-row justify-center items-center ">
            <div className="flex flex-col w-[10rem] gap-1 mb-1 md:w-1/2 pl-1">
              <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                رمز عبور:
              </label>
              <input
                disabled={isPending}
                type="password"
                {...register("password")}
                className={errors.password ? errorInputClass : okInputClass}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs">{errors.password?.message}</p>
              )}
            </div>
            <div className="flex flex-col w-[10rem] gap-1 mb-1 md:w-1/2 pl-1">
              <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                تکرار رمز عبور:
              </label>
              <input
                disabled={isPending}
                type="password"
                {...register("confirmPassword")}
                className={
                  errors.confirmPassword ? errorInputClass : okInputClass
                }
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col -mx-10 md:mx-0 gap-2 mt-2 ">
            <span className="mr-3 text-primary font-medium hover:text-primaryDark transition-all">
              <Link href="/login">قبلا ثبت نام کرده اید؟ ورود</Link>
            </span>
            <div className=" w-[16.5rem] " >
              <div class="inline-flex items-center">
                <label
                  class="relative flex items-center rounded-full cursor-pointer"
                  htmlFor="link"
                >
                  <input
                    type="checkbox"
                    disabled={isPending}
                    {...register("TOSAgreement")}
                    class="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-5 before:w-5 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10 "
                    id="link"
                  />
                  <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>

              <span
                className={
                  errors.TOSAgreement ? "text-xs text-red-500" : "text-sm "
                }
              >
                {" "}
                تمامی
                <span>
                  <Link href="/"> قوانین و مقررات </Link>
                </span>{" "}
                و{" "}
                <span>
                  <Link href="/login"> شرایط و ضوابط استفاده</Link>
                </span>{" "}
                و{" "}
                <Link href="/">
                  <span> قوانین حریم خصوصی </span>
                </Link>
                را مطالعه کردم و با آن موافقت میکنم{" "}
              </span>
              {errors.TOSAgreement?.message && (
                <p className="text-red-500 text-xs">
                  {errors.TOSAgreement?.message}
                </p>
              )}
            </div>
            <ErrorForm message={state.error} />
            <SuccessForm message={state.success} />
            <Button
              type="submit"
              isDisabled={isPending}
              isLoading={isPending}
              className="bg-primary rounded-full h-10 text-white font-bold text-xl drop-shadow-lg hover:bg-primaryDark transition-all duration-200"
            >
              ثبت نام
            </Button>
          </div>
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
          <ConfirmFormModal
            modalID="signupSubmitModal"
            phoneNumber={
              state.formValue.phoneNumber ? state.formValue.phoneNumber : ""
            }
            onSubmit={handleSubmit(onSubmit)}
          />
        </form>
      )}
      {state.step === 2 && (
        <form className="xl:max-w-sm ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-semi xl:font-bold text-lg xl:text-2xl w-11/12">
                شماره خود را <span className="text-primary">تایید</span> کنید
              </span>
              <p className="" > 
                پیامکی حاوی کد تایید به شماره موبایل وارد شده ارسال گردید ، جهت
                تایید کد را در کادر زیر وارد کنید
              </p>
            </div>
            <Input
              isClearable
              radius="full"
              type="text"
              variant="bordered"
              placeholder="کد تایید را وارد کنید"
              value={state.verificationCode}
              onChange={(event) =>
                dispatch({
                  type: "SET_VERIFICATION_CODE",
                  payload: event.target.value,
                })
              }
              onClear={() => {
                dispatch({ type: "SET_VERIFICATION_CODE", payload: "" });
              }}
              className="max-w-xs"
            />

            {!state.verificationcodeExpired && (
              <div className="flex gap-2">
                <span>زمان باقی مانده:</span>
                <CountDown
                  onFinish={handleCountdownFinish}
                  timeInSeconds={state.expireDate}
                />
              </div>
            )}
            {state.verificationcodeExpired && (
              <div className="flex gap-1">
                <span>ایا کد را دریافت نکردید؟</span>
                <button onClick={resendCode} className="text-primary">
                  ارسال مجدد
                </button>
                <span>و یا</span>
                <button
                  className="text-primary"
                  onClick={editPhoneNumberHandler}
                >
                  تغییر شماره
                </button>
              </div>
            )}

            <button
              color="primary"
              radius="full"
              onClick={editPhoneNumberHandler}
            >
              تغییر شماره موبایل
            </button>
            <ErrorForm message={state.error} />
            <SuccessForm message={state.success} />
            <Button
              isDisabled={isPending}
              isLoading={isPending}
              onClick={verifyCode}
              className="bg-primary rounded-full h-10 text-white font-bold text-xl drop-shadow-lg hover:bg-primaryDark transition-all duration-200"
            >
              تایید شماره موبایل
            </Button>
          </div>
        </form>
       )} 
    </>
  );
};

export default SignupForm;
