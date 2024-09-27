import Product from "@/app/equipment-rental/productsSection/productsContainer/product";
import ProductContainerWithScoroll from "@/components/utils/productContainerWithScoroll";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import UserProfileOrderProductContainer from "./userProfileOrderProductContainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CancelOrder from "@/data/orders/cnacelOrders";

const UserProfileSimpleItem = (props) => {
  const setSelectedHnadler = () => {
    if (props.setSelected) {
      props.setSelected(props.trackingCode);
    }
    return;
  };
  const mutation = CancelOrder();

  return (
    <div
      onClick={setSelectedHnadler}
      className="flex flex-col gap-2 border-2 border-primary rounded-xl h-[95%] dark:bg-primaryDark2 "
    >
      <div className="flex flex-col justify-start px-5 gap-5 bg-white rounded-xl py-3 dark:bg-primaryDark ">
        <div className="flex gap-3">
          <span className="w-fit">{props.status}</span>
          {!props.setSelected &&
            (props.status === "pendingPayment" ||
              props.status === "pendingConfirmation") && (
              <div className="flex gap-3">
                {props.status === "pendingPayment" && (
                  <Button color="primary" size="sm">
                    پرداخت
                  </Button>
                )}
                <Button
                  color="danger"
                  size="sm"
                  isDisabled={mutation.isPending}
                  isLoading={mutation.isPending}
                  onClick={() =>
                    mutation.mutate({
                      orderId: props.trackingCode,
                      type: "USER",
                    })
                  }
                >
                  انصراف
                </Button>
              </div>
            )}
        </div>
        <div className="flex flex-col items-center xl:flex-row xl:justify-between ">
          <span>تاریخ: {props.date}</span>
          <span className="">کد رهگیری: {props.trackingCode}</span>
          <span>مبلغ:{props.price}</span>
        </div>
      </div>
      <div className="flex gap-2 p-1">
        <UserProfileOrderProductContainer products={props.products} />
      </div>
    </div>
  );
};

export default UserProfileSimpleItem;
