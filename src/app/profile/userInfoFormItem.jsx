"use client"

import AddInfosSvg from "../../../public/assets/userDashboard/addInfosSvg";
import EditInfosSvg from "../../../public/assets/userDashboard/editInfosSvg";
import InfosEditPhoneNumber from "./infosEditModal/phoneNumberEditModal/infosEditPhoneNumber";
import { profileEditMoadalAction } from '../../store/profileEditModal-slice'
import { useDispatch } from "react-redux";
const UserInfosItem = (props) => {
  const dispatch = useDispatch()

const openModal = () => {
  dispatch(profileEditMoadalAction.openModal(props.modalID))
}

  return (
    <div className="flex flex-col gap-1 mb-1 w-full pl-1 ">
      <label className="block mr-2 text-[#414141] font-medium dark:text-white">
        {props.label}
      </label>
      <div
        className="flex justify-between items-center border-gray-400 border-2 rounded-full px-4 drop-shadow-lg text-gray-800
            focus:outline-none focus:border-primary focus:ring-primaryLight focus:ring-1 
            focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-gray-600 bg-white "
      >
        <input type={props.inputType} value={props.input} required className=" h-9 w-5/6 border-none outline-none dark:bg-gray-600 dark:text-white" />
        <button onClick={openModal}>
        {props.isFill? <EditInfosSvg /> : <AddInfosSvg/>}
        
        </button>
      </div>
    </div>
  );
};

export default UserInfosItem;
