"use client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Controller } from "react-hook-form";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useEffect } from "react";
const OrderSettingItem = ({
  items,
  itemLabelConventor,
  label,
  control,
  name,
  errorMessage,
  isDisabled
}) => {
  return (
    <Card className="pt-3">
      <CardContent className="text-right">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <RadioGroup
              label={label}
              value={field.value}
              isInvalid={!!errorMessage}
              errorMessage={errorMessage}
              onValueChange={(e) => {
                field.onChange(e);
              }}
              isDisabled={isDisabled}
            >
              {Object.values(items).map((item: string) => (
                <Radio
                  key={item}
                  value={item.toString()}
                  className="gap-2 font-medium"
                  size="sm"
                >
                  {itemLabelConventor[item]}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default OrderSettingItem;
