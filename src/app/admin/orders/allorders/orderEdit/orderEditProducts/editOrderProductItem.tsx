import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/react";
import { Product } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { Image } from "@nextui-org/react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { dragAndDropActions } from "@/store/drandAndDrop-slice";
type ProductProps = {
  product: Product;
  type: "cart" | "all";
  count: number | null;
  index: number;
};

const EditOrderProductItem = ({
  product,
  type = "all",
  count,
  index,
}: ProductProps) => {
  const dispatch = useDispatch();
  const increaseCountHandler = () => {
    console.log(product.id);
    dispatch(
      dragAndDropActions.increaseItem({
        colId: "orderProductList",
        targetId: product.id,
      })
    );
  };

  const decreaseCountHandler = () => {
    dispatch(
      dragAndDropActions.deacraseItem({
        colId: "orderProductList",
        targetId: product.id,
      })
    );
  };

  return (
    <Draggable draggableId={product.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-sm">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <Image
                alt="product image"
                src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${product.images[0]}`}
                className="h-[100px] w-auto object-contain"
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              {type === "all" && <span>{`قیمت: ${product.rentPrice}`}</span>}
              {type === "cart" && (
                <div className="flex justify-evenly items-center gap-2">
                  <Button
                    isIconOnly
                    color="primary"
                    onClick={increaseCountHandler}
                  >
                    <Plus />
                  </Button>
                  <Chip color="primary" variant="flat" size="lg">
                    {count}
                  </Chip>
                  <Button
                    isIconOnly
                    color="primary"
                    onClick={decreaseCountHandler}
                  >
                    <Minus />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default EditOrderProductItem;
