"use client";

import { Divider, Image } from "@nextui-org/react";

import UserInfosSvg from "../../../public/assets/userDashboard/userInfosSvg";
import UserOrderSvg from "../../../public/assets/userDashboard/userOrderScg";
import UserAddressSvg from "../../../public/assets/userDashboard/userAddressSvg";
import UserNotificationSvg from "../../../public/assets/userDashboard/userNotificationSvg";
import UserLogoutSvg from "../../../public/assets/userDashboard/userLogoutSvg";
import UserSideBarItem from "./UserSideBarItem";
import ProfileImage from '@/components/profile/profileImage'
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { profileEditMoadalAction } from '../../store/profileEditModal-slice'
import ProfileImageEditModal from "./infosEditModal/profileImageEditModal";
import InfosEditModals from "./infosEditModal/infosEditModal";


let sliderItem = [
  { title: "اطلاعات حساب کاربری", href: "/profile", svg: <UserInfosSvg /> },
  { title: "سفارش ها", href: "/profile/orders", svg: <UserOrderSvg /> },
  { title: "آدرس ها", href: "/profile/address", svg: <UserAddressSvg /> },
  {
    title: "پیغام ها",
    href: "/profile/notifications",
    svg: <UserNotificationSvg />,
  },
];
const UserSideBar = () => {
  const user = useCurrentUser();
  const [userName,setUserName] = useState('در حال بارگذاری...')
  const [userProfileImage,setUserProfileImage] = useState(null)
  const imageEndPoint = process.env.NEXT_PUBLIC_IMAGES_ENDPOINT
  const dispatch = useDispatch()


  useEffect(() => {
    // handleCurrentPhoneNumber();
    if (user) {
      setUserName(user.userName);
      if(user.profile){
        setUserProfileImage(user.profile.profileImage)
      }
    }
  }, [user]);


  const openModal = () => {
    dispatch(profileEditMoadalAction.openModal('ProfileImageEditModal'))
  }

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <div className="w-[100%] h-screen  flex flex-col  ">
      <div className="bg-primary dark:bg-primaryDark h-1/4"></div>
      <div className="h-1/6 relative">
        <div className="h-1/2 bg-primary dark:bg-primaryDark"></div>
        <div className="h-1/2 "></div>
        {/* <Image width={100} removeWrapper={true} height={100} alt="عکس پروفایل" src={userProfileImage?  `${imageEndPoint}/${userProfileImage}` : `${imageEndPoint}/profile/demo-profile.jpg`} className="absolute h-[100px] w-[100px] top-0 m-auto rounded-full left-0 right-0 bottom-0 flex justify-center items-center"></Image> */}
        <ProfileImage alt="عکس پروفایل" src={userProfileImage?  `${imageEndPoint}/${userProfileImage}` : `${imageEndPoint}/profile/demo-profile.jpg`} handleClick={(openModal)} />
      </div>
      <InfosEditModals  modalID={'ProfileImageEditModal'} />
      <div className="h-[10%] flex justify-center items-start">
        <h2 className="font-bold text-2xl">{userName}</h2>
      </div>
      <div className="">
        <ul className=" flex flex-col gap-4 justify-center items-center ">
          {sliderItem.map((item, index) => (
            <UserSideBarItem
              key={index}
              title={item.title}
              svg={item.svg}
              href={`${item.href}`}
            />
          ))}
          <UserSideBarItem title="خروج" svg={<UserLogoutSvg />} href="/" />
        </ul>
      </div>
    </div>
  );
};

export default UserSideBar;
