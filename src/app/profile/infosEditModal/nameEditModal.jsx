"use client";

import ProfileEditorModal from "@/components/modal/profileEditModal";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileEditMoadalAction } from "../../../store/profileEditModal-slice";
import NotoficationUi from "../../../components/formValidateMessages/notification-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useTransition } from "react";
import { editIdentity } from "@/schema/index";
import { uiActions } from "@/store/ui-slice";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { changeProfile } from "@/store/profile-actions";
import { useSession } from "next-auth/react";
const initialState = {
  currentFirstName: "",
  newFirstName: "",
  currentLastName: "",
  newLastName: "",
  currentFatherName: "",
  newFatherName: "",
  newNationalCode: "",
  currentNationalCode: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_FIRST_NAME":
      return { ...state, currentFirstName: action.payload };
    case "SET_NEW_FIRST_NAME":
      return { ...state, newFirstName: action.payload };
    case "SET_CURRENT_LAST_NAME":
      return { ...state, currentLastName: action.payload };
    case "SET_CURRENT_LAST_NAME":
      return { ...state, currentLastName: action.payload };
    case "SET_NEW_LAST_NAME":
      return { ...state, newLastName: action.payload };
    case "SET_CURRENT_FATHER_NAME":
      return { ...state, currentFatherName: action.payload };
    case "SET_NEW_FATHER_NAME":
      return { ...state, newFatherName: action.payload };
    case "SET_CURRENT_NATIONAL_CODE":
      return { ...state, currentNationalCode: action.payload };
    case "SET_NEW_NATIONAL_CODE":
      return { ...state, newNationalCode: action.payload };
    default:
      return state;
  }
};

const NameEditModal = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { update } = useSession();
  const isFirstRender = useRef(true);

  const user = useCurrentUser();
  const notification = useSelector((state) => state.ui.notification);

  const reduxDispatch = useDispatch();

  useEffect(() => {}, [reduxDispatch]);

  useEffect(() => {
    // handleCurrentPhoneNumber();
    if (user) {
      dispatch({
        type: "SET_CURRENT_FIRST_NAME",
        payload: user.profile.firstName,
      });
      dispatch({
        type: "SET_CURRENT_LAST_NAME",
        payload: user.profile.lastName,
      });
      dispatch({
        type: "SET_CURRENT_FATHER_NAME",
        payload: user.profile.fatherName,
      });
      dispatch({
        type: "SET_CURRENT_NATIONAL_CODE",
        payload: user.profile.nationalCode,
      });
      setValue("id", user.profile.id);

      if (isFirstRender.current) {
        dispatch({
          type: "SET_NEW_FIRST_NAME",
          payload: user.profile.firstName,
        });
        dispatch({ type: "SET_NEW_LAST_NAME", payload: user.profile.lastName });
        dispatch({
          type: "SET_NEW_FATHER_NAME",
          payload: user.profile.fatherName,
        });
        dispatch({
          type: "SET_NEW_NATIONAL_CODE",
          payload: user.profile.nationalCode,
        });
        setValue("nationalCode", user.profile.nationalCode);
        setValue("firstName", user.profile.firstName);
        setValue("lastName", user.profile.lastName);
        setValue("fatherName", user.profile.fatherName);
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
    resolver: zodResolver(editIdentity),
    defaultValues: {
      nationalCode: "",
      firstName: "",
      lastName: "",
      fatherName: "",
      id: "",
    },
  });

  const changeCheck = () => {


    if (
      state.newFatherName === state.currentFatherName &&
      state.newFirstName === state.currentFirstName &&
      state.newLastName === state.currentLastName &&
      state.newNationalCode === state.currentNationalCode
    ) {
      return true
    } else {
      return false;
    }
  }

  const onSubmit = async (value) => {
    reduxDispatch(
      uiActions.showNotification({
        status: null,
        message: null,
      })
    );

    const valurChanged = changeCheck()


    if(changeCheck()) {
      reduxDispatch(
        uiActions.showNotification({
          status: "error",
          message: 'مشخصات فعلی با مشخصات جدید یکی است',
        })
      );
      return
    }


    console.log(value);

    reduxDispatch(changeProfile(value.id,{names:{
      nationalCode: value.nationalCode,
      firstName: value.firstName,
      lastName: value.lastName,
      fatherName: value.fatherName,
    }})).then(() => {
      update();
    })
  };

  return (
    <ProfileEditorModal modalID={props.modalID}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">
            مشخصات خود را
            <span className="text-primary">وارد</span> کنید
          </span>
        </div>
        <Input
          isClearable
          type="text"
          label="نام"
          variant="bordered"
          placeholder="نام خود را وارد کنید"
          value={state.newFirstName}
          {...register("firstName")}
          isInvalid={errors.firstName ? true : false}
          errorMessage={errors.firstName?.message && errors.firstName?.message}
          onChange={(event) =>
            dispatch({
              type: "SET_NEW_FIRST_NAME",
              payload: event.target.value,
            })
          }
          onClear={() => {
            dispatch({ type: "SET_NEW_FIRST_NAME", payload: "" });
          }}
          className="max-w-xs"
          isDisabled={
            notification && notification.status === "pending" ? true : false
          }
        />
        <Input
          isClearable
          type="text"
          label="نام خانوادگی"
          variant="bordered"
          placeholder="  نام خانوادگی خود را وارد کنید"
          value={state.newLastName}
          {...register("lastName")}
          isInvalid={errors.lastName ? true : false}
          onChange={(event) =>
            dispatch({ type: "SET_NEW_LAST_NAME", payload: event.target.value })
          }
          onClear={() => {
            dispatch({ type: "SET_NEW_LAST_NAME", payload: "" });
          }}
          className="max-w-xs"
          errorMessage={errors.lastName?.message && errors.lastName?.message}
          isDisabled={
            notification && notification.status === "pending" ? true : false
          }
        />
        <Input
          isClearable
          type="text"
          label="نام پدر"
          variant="bordered"
          placeholder="نام پدر خود را وارد کنید"
          value={state.newFatherName}
          {...register("fatherName")}
          isInvalid={errors.fatherName ? true : false}
          errorMessage={
            errors.fatherName?.message && errors.fatherName?.message
          }
          onChange={(event) =>
            dispatch({
              type: "SET_NEW_FATHER_NAME",
              payload: event.target.value,
            })
          }
          onClear={() => {
            dispatch({ type: "SET_NEW_FATHER_NAME", payload: "" });
          }}
          className="max-w-xs"
          isDisabled={
            notification && notification.status === "pending" ? true : false
          }
        />
        <Input
          isClearable
          type="text"
          label="کد ملی"
          variant="bordered"
          placeholder="کد ملی خود را وارد کنید"
          value={state.newNationalCode}
          {...register("nationalCode")}
          isInvalid={errors.nationalCode ? true : false}
          errorMessage={
            errors.nationalCode?.message && errors.nationalCode?.message
          }
          onChange={(event) =>
            dispatch({
              type: "SET_NEW_NATIONAL_CODE",
              payload: event.target.value,
            })
          }
          onClear={() => {
            dispatch({ type: "SET_NEW_NATIONAL_CODE", payload: "" });
          }}
          className="max-w-xs"
          isDisabled={
            notification && notification.status === "pending" ? true : false
          }
        />

        {notification && <NotoficationUi notification={notification} />}
        <Button
          color="primary"
          radius="full"
          type="submit"
          isLoading={
            notification && notification.status === "pending" ? true : false
          }
        >
          تغییر نام
        </Button>
      </form>
    </ProfileEditorModal>
  );
};

export default NameEditModal;
