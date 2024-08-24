import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";
import { BeatLoader } from "react-spinners";
const fetchAddresses = async () => {
  const result = await fetch("/api/address");
  if (!result.ok) {
    throw new Error("در هنگام ارتباط با سرور خطایی رخ داده است");
  }
  const response = await result.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

const AddressSelector = ({ control, name, errorMessage, isDisabled }) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });

  if (data) {
    console.log(data, " addresses");
  }

  return (
    <Card>
      <CardHeader>
        {!data && <h5>در حال بارگیری آدرس ها</h5>}
        {data && data.length > 0 && (
          <CardTitle className="text-lg">توضیحات سفارش</CardTitle>
        )}
        {data && data.length === 0 && (
          <CardTitle className="text-lg">
            شما هنوز هیچ آدرسی اضافه نکرده اید.
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {!data && <BeatLoader />}
        {data && data.length === 0 && (
          <>
            <Link href="/profile/address">
              <Button color="primary">
                افزودن آدرس <Plus />
              </Button>
            </Link>
          </>
        )}
        {data && data.length > 0 && (
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              // value={field.value}
              // isInvalid={!!errorMessage}
              // errorMessage={errorMessage}
              // onValueChange={(e) => {
              //   field.onChange(e);
              // }}
              <Select
                label="آدرس"
                placeholder="آدرس مورد نظر را انتخاب کنید"
                className="max-w-xs"
                selectedKeys={[field.value]}
                onChange={(e) => {
                  field.onChange(e);
                }}
                isInvalid={!!errorMessage}
                errorMessage={errorMessage}
                isDisabled={isDisabled}
              >
                {data.map((item) => (
                  <SelectItem
                    key={item.id}
                  >{`${item.name}: ${item.province}, ${item.city}, ${item.address}`}</SelectItem>
                ))}
              </Select>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AddressSelector;
