"use client";
import { statusLabels } from "@/app/utils/enumUtils";
import { Input } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Status } from "@prisma/client";

type OrderFilteringType = {
  status: Status;
  setStatus: (status: any) => any;
  username: string;
  setUsername: (username: string) => any;
};

const OrderFiltering = ({
  status,
  setStatus,
  username,
  setUsername,
}: OrderFilteringType) => {
  
  return (
    <div className="flex my-5 mx-5 gap-2">
      <Select
        label="وضعیت سفارش"
        className="max-w-xs w-1/5"
        variant="bordered"
        selectedKeys={status}
        onSelectionChange={setStatus}
      >
        {Object.keys(Status).map((item) => (
          <SelectItem key={item}>{statusLabels[Status[item]]}</SelectItem>
        ))}
      </Select>
      <div className="w-full flex flex-col gap-2 max-w-[240px]">
        <Input
          variant="bordered"
          label="نام کاربری"
          placeholder="نام کاربری سفارش را وارد کنید."
          value={username}
          onValueChange={setUsername}
        />
      </div>
    </div>
  );
};

export default OrderFiltering;
