import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

enum CancelType {
  ADMIN = "ADMIN",
  USER = "USER",
}

type CancelArg = {
  type: CancelType;
  orderId: string;
};

const cancelOrder = async ({ orderId, type }: CancelArg) => {
  console.log(orderId, " mutation", type, " type");
  const url = type === "ADMIN" ? "/api/order/admin" : "/api/order";
  const result = await fetch(`${url}?orderId=${orderId}&status=canceled`, {
    method: "PATCH",
  });
  if (!result.ok) {
    throw new Error("خطایی رخ داده دوباره تلاش کنید!");
  }
  const response = await result.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response.success;
};

const CancelOrder = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: cancelOrder,
    onError: (error: string, variables, context) => {
      toast.error(error);
    },
    onSuccess: (data, variables, context) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
  return mutation;
};

export default CancelOrder;
