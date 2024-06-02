import ProfileEditorModal from "@/components/modal/profileEditModal";
import UserInfosItem from "./userInfoFormItem";
import InfosEditPhoneNumber from "./infosEditModal/phoneNumberEditModal/infosEditPhoneNumber";
import NameEditModal from "./infosEditModal/nameEditModal";
import InfosEditModals from "./infosEditModal/infosEditModal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserPhotoWithIdCartFormItem from "./userPhotoWithIdCartFormItem";

let loadingFormData = [
  {
    input: "",
    inputType: "text",
    label: "نام و نام خانوادگی",
    isFill: true,
    modalID : 'NameEditModal'
  },
  {
    input: "reza",
    inputType: "username",
    label: "نام کاربری",
    isFill: true,
    modalID: 'UsernameEditModal'
  },
  {
    input: "reza@gmail.com",
    inputType: "email",
    label: "ایمیل",
    isFill: true,
    modalID : 'EmailEditModal'
  },
  {
    input: "09120900099",
    inputType: "tel",
    label: "شماره موبایل",
    isFill: true,
    modalID : 'InfosEditPhoneNumber'
  },
  {
    input: "12345678",
    inputType: "password",
    label: "رمز عبور",
    isFill: true,
    modalID: 'PasswordEditModal'
  },
  {
    input: "مهندس کامپیوتر",
    inputType: "text",
    label: "شغل",
    isFill: true,
    modalID:'JobEditModal'
  },
  {
    input: "123456789",
    inputType: "text",
    label: "کد ملی",
    isFill: false,
    modalID: 'NationalEditModal'
  },
  {
    input: "1380/1/1",
    inputType: "text",
    label: "تاریخ تولد",
    isFill: false,
    modalID: 'BirthDateEditModal'
  },
];

const modalsArray = [
  {modal: <InfosEditPhoneNumber/>},
  {modal: <NameEditModal/>},
]

const UserInfosForm = () => {
  const user = useCurrentUser()
  const session = useSession()
  const [formData , setFormData] = useState([])
  useEffect(() => {

    if(user) {
      
console.log("user: ", user)
setFormData([
        {
        input: `${user.profile.firstName} ${user.profile.lastName}`,
        inputType: "text",
        label: "نام و نام خانوادگی",
        isFill: true,
        modalID : 'NameEditModal'
      },
      {
        input: user.userName,
        inputType: "username",
        label: "نام کاربری",
        isFill: true,
        modalID: 'UsernameEditModal'
      },
      {
        input: user.email,
        inputType: "email",
        label: "ایمیل",
        isFill: true,
        modalID : 'EmailEditModal'
      },
      {
        input: user.phoneNumber,
        inputType: "tel",
        label: "شماره موبایل",
        isFill: true,
        modalID : 'InfosEditPhoneNumber'
      },
      {
        input: user.profile.landlineNumber,
        inputType: "tel",
        label: "شماره تلفن ثابت",
        isFill: true,
        modalID : 'landlineNumberEditModal'
      },
      {
        input: "12345678",
        inputType: "password",
        label: "رمز عبور",
        isFill: true,
        modalID: 'PasswordEditModal'
      },
      {
        input: user.profile.job,
        inputType: "text",
        label: "شغل",
        isFill: true,
        modalID:'JobEditModal'
      },
      {
        input: user.profile.nationalCode,
        inputType: "text",
        label: "کد ملی",
        isFill: true,
        modalID: 'NationalEditModal'
      },
      {
        input: user.profile.birthDate.solarBirthDate,
        inputType: "text",
        label: "تاریخ تولد",
        isFill: true,
        modalID: 'BirthDateEditModal'
      },
    ]);
  }
  },[user])
  return (
    <div className="grid grid-cols-2 gap-5 gap-x-10 xl:w-[70%] mx-auto h-[90%] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollable-container px-4">
      {formData.map((item, index) => {
        return (
          <div key={index}>
            <UserInfosItem
             
              label={item.label}
              input={item.input ? item.input : `لطفا ${item.label} خود را وارد کنید`}
              inputType={item.inputType}
              isFill={item.input ? true : false}
              modalID={item.modalID ? item.modalID : ''}
              />
              <InfosEditModals modalID={item.modalID ? item.modalID : ''}/>
              </div>
          );
        //   if (item.input) {
        // }
        // else {
        //   return (
        //     <div key={index}>
        //     <UserInfosItem
        //       label={item.label}
        //       input={`${item.label} را وارد کنید`}
        //       inputType={item.inputType}
        //       isFill={item.input ? true : false}
        //       modalID={item.modalID ? item.modalID : ''}
        //     />
        //     <InfosEditModals modalID={item.modalID ? item.modalID : ''}/>
        //     </div>
        //   );
        // }
      })}
      <div>
            <UserPhotoWithIdCartFormItem
             
              label='عکس با کارت ملی'
              input={user.profile.PhotoWithIDCard.photo ? user.profile.PhotoWithIDCard.photo   : ''}
              inputType='image'
              isFill={user.profile.PhotoWithIDCard.photo   ? true : false}
              modalID={'photoWithIDCardEditModal'}
              />
              <InfosEditModals modalID={'photoWithIDCardEditModal'}/>
              </div>
    </div>
  );
};

export default UserInfosForm;
