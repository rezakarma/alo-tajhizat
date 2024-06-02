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
import { editLandlineNumber } from "@/schema/index";
import { uiActions } from "@/store/ui-slice";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { changeProfile } from '@/store/profile-actions'
import { useSession } from "next-auth/react"

const initialState = {
  currentLandlineNumber: "",
  newLandlineNumber: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_LANDLINE_NUMBER":
      return { ...state, newLandlineNumber: action.payload };
    case "SET_CURRENT_LANDLINE_NUMBER":
      return { ...state, currentLandlineNumber: action.payload };
    default:
      return state;
  }
};

const LandlineNumberEditModal = (props) => {
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
      dispatch({ type: "SET_CURRENT_LANDLINE_NUMBER", payload: user.profile.landlineNumber });
      setValue("id", user.profile.id);
      if (isFirstRender.current) {
      setValue("landlineNumber", user.profile.landlineNumber);

        dispatch({ type: "SET_NEW_LANDLINE_NUMBER", payload: user.profile.landlineNumber });
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
    resolver: zodResolver(editLandlineNumber),
    defaultValues: {
      landlineNumber: '',
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

    if(state.newLandlineNumber === state.currentLandlineNumber) {
      reduxDispatch(
        uiActions.showNotification({
          status: "error",
          message: 'شماره تلفن فعلی با شماره تلفن جدید یکی است',
        })
      );
      return
    }
    reduxDispatch(changeProfile(value.id,{landlineNumber:value.landlineNumber})).then(() => {
      update();
    })
  };

  return (
    <ProfileEditorModal modalID={props.modalID}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">
            تلفن ثابت خود را
            <span className="text-primary">وارد</span> کنید
          </span>
        </div>
        <Input
          isClearable
          type="text"
          label="شمره تلفن ثابت"
          variant="bordered"
          placeholder="شماره تلفن ثابت خود را وارد کنید"
          value={state.newLandlineNumber}
          {...register("landlineNumber")}
          isInvalid={errors.landlineNumber ? true : false}
          onChange={(event) =>
            dispatch({ type: "SET_NEW_LANDLINE_NUMBER", payload: event.target.value })
          }
          onClear={() => {
            dispatch({ type: "SET_NEW_LANDLINE_NUMBER", payload: "" });
          }}
          className="max-w-xs"
          errorMessage={errors.landlineNumber?.message && errors.landlineNumber?.message}
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
          تغییر شماره تلفن ثابت
        </Button>
      </form>
    </ProfileEditorModal>
  );
};

export default LandlineNumberEditModal;
