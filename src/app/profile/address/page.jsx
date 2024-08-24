"use client";
import { Plus } from 'lucide-react';
import UserProfileCard from "@/components/card/userProfileCard";
import React from "react";
import AddressList from "./addressList";
import { Button } from "@nextui-org/react";
import { profileEditMoadalAction } from "@/store/profileEditModal-slice";
import { useDispatch } from "react-redux";
import AddAddressForm from "./addAddressForm";
const UserProfileAddress = () => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(profileEditMoadalAction.openModal("addressForm"));
  };

  return (
    <UserProfileCard title="آدرس  ها">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className='self-end ml-20 m-4'>
          <Button onClick={openModal} color="primary">
            اضافه کردن آدرس
            <Plus />
          </Button>
          <AddAddressForm/>
        </div>
        <AddressList />
      </div>
    </UserProfileCard>
  );
};

export default UserProfileAddress;
