import CancelOrder from "@/data/orders/cnacelOrders";
import { Button } from "@nextui-org/react";
import { Status } from "@prisma/client";
const OrderEditStatusAction = ({
  orderId,
  status,
}: {
  orderId: string;
  status: Status;
}) => {
  const mutation = CancelOrder();

  return (
    <div className="flex gap-5">
      <Button
        color="primary"
        isDisabled={mutation.isPending || status === "pendingPayment"}
        isLoading={mutation.isPending}
      >
        تایید برای پرداخت
      </Button>
      <Button
        color="danger"
        isDisabled={mutation.isPending || status === "canceled"}
        isLoading={mutation.isPending}
        onClick={() =>
          mutation.mutate({
            orderId: orderId,
            type: "USER",
          })
        }
      >
        لغو سفارش
      </Button>
    </div>
  );
};

export default OrderEditStatusAction;
