"use client"

import AddInfosSvg from "../../../public/assets/userDashboard/addInfosSvg";
import EditInfosSvg from "../../../public/assets/userDashboard/editInfosSvg";
import InfosEditPhoneNumber from "./infosEditModal/phoneNumberEditModal/infosEditPhoneNumber";
import { profileEditMoadalAction } from '../../store/profileEditModal-slice'
import { useDispatch } from "react-redux";
import {Image} from "@nextui-org/react";

const UserPhotoWithIdCartFormItem = (props) => {
  const dispatch = useDispatch()

const openModal = () => {
  dispatch(profileEditMoadalAction.openModal(props.modalID))
}
const imageEndPoint = process.env.NEXT_PUBLIC_IMAGES_ENDPOINT
  return (
    <div className="flex flex-col gap-1 mb-1 w-full pl-1 ">
      <label className="block mr-2 text-[#414141] font-medium dark:text-white">
        {props.label}
      </label>
      <div
        className="flex justify-between items-center border-gray-400 border-2 rounded-xl px-4 drop-shadow-lg text-gray-800
            focus:outline-none focus:border-primary focus:ring-primaryLight focus:ring-1 
            focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-gray-600 bg-white "
      >
        {/* <input type={props.inputType} value={props.input} required className=" h-9 w-5/6 border-none outline-none dark:bg-gray-600 dark:text-white" /> */}
        
      {props.input !== ""?  <Image
      alt="عکس با کارت ملی"
      className="max-w-[200px] max-h-[300px] object-contain p-3"
      src={`${imageEndPoint}/${props.input}`}
    />:
    <span>شما هنوز  تصور خود به همراه کارت ملی را بارگذاری نکردید</span>
    }
        <button onClick={openModal}>
        {props.isFill? <EditInfosSvg /> : <AddInfosSvg/>}
        
        </button>
      </div>
    </div>
  );
};

export default UserPhotoWithIdCartFormItem;
