"use client";

import ProfileEditorModal from "@/components/modal/profileEditModal";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { profileEditMoadalAction } from "../../../store/profileEditModal-slice";
import { useEffect, useReducer } from "react";
import NotoficationUi from "../../../components/formValidateMessages/notification-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useTransition } from "react";
import { editEmail } from "@/schema/index";
import { uiActions } from "@/store/ui-slice";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { changeEmail } from '@/store/profile-actions'
import { useSession } from "next-auth/react"

const initialState = {
  currentEmail: "",
  newEmail: "",
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_EMAIL":
      return { ...state, newEmail: action.payload };
    case "SET_CURRENT_EMAIL":
      return { ...state, currentEmail: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const EmailEditModal = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { update } = useSession()
  const isFirstRender = useRef(true);

  const user = useCurrentUser();
  const notification = useSelector((state) => state.ui.notification);

  const reduxDispatch = useDispatch();

  useEffect(() => {

  }, [reduxDispatch]);

  useEffect(() => {
    // handleCurrentPhoneNumber();
    if (user) {
      dispatch({ type: "SET_CURRENT_EMAIL", payload: user.email });
      setValue("id", user.id);
      if (isFirstRender.current) {
        dispatch({ type: "SET_NEW_EMAIL", payload: user.email });
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
    resolver: zodResolver(editEmail),
    defaultValues: {
      email: '',
      id: "",
    },
  });

  const onSubmit = async (value) => {
    // dispatch({ type: "SET_LOADING", payload: true });
    // if(state.newEmail !== state.currentEmail) {
    //   console.log("email updated");
    // }else {
    //   console.log("email is smae and not updated");

    // }
    // reduxDispatch(profileEditMoadalAction.closeModal(props.modalID))

    // dispatch({ type: "SET_LOADING", payload: false });
    console.log(value);

    reduxDispatch(
      uiActions.showNotification({
        status: null,
        message: null,
      })
    );

    if(state.newEmail === state.currentEmail) {
      reduxDispatch(
        uiActions.showNotification({
          status: "error",
          message: 'ایمیل فعلی با ایمیل جدید یکی است',
        })
      );
      return
    }
    reduxDispatch(changeEmail(value.id, value.email)).then(() => {
      update();
    })
  };

  return (
    <ProfileEditorModal modalID={props.modalID}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">
            ایمیل خود را
            <span className="text-primary">وارد</span> کنید
          </span>
        </div>
        <Input
          isClearable
          type="text"
          label="ایمیل"
          variant="bordered"
          placeholder="ایمیل خود را وارد کنید"
          value={state.newEmail}
          {...register("email")}
          isInvalid={errors.email ? true : false}
          onChange={(event) =>
            dispatch({ type: "SET_NEW_EMAIL", payload: event.target.value })
          }
          onClear={() => {
            dispatch({ type: "SET_NEW_EMAIL", payload: "" });
          }}
          className="max-w-xs"
          errorMessage={errors.email?.message && errors.email?.message}
        />
        {notification && 
          <NotoficationUi notification={notification}/> 
          }
        <Button
          color="primary"
          radius="full"
          isLoading={notification && notification.status === "pending" ? true: false}
          type="submit"
        >
          تغییر ایمیل
        </Button>
      </form>
    </ProfileEditorModal>
  );
};

export default EmailEditModal;
