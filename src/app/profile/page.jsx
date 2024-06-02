"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@nextui-org/react";
import UserInfosForm from "./userInfoForm";
import UserProfileCard from "@/components/card/userProfileCard";
import { auth, signOut } from "@/auth";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import { fetchProfileData } from "@/store/profile-actions";
import { profileActions } from "@/store/profile-slice";
const UserProfile = () => {
  // const session = await auth()
  const userProfile = useSelector((state) => state.profile.profile);
  const user = useCurrentUser();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchProfileData());
    if (user) {
      // dispatch(profileActions.setProfile({
      //   profile: user.profile || null
      // }))
      dispatch(fetchProfileData());
    }
  }, [dispatch, user]);

  const test = (e) => {
    e.preventDefault();
    console.log({
      userProfile,
    });
  };
  return (
    <UserProfileCard title="اطلاعات حساب کاربری">
      {user && user.profile && <UserInfosForm />}
      {!user ||
        (!user.profile && (
          <div className="flex flex-col h-96 justify-center gap-5 items-center">
            <h3 className="text-xl font-semibold">
              شما هنوز پروفایل نساخته اید
            </h3>
            <Link href="/create-profile">
              <Button color="primary" radius="full">
                ساخت پروفایل
              </Button>
            </Link>
          </div>
        ))}
      {/* {!user && <Spinner label="در حال بارگذاری..." color="primary" size="lg"/> */}
      {/* <Button color="primary" radius="full" onClick={test}>ساخت پروفایل</Button> */}
      {/* {JSON.stringify(session)} */}
    </UserProfileCard>
  );
};

export default UserProfile;
