"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UserProfileOrderProductContainer from "@/app/profile/orders/userProfileOrdersItem/userProfileOrderProductContainer";
import { Button } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import { profileEditMoadalAction } from "@/store/profileEditModal-slice";
import OrderEditProductsModal from "./orderEditProductsModal";
import { useEffect } from "react";
import { orderProduct } from "@prisma/client";

const OrderEditproducts = ({ productsList }: { productsList: orderProduct[] }) => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(profileEditMoadalAction.openModal("orderEditProductsModal"));
  };

  useEffect(() => {
    console.log(productsList, ' hereeedf')
  }, [productsList]);

  return (
    <>
      <Card>
        <CardContent>
          <CardHeader>
            <Button onClick={openModal} isIconOnly color="primary">
              <Pencil />
            </Button>
          </CardHeader>
          <UserProfileOrderProductContainer products={productsList} />
        </CardContent>
      </Card>
      <OrderEditProductsModal productsList={productsList}/>
    </>
  );
};

export default OrderEditproducts;
