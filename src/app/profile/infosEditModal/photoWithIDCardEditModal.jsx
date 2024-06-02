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
import { editProfileImage } from "@/schema/index";
import { uiActions } from "@/store/ui-slice";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { changeProfile } from '@/store/profile-actions'
import { useSession } from "next-auth/react"
import UploadImage from "@/components/profile/uploadImage";
import ImageEditor from "../../../components/ImageEditor/ImageEditor";

const initialState = {
//   currentPhotoWithIDCard: "",
//   newPhotoWithIDCard: "",
  photoWithIdCart: [],
  photoWithIdCartKey: "",
  editorShow: true,
  id: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PHOTO_WITH_ID_CART":
      return { ...state, photoWithIdCart: action.payload };
    case "SET_PHOTO_WITH_ID_CART_KEY":
      return { ...state, photoWithIdCartKey: action.payload };
      case "SET_EDITOR_VISIBILITY":
      return { ...state, editorShow: action.payload };
      case "SET_ID":
      return { ...state, id: action.payload };
    default:
      return state;
  }
};

const PhotoWithIDCardEditModal = (props) => {
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
      dispatch({ type: "SET_ID", payload: user.profile.id});
      if (isFirstRender.current) {

        dispatch({ type: "SET_PHOTO_WITH_ID_CART_KEY", payload: user.profile.PhotoWithIDCard.photo});
        isFirstRender.current = false; // Update the ref value after the first render
      }
    }
  }, [user]);



  const setIdCartImage = (image) => {
    dispatch({ type: "SET_PHOTO_WITH_ID_CART", payload: image });
  };

  const setIdCartImageAndOpenEditor = (image) => {
    dispatch({ type: "SET_PHOTO_WITH_ID_CART", payload: image });
    editorShowHandler(true)
  };

  const idCartImageDeleteHandler = (img) => {
    dispatch({ type: "SET_PHOTO_WITH_ID_CART", payload: [] });
  };

  const editorShowHandler = (value)=>[
    dispatch({type: "SET_EDITOR_VISIBILITY", payload: value})
  ]






  const uploadFile = async (image, folder) => {
    // const result =await uploadImage(image[0])
    // console.log(result)
    const userName = user.userName
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("folder", folder);
    if(state.photoWithIdCartKey === "") {
      formData.append("userName", userName);
    }else {
      const key = state.photoWithIdCartKey.substring(state.photoWithIdCartKey.indexOf("/") + 1);
      formData.append("existKey",key)
    }
    try {
      const result = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (result.ok) {
        const response = await result.json();
        if (response.error) {
          console.log(response.error);
          reduxDispatch(
            uiActions.showNotification({
              status: "error",
              message: "در بارگذاری عکس ها خطایی رخ داده است لطفا بعدا مجدد تلاس کنید",
            })
          );
          return 
        } else if (response.success) {
          console.log(response.success);
          reduxDispatch(
            uiActions.showNotification({
              status: "success",
              message: "عکس ها بارگذاری شداند",
            })
          );
          return response;
        }
      } else {
        reduxDispatch(
          uiActions.showNotification({
            status: "error",
            message: "در ارتباط با سرور خطایی رخ داده است لطفا مجدد تلاش کنید",
          })
        );
        console.log(result);
        return;
      }
    } catch (error) {
      reduxDispatch(
        uiActions.showNotification({
          status: "error",
          message: "در بارگذاری عکس ها خطایی رخ داده است لطفا بعدا مجدد تلاس کنید",
        })
      );
    }
  };

  const uploadImage = async (image, folder, setKey) => {
    
    if(image.length > 1) {
      reduxDispatch(
        uiActions.showNotification({
          status: "pending",
          message: "pending",
        })
      );
      const result = await uploadFile(image, folder);
      if (result && result.success && result.result.key) {
        // set success
        dispatch({ type: setKey, payload: result.result.key });
        return result.result.key
      }else if(result.error){
        return false
      }
    }else {
      return ""
    }
  };






  const imageUpdateHandler = async () => {
    // dispatch({ type: "SET_LOADING", payload: true });
    // if(state.newEmail !== state.currentEmail) {
    //   console.log("email updated");
    // }else {
    //   console.log("email is smae and not updated");

    // }
    // reduxDispatch(profileEditMoadalAction.closeModal(props.modalID))

    // dispatch({ type: "SET_LOADING", payload: false });
  
    if(state.photoWithIdCart.length < 1) {
      reduxDispatch(
        uiActions.showNotification({
          status: 'error',
          message: "لطفا یک عکس انتخاب کنید",
        })
      );
      return
    }
    const idCartImageKey = await uploadImage(
      state.photoWithIdCart,
      state.photoWithIdCartKey,
      "idCart",
      "SET_PHOTO_WITH_ID_CART_KEY"
    );

    if(state.photoWithIdCartKey === idCartImageKey){
      reduxDispatch(
        uiActions.showNotification({
          status: "success",
          message: "عکس شما به همراه کارت ملی با موفقیت بروزرسانی شد.",
        })
      );
    }

    reduxDispatch(changeProfile(state.id,{photoWithIDCard:idCartImageKey})).then(() => {
      update();
    }).then(()=> {

    })
  };

  return (
    <ProfileEditorModal modalID={props.modalID} size="2xl">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">
             تصویر خود را به همراه کارت ملی  
            <span className="text-primary"> بارگذاری </span> کنید
          </span>
        </div>
<div className="flex flex-col mt-2">
            <div className="flex items-center">
              <label className="block mr-2 text-[#414141] font-medium dark:text-white">
                عکس خودتان به همراه کارت ملی:
              </label>
              {/* <Button
                onClick={onOpen}
                size="sm"
                variant="bordered"
                color="primary"
                radius="full"
                className="m-2 "
              >
                راهنما
              </Button> */}
            </div>
            <UploadImage
              image={state.photoWithIdCart}
              setImage={setIdCartImageAndOpenEditor}
              imageDeleteHandler={idCartImageDeleteHandler}
            />
          {state.editorShow === true && <ImageEditor image={state.photoWithIdCart[1]}  setImage={setIdCartImage} setEditorShow={editorShowHandler}/>}
          </div>



        {notification && 
          <NotoficationUi notification={notification}/> 
          }
        <Button
          color="primary"
          radius="full"
          isLoading={notification && notification.status === "pending" ? true: false}
          onClick={imageUpdateHandler}
        >
          تغییر عکس خود به همراه کارت ملی
        </Button>
      </div>
    </ProfileEditorModal>
  );
};

export default PhotoWithIDCardEditModal;
