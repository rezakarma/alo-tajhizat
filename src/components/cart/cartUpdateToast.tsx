import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CartUpdateToast = () => {
  const cartError = useSelector((state) => state.cart.error);

  const cartSuccess = useSelector((state) => state.cart.success);

  useEffect(() => {
    if (cartError !== null) {
      toast.error(cartError);
    }
  }, [cartError]);

  useEffect(() => {
    if (cartSuccess !== null) {
      toast.success(cartSuccess);
    }
  }, [cartSuccess]);
};

export default CartUpdateToast;
