"use client"

import ProfileEditorModal from "@/components/modal/profileEditModal";
import React, { startTransition, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import validator from "validator";
import { profileEditMoadalAction } from '../../../../store/profileEditModal-slice'
import CountDown from "@/components/utils/countDown";
import NotoficationUi from "@/components/formValidateMessages/notification-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useTransition } from "react";
import { editPhoneNumber } from "@/schema/index";
import { uiActions } from "@/store/ui-slice";
import useCurrentUser from "@/hooks/useCurrentUser";
import { changePhoneNumber } from '@/store/profile-actions'
import { useSession } from "next-auth/react"
const initialState = {
  step: 1,
  newPhoneNumber: "",
  currentPhoneNumber: "",
  verificationCode: "",
  formValue: "",
  verificationcodeExpired: false,
  expireDate: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
      case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "NEW_PHONE_NUMBER":
      return { ...state, newPhoneNumber: action.payload };
    case "CURRENT_PHONE_NUMBER":
      return { ...state, currentPhoneNumber: action.payload };
    case "UPDATE_VERIFICATION_CODE":
      return { ...state, verificationCode: action.payload };
    case 'VERIFICATION_CODE_EXPIRED':
      return { ...state, verificationcodeExpired: action.payload };
      case 'SET_FORM_VALUE':
      return { ...state, formValue: action.payload };
      case "SET_EXPIRE_DATE":
      return { ...state, expireDate: action.payload };
    default:
      return state;
  }
};


const InfosEditPhoneNumber = (props) => {
  const infos = {
    phoneNumber: "09120000000",
    verificationCode: "12345",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const reduxDispatch = useDispatch()




  const { update } = useSession()
  const isFirstRender = useRef(true);

  const user = useCurrentUser();
  const notification = useSelector((state) => state.ui.notification);


  useEffect(() => {

  }, [reduxDispatch]);

  useEffect(() => {
    // handleCurrentPhoneNumber();
    if (user) {
      dispatch({ type: "CURRENT_PHONE_NUMBER", payload : user.phoneNumber });

      setValue("id", user.id);
      if (isFirstRender.current) {
        dispatch({ type: "NEW_PHONE_NUMBER", payload : user.phoneNumber });
        isFirstRender.current = false; // Update the ref value after the first render
      }
    }
  }, [user]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPhoneNumber),
    defaultValues: {
      phoneNumber: '',
      id: "",
    },
  });




  const handleNextStep = () => {
    dispatch({ type: "SET_LOADING", payload: true});
    if (
      state.newPhoneNumber !== infos.phoneNumber &&
      state.newPhoneNumber !== ""
    ) {
      // if(isMobilePhone(str [, locale [, options]]))
      const test = validator.isMobilePhone(state.newPhoneNumber,["fa-IR"]);
      console.log(test);
      dispatch({ type: "NEXT_STEP" });
      dispatch({ type: "VERIFICATION_CODE_EXPIRED" , payload: false})
      console.log("number is calidate its not the same number");
    } else {
      console.log("it was same number change it");
    }
    dispatch({ type: "SET_LOADING", payload: false});
    
  };

  const verifyCode = (e) => {
    e.preventDefault()
    // reduxDispatch(changePhoneNumber(user.id, state.formValue.phoneNumber,state.verificationCode, props.modalID)).then(() => {
    //   update();
    // })

    reduxDispatch(
      uiActions.showNotification({
        status: 'pending',
        message: 'pending',
      })
    )
    startTransition(async () => {
      try {
        const result = await fetch("/api/verify-code-change", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: state.formValue.phoneNumber,
            userId: user.id,
            code: state.verificationCode,
          }),
        });
        if (result.ok) {
          const response = await result.json();

          if (response.success) {
            await update()
            reduxDispatch(
              uiActions.showNotification({
                status: 'success',
                message: response.success,
              })
            )
            // reduxDispatch(profileEditMoadalAction.closeModal(props.modalID))
            dispatch({ type: "PREV_STEP" });
            handleCountdownFinish()
           
          } else if (response.error) {
            reduxDispatch(
              uiActions.showNotification({
                status: 'error',
                message: response.error,
              })
            )
            
          }
        } else {
          reduxDispatch(
            uiActions.showNotification({
              status: 'error',
              message: "مشکلی در ارتباط با سرور وجود دارد",
            })
          )
        }
      } catch (error) {
        console.log(error);
        reduxDispatch(
          uiActions.showNotification({
            status: 'error',
            message: "مشکلی در ارتباط با سرور وجود دارد",
          })
        )
      }
    });
    
  }



  const handleCountdownFinish = () => {
    dispatch({ type:'VERIFICATION_CODE_EXPIRED', payload: true})
    dispatch({ type: "SET_EXPIRE_DATE", payload: null });

    console.log('Countdown finished!',state.verificationcodeExpired);
  };

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

  const  editPhoneNumberHandler = () => {
    reduxDispatch(
      uiActions.showNotification({
        status: null,
        message: null,
      })
    );
    dispatch({ type: "PREV_STEP" });
  }

  const sendVerificationCode = async (value) => {
    reduxDispatch(
      uiActions.showNotification({
        status: 'pending',
        message: 'pending',
      })
    );
    try {
      const result = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: value.phoneNumber,
          id: value.id
        }),
      });
      if (result.ok) {
        const response = await result.json();
        console.log(response);
        if (response.success) {
          reduxDispatch(
            uiActions.showNotification({
              status: "success",
              message: response.success,
            })
          );
          setExpireTime(response.expireDate);
          dispatch({ type: "VERIFICATION_CODE_EXPIRED", payload: false });
          return true;
        } else if (response.error) {
          reduxDispatch(
            uiActions.showNotification({
              status: 'error',
              message: response.error,
            })
          );
        }
      } else {
        reduxDispatch(
          uiActions.showNotification({
            status: 'error',
            message: "مشکلی در ارتباط با سرور وجود دارد لطفا در زمانی دیگر تلاش کنید",
          })
        );
      }
    } catch (error) {
      reduxDispatch(
        uiActions.showNotification({
          status: 'error',
          message: "خطایی رخ داده است ، لطفا در زمانی دیگر تلاش کنید",
        })
      );
    }
  };

  const resendCode = async (event) => {
    event.preventDefault();
    reduxDispatch(
      uiActions.showNotification({
        status: null,
        message: null,
      })
    );

    startTransition(async()=> {
      await sendVerificationCode();
    })
  };


  const onSubmit = async (value) => {
    if(value.phoneNumber === state.currentPhoneNumber) {
      reduxDispatch(
        uiActions.showNotification({
          status: 'error',
          message: 'شماره فعلی با شماره جدید یکی است',

        })
      );
      return
    }
    dispatch({type:"SET_FORM_VALUE", payload: value})
    reduxDispatch(
      uiActions.showNotification({
        status: null,
        message: null,
      })
    );

    const codeSend = await sendVerificationCode(value);
    if (codeSend === true) {
      dispatch({ type: "NEXT_STEP" });
    }

    console.log(value)
  }


  return (
    <ProfileEditorModal modalID={props.modalID} >
      {state.step === 1 && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
           <div className="flex flex-col gap-2">
        <span className="font-bold text-2xl">شماره جدید خود را <span className="text-primary">وارد</span> کنید</span>
        </div>
          <Input
            isClearable
            {...register("phoneNumber")}
          isInvalid={errors.email ? true : false}
          errorMessage={errors.phoneNumber?.message && errors.phoneNumber?.message}
            type="tel"
            label="شماره موبایل"
            variant="bordered"
            placeholder="شماره موبایل خود را وارد کنید"
   
            value={state.newPhoneNumber}
            onChange={(event) =>
              dispatch({ type: "NEW_PHONE_NUMBER", payload: event.target.value })
            }
            onClear={() => {dispatch({ type:'NEW_PHONE_NUMBER', payload:''}); console.log(state.newPhoneNumber)}}
            className="max-w-xs"
          />
          {notification && 
          <NotoficationUi notification={notification}/> 
          }
          <Button color="primary" radius="full"           isLoading={notification && notification.status === "pending" ? true: false}
 type="submit">ارسال کد تایید</Button>
        </form>
      )}
      {state.step === 2 && <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
        <span className="font-bold text-2xl">شماره خود را <span className="text-primary">تایید</span> کنید</span>
        <p>پیامکی حاوی کد تایید به شماره موبایل وارد شده ارسال گردید ، جهت تایید کد را در کادر زیر وارد کنید</p>
        </div>
      <Input
            isClearable
            type="text"
            label="کد تایید"
            variant="bordered"
            placeholder="کد تایید را وارد کنید"
            value={state.verificationCode}
            onChange={(event) =>
              dispatch({ type: "UPDATE_VERIFICATION_CODE", payload:event.target.value })
            }
            onClear={() => {dispatch({ type:'UPDATE_VERIFICATION_CODE', payload:''}); console.log(state.newPhoneNumber)}}
            className="max-w-xs"
          />

          {!state.verificationcodeExpired && <div className="flex gap-2">
          <span>زمان باقی مانده:</span>
          <CountDown onFinish={handleCountdownFinish} timeInSeconds={state.expireDate}/>
          <button
              color="primary"
              radius="full"
              onClick={editPhoneNumberHandler}
            >
              تغییر شماره موبایل
            </button>
          </div>}
          {state.verificationcodeExpired && <div className="flex gap-1">
            <span>ایا کد را دریافت نکردید؟</span>
            <button className="text-primary" onClick={resendCode}>ارسال مجدد</button>
            <span>و یا</span>
            <button className="text-primary" onClick={editPhoneNumberHandler}>تغییر شماره</button>
            </div>}
            {notification && 
          <NotoficationUi notification={notification}/> 
          }
           <Button color="primary" radius="full" isLoading={notification && notification.status === "pending" ? true: false} onClick={verifyCode}>تغییر شماره موبایل</Button>
        </div>}

    </ProfileEditorModal>
  );
};

export default InfosEditPhoneNumber;
