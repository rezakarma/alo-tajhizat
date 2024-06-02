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
import { editJob } from "@/schema/index";
import { uiActions } from "@/store/ui-slice";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { changeProfile } from '@/store/profile-actions'
import { useSession } from "next-auth/react"
const initialState = {
  currentJob: "",
  newJob: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_JOB":
      return { ...state, newJob: action.payload };
    case "SET_CURRENT_JOB":
      return { ...state, currentJob: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};


const JobEditModal = (props) => {
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
    dispatch({ type: "SET_CURRENT_JOB", payload: user.profile.job });
      setValue("id", user.profile.id);
      if (isFirstRender.current) {
      setValue("job", user.profile.job);

      dispatch({ type: "SET_NEW_JOB", payload: user.profile.job });

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
    resolver: zodResolver(editJob),
    defaultValues: {
      job: '',
      id: "",
    },
  });


  const onSubmit =(value) => {
    reduxDispatch(
      uiActions.showNotification({
        status: null,
        message: null,
      })
    );

    if(state.newJob === state.currentJob) {
      reduxDispatch(
        uiActions.showNotification({
          status: "error",
          message: ' شغل فعلی با شغل قبلی یکی است',
        })
      );
      return
    }
    reduxDispatch(changeProfile(value.id,{job:value.job})).then(() => {
      update();
    })
  };

  return (
    <ProfileEditorModal modalID={props.modalID}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">
            شغل خود را
            <span className="text-primary">وارد</span> کنید
          </span>
        </div>
        <Input
          isClearable
          type="text"
          label="شغل"
          variant="bordered"
          placeholder="شغل خود را وارد کنید"
          value={state.newJob}
          {...register("job")}
          isInvalid={errors.job ? true : false}
          errorMessage={errors.job?.message && errors.job?.message}
          onChange={(event) =>
            dispatch({ type: "SET_NEW_JOB", payload: event.target.value })
          }
          onClear={() => {
            dispatch({ type: "SET_NEW_JOB", payload: "" });
          }}
          className="max-w-xs"
          isDisabled={
            notification && notification.status === "pending" ? true : false
          }
        />
        {notification && 
          <NotoficationUi notification={notification}/> 
          }
        <Button
          color="primary"
          radius="full"
          isLoading={
            notification && notification.status === "pending" ? true : false
          }
          type="submit"
        >
          تغییر شغل
        </Button>
      </form>
    </ProfileEditorModal>
  );
};

export default JobEditModal;
