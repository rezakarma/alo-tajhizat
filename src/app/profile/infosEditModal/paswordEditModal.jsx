"use client";

import ProfileEditorModal from "@/components/modal/profileEditModal";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { profileEditMoadalAction } from "../../../store/profileEditModal-slice";
import { useEffect, useReducer } from "react";
import EyeSlashFilledIconSvg from "../../../../public/assets/inputSvgs/EyeSlashFilledIconSvg";
import EyeFilledIconSvg from "../../../../public/assets/inputSvgs/EyeFilledIconSvg";
import { changeUserPassword} from '@/store/profile-actions'
import NotoficationUi from "../../../components/formValidateMessages/notification-ui"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editPassword } from "@/schema/index"
import { uiActions } from "@/store/ui-slice";
import useCurrentUser from '@/hooks/useCurrentUser'
const initialState = {
  currentPassword: "",
  newPassword: "",
  newPasswordVerify: "",
  isVisibleCurrentPass : false,
  isVisibleNewPass : false,
  isVisibleNewPassRepeatation : false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_PASSWORD":
      return { ...state, newPassword: action.payload };
      case "SET_NEW_PASSWORD_VERIFY":
        return { ...state, newPasswordVerify: action.payload };
    case "SET_CURRENT_PASSWORD":
      return { ...state, currentPassword: action.payload };
      case "SET_CURRENT_PASSWORD_VISIBLE":
        return { ...state, isVisibleCurrentPass:!state.isVisibleCurrentPass };
        case "SET_NEW_PASSWORD_VISIBLE":
            return { ...state, isVisibleNewPass: !state.isVisibleNewPass };
            case "SET_NEW_PASSWORD_VISIBLE_REPEATION":
                return { ...state, isVisibleNewPassRepeatation: !state.isVisibleNewPassRepeatation };
    default:
      return state;
  }
};


const PasswordEditModal = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const reduxDispatch = useDispatch();
  const user = useCurrentUser();
    const notification = useSelector((state) => state.ui.notification);
  
  
    useEffect(() => {
  
    }, [reduxDispatch]);
  
    useEffect(() => {
      // handleCurrentPhoneNumber();
      if (user) {
        setValue("id", user.id);
      }
    }, []);

    const {
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(editPassword),
      defaultValues: {
        id:'',
        currentPassword: '',
        password: '',
        confirmPassword: '',
      },
    });
  
  
    const onSubmit = async (value) => {
      reduxDispatch(
        uiActions.showNotification({
          status: null,
          message: null,
        })
      );
      if (state.newPassword === state.currentPassword) {
        reduxDispatch(
          uiActions.showNotification({
            status: "error",
            message: 'رمزعبور فعلی با رمزعبور جدید یکی است',
          })
        );
        return
      }
      console.log(value)
      reduxDispatch(changeUserPassword(value))
  
    };
  
    return (
      <ProfileEditorModal modalID={props.modalID}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-2xl">
              رمز عبور خود را
              <span className="text-primary">وارد</span> کنید
            </span>
          </div>
          <Input
            isClearable
            label="رمز عبور فعلی"
            {...register('currentPassword')}
            isInvalid={errors.currentPassword ? true : false}
            errorMessage={errors.currentPassword?.message && errors.currentPassword?.message}
            variant="bordered"
            placeholder="رمزعبور فعلی خود را وارد کنید"
            value={state.currentPassword}
            onChange={(event) =>
              dispatch({ type: "SET_CURRENT_PASSWORD", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_CURRENT_PASSWORD", payload: "" });
            }}
            startContent={
              <button className="focus:outline-none" type="button" onClick={() => dispatch({ type: "SET_CURRENT_PASSWORD_VISIBLE"})}>
                {state.isVisibleCurrentPass ? (
                  <EyeSlashFilledIconSvg className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIconSvg className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            
            className="max-w-xs"
            classNames={{
                innerWrapper:'flex flex-row-reverse justify-end ',
                clearButton: 'static	'
            }}
              type={state.isVisibleCurrentPass ? "text" : "password"}
          />
          <Input
            isClearable
            label="رمز عبور جدید"
            variant="bordered"
            {...register('password')}
            isInvalid={errors.password ? true : false}
            errorMessage={errors.password?.message && errors.password?.message}
            placeholder="رمزعبور جدید خود را وارد کنید"
            value={state.newPassword}
            onChange={(event) =>
              dispatch({ type: "SET_NEW_PASSWORD", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_NEW_PASSWORD", payload: "" });
            }}
            
            startContent={
                <button className="focus:outline-none" type="button" onClick={() => dispatch({ type: "SET_NEW_PASSWORD_VISIBLE"})}>
                  {state.isVisibleNewPass ? (
                    <EyeSlashFilledIconSvg className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIconSvg className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              
              className="max-w-xs"
              classNames={{
                  innerWrapper:'flex flex-row-reverse justify-end ',
                  clearButton: 'static	'
              }}
                type={state.isVisibleNewPass ? "text" : "password"}
          />
          <Input
            isClearable
            label="تکرار رمز عبور جدید"
            variant="bordered"
            {...register('confirmPassword')}
            isInvalid={errors.confirmPassword ? true : false}
            errorMessage={errors.confirmPassword?.message && errors.confirmPassword?.message}
            placeholder="رمزعبور جدید خود را دوباره وارد کنید"
            value={state.newPasswordVerify}
            onChange={(event) =>
              dispatch({ type: "SET_NEW_PASSWORD_VERIFY", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_NEW_PASSWORD_VERIFY", payload: "" });
            }}
            startContent={
                <button className="focus:outline-none" type="button" onClick={() => dispatch({ type: "SET_NEW_PASSWORD_VISIBLE_REPEATION"})}>
                  {state.isVisibleNewPassRepeatation ? (
                    <EyeSlashFilledIconSvg className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIconSvg className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              
              className="max-w-xs"
              classNames={{
                  innerWrapper:'flex flex-row-reverse justify-end ',
                  clearButton: 'static	'
              }}
                type={state.isVisibleNewPassRepeatation ? "text" : "password"}
          />
          {notification && 
          <NotoficationUi notification={notification}/> 
          }
          <Button
            color="primary"
            radius="full"
            type="submit"
           isLoading={notification && notification.status === "pending" ? true: false}
          >
            تغییر رمز عبور 
          </Button>
        </form>
      </ProfileEditorModal>
    );
}
 
export default PasswordEditModal;