import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Minus } from "lucide-react";
import { removeProduct, addProduct } from "@/store/cart-slice";
import { useDispatch } from "react-redux";
import {Badge} from "@nextui-org/badge";
const CartItem = ({ id, title, img, price, count }) => {
  const dispatch = useDispatch();

  const removeItemHandler = () => {
    dispatch(removeProduct(id));
  };

  const addItemHandler = () => {
    dispatch(addProduct(id));
  };

  return (
    <Card className="w-[100%] p-5 dark:bg-primaryDark2" shadow="sm">
      <div>
        <img
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${img}`}
          alt="product image"
        />
        <div className="font-bold">
          <h2>{title}</h2>
          <div className="flex gap-2">
            <h2>قیمت:</h2>
            <h2>{price}</h2>
          </div>
        </div>
      </div>
      <Card
        className="flex flex-row p-3 justify-evenly gap-4 w-[200px]"
        shadow="sm"
      >
        <Button
          isIconOnly
          radius="full"
          size="sm"
          color="primary"
          onClick={addItemHandler}
        >
          <Plus />
        </Button>
        <span className="text-lg font-bold">{count}</span>
        <Button
          isIconOnly
          radius="full"
          size="sm"
          color="primary"
          onClick={removeItemHandler}
        >
          <Minus />
        </Button>
      </Card>
    </Card>
  );
};

export default CartItem;
