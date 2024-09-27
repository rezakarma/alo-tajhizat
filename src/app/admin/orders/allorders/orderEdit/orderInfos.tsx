import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, Textarea } from "@nextui-org/input";
import { Address, Status } from "@prisma/client";

type OrderInfosProps = {
  address: Address;
  adminsOfOrder: string[] | [] | null;
  description: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  discountCode: string | null;
  status: Status;
};

const OrderInfos = ({
  address,
  adminsOfOrder,
  description,
  discountCode,
  createdAt,
  updatedAt,
  price,
  status,
}: OrderInfosProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>اطالاعات آدرس</CardTitle>
          <CardDescription>
            میتوانید جزییات سفارش را مشاهده کنید و آن را ویرایش کنید
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4">
          <Input
            isReadOnly
            label="نام آدرس:"
            variant="bordered"
            defaultValue={address.name}
            className="max-w-xs w-32"
          />
          <Input
            isReadOnly
            label="نام استان:"
            variant="bordered"
            defaultValue={address.province}
        className="max-w-xs w-32"
          />
          <Input
            isReadOnly
            label="نام شهر:"
            variant="bordered"
            defaultValue={address.city}
            className="max-w-xs w-32"
          />
          <Input
            isReadOnly
            label="آدرس:"
            variant="bordered"
            defaultValue={address.address}
    className="max-w-xs w-32"
          />
          <Input
            isReadOnly
            label="نام ساختمان:"
            variant="bordered"
            defaultValue={address.bldName}
           className="max-w-xs w-32"
          />
          <Input
            isReadOnly
            label="پلاک:"
            variant="bordered"
            defaultValue={address.plate}
      className="max-w-xs w-32"
          />
          <Input
            isReadOnly
            label="طبقه:"
            variant="bordered"
            defaultValue={address.floor}
          className="max-w-xs w-32"
          />
          <Input
            isReadOnly
            label="واحد:"
            variant="bordered"
            defaultValue={address.unit}
       className="max-w-xs w-32"
          />
          <Input
            isReadOnly
            label="کدپستی:"
            variant="bordered"
            defaultValue={address.postalCode}
     className="max-w-xs w-32"
          />
        </CardContent>
      </Card>

      <Card className="pt-5">
        <CardContent className="grid grid-cols-3 gap-4 text-right">
          <Input
            isReadOnly
            label="وضعیت فعلی سفارش:"
            variant="bordered"
            defaultValue={status}
          className="max-w-xs w-fit text-right"
          />
          <Input
            isReadOnly
            label="قیمت فعلی سفارش:"
            variant="bordered"
            defaultValue={price.toString()}
          className="max-w-xs w-fit"
          />
          <Input
            isReadOnly
            label="تاریخ ثبت سفارش:"
            variant="bordered"
            defaultValue={createdAt.toString()}
          className="max-w-xs w-fit"
          />
          <Input
            isReadOnly
            label="تاریخ آخرین بروزرسانی سفارش:"
            variant="bordered"
            defaultValue={updatedAt.toString()}
          className="max-w-xs w-fit"
          />
          <Input
            isReadOnly
            label="کد تخفیف:"
            variant="bordered"
            defaultValue={discountCode}
          className="max-w-xs w-fit"
          />
          <Textarea
            isReadOnly
            label="توضیحات سفارش:"
            variant="bordered"
            placeholder="توضیحاتی موجود نیست."
            defaultValue={description}
            className="max-w-xs"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderInfos;
