"use client"


import ProfileEditorModal from "@/components/modal/profileEditModal";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { profileEditMoadalAction } from '../../../store/profileEditModal-slice'
import { useEffect, useReducer } from "react";
import { fetchProfileData, changeUserName } from '@/store/profile-actions'
import NotoficationUi from "../../../components/formValidateMessages/notification-ui"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useTransition } from "react";
import { editUserName } from "@/schema/index"
import { uiActions } from "@/store/ui-slice";

const initialState = {
  currentUsername: '',
  newUsername: "",
  user: '',
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_USERNAME":
      return { ...state, newUsername: action.payload };
      case "SET_CURRENT_USERNAME":
        return { ...state, currentUsername: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
      case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};


const UsernameEditModal = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const user = useSelector((state) => state.profile.profile.profile)
    const notification = useSelector((state) => state.ui.notification);

    const reduxDispatch = useDispatch()
    const isFirstRender = useRef(true); 
    useEffect(() => {
      // handleCurrentPhoneNumber();
      reduxDispatch(fetchProfileData())
      console.log('user:', user)
    }, [reduxDispatch]);

    useEffect(() => {
      if (user) {
      console.log('user:', user)

        dispatch({ type: "SET_CURRENT_USERNAME", payload: user.userName });

        dispatch({ type: "SET_USER", payload: user });
        setValue("id", user.id);
        if (isFirstRender.current) {
          dispatch({ type: "SET_NEW_USERNAME", payload: user.userName });
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
      resolver: zodResolver(editUserName),
      defaultValues: {
        userName: "",
        id: '',
      },
    });
  
    const onSubmit =async (value) => {
      reduxDispatch(
        uiActions.showNotification({
          status: null,
          message: null,
        })
      );
      // dispatch({ type: "SET_LOADING", payload: true });
      // if(state.newUsername !== state.currentUsername) {
      //   console.log("username updated");
      // }else {
      //   console.log("username is smae and not updated");
  
      // }
      // reduxDispatch(profileEditMoadalAction.closeModal(props.modalID))
  
      // dispatch({ type: "SET_LOADING", payload: false });

      console.log(value)
      if(state.newUsername === state.currentUsername) {
        reduxDispatch(
          uiActions.showNotification({
            status: "error",
            message: 'نام کاربری فعلی با نام کاربری جدید یکی است',
          })
        );
        return
      }
      reduxDispatch(changeUserName(value.id, value.userName))

    };
  
    return (
      <ProfileEditorModal modalID={props.modalID}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-2xl">
              نام کاربری  خود را
              <span className="text-primary">وارد</span> کنید
            </span>
          </div>
          <Input
            isClearable
            type="text"
            label="نام کاربری"
            variant="bordered"
            placeholder="نام کاربری خود را وارد کنید"
            value={state.newUsername}
            {...register("userName")}
                    isInvalid={errors.userName? true : false}

                    // className="max-w-xs"
            onChange={(event) =>
              dispatch({ type: "SET_NEW_USERNAME", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_NEW_USERNAME", payload: "" });
            }}
            errorMessage={errors.userName?.message && errors.userName?.message}
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
            تغییر نام کاربری
          </Button>
        </form>
      </ProfileEditorModal>
    );
}
 
export default UsernameEditModal;