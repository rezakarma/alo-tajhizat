"use client";
interface Item {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  plate: string;
  bldName: string;
  floor: string;
  unit: string;
  province: string;
  name: string;
  userProfileId: string;
  coordinate: {
    lat: number;
    lon: number;
  };
}
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@nextui-org/react";
import MapView from "./mapView";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AddAddressForm from "./addAddressForm";
import { profileEditMoadalAction } from "@/store/profileEditModal-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
const deleteItem = async (id: string) => {
  const result = await fetch(`/api/address/${id}`, {
    method: "DELETE",
  });
  if (!result.ok) {
    throw new Error("در هنگام ارتباط با سرور خطایی رخ داده است!");
  }
  const response = await result.json();
  if (response.error) {
    throw new Error(response.error);
  } else if (response.success) {
    return response.success;
  }
  return;
};

const AddressItem = ({ item }: { item: Item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteItem,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success(data);
    },
  });

  const dispatch = useDispatch();
  const openModal = () => {
    setIsOpen(true);
    dispatch(profileEditMoadalAction.openModal("editAddressForm" + item.id));
  };

  return (
    <div className="space-y-5 items-center h-full justify-around bg-white border-solid border-2 p-5 border-primaryLight rounded-2xl dark:border-primaryDark dark:bg-slate-600">
      <div className="flex  justify-between">
        <h2 className="font-bold text-lg dark:text-gray-300">{item.address}</h2>
        <div className="flex justify-evenly gap-2">
          <Button
            isIconOnly
            color="danger"
            onClick={mutate.bind(this, item.id)}
            isLoading={isPending}
            isDisabled={isPending}
          >
            <Trash2 />
          </Button>
          <Button isIconOnly color="primary" onClick={openModal}>
            <Pencil />
          </Button>
        </div>
      </div>
      <div className="flex font-xl justify-between">
        <div className="flex flex-col space-y-2 ">
          <p className="font-sm text-base xl:font-bold xl:text-lg">
            {item.city}
          </p>
          <p className="font-sm text-base xl:font-semibold xl:text-lg">
            {item.postalCode}
          </p>
          <p className="font-sm text-base xl:font-medium xl:text-lg">
            {item.province}
          </p>
          <p className="font-sm text-base xl:font-base xl:text-lg">
            {item.name}
          </p>
        </div>
        {/* <span className="w-24 h-20 xl:w-[20%] xl:h-40  flex bg-gray-100  border-solid border-2 border-black rounded-3xl p-5 space-y-5 dark:bg-darkBg"></span> */}
        <MapView showOnly={true} selectedLocation={item.coordinate} />
      </div>
      {isOpen && <AddAddressForm id={item.id} />}
    </div>
  );
};

export default AddressItem;
