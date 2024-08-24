"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addressSchema } from "../../../schema/index";
import { Button, Input } from "@nextui-org/react";
import ProfileEditorModal from "@/components/modal/profileEditModal";
import { useEffect, useReducer, useState, useTransition } from "react";
import MapView from "./mapView";
import LoactionPicker from "./locarionPicker";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { profileEditMoadalAction } from "@/store/profileEditModal-slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createAddress = async ({ values, id }) => {
  const requestEndPoint = id ? `/api/address/${id}` : "/api/address";
  const result = await fetch(requestEndPoint, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!result.ok) {
    toast.error("در ارتباط با سرور خطایی رخ داده است");
    throw new Error("در ارتباط با سرور خطایی رخ داده است");
  }

  const response = await result.json();
  if (response.success) {
    return response.success;
  } else if (response.error) {
    throw new Error(response.error);
  }
  return;
};

const initialState = {
  name: "",
  address: "",
  plate: "",
  bldName: "",
  floor: "",
  unit: "",
  city: "",
  province: "",
  postalCode: "",
  coordinate: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_PLATE":
      return { ...state, plate: action.payload };
    case "SET_BLD_NAME":
      return { ...state, bldName: action.payload };
    case "SET_FLOOR":
      return { ...state, floor: action.payload };
    case "SET_UNIT":
      return { ...state, unit: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_POSTALCODE":
      return { ...state, postalCode: action.payload };
    case "SET_PROVINCE":
      return { ...state, province: action.payload };
    case "SET_COORDINATE":
      return { ...state, coordinate: action.payload };
    case "SET_FULL_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const AddAddressForm = ({ id }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const [location, setLocation] = useState();
  const reduxDispatcxh = useDispatch();

  const addressQuery = useQuery({
    queryKey: ["getAddress", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const result = await fetch(`/api/address/${id}`);
      if (!result.ok) {
        toast.error("در هنگام ارتباط با سرور خطایی رخ داده است.");
        throw new Error("در هنگام ارتباط با سرور خطایی رخ داده است.");
      }
      const response = await result.json();
      if (response.error) {
        toast.error(response.error);
        throw new Error(response.error);
      } else {
        return response;
      }
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      address: "",
      plate: "",
      bldName: "",
      floor: "",
      unit: "",
      city: "",
      province: "",
      postalCode: "",
      coordinate: null,
    },
  });
  useEffect(() => {
    dispatch({ type: "SET_COORDINATE", payload: location });
    console.log(location, "loc");
    setValue("coordinate", location);
  }, [location]);

  useEffect(() => {
    if (addressQuery.data) {
      const filteredData = Object.keys(initialState).reduce((acc, key) => {
        acc[key] = addressQuery.data[key] || initialState[key];
        return acc;
      }, {});
      console.log(filteredData, " filteredData");
      dispatch({ type: "SET_FULL_STATE", payload: filteredData });
      setLocation(addressQuery.data.coordinate);
      Object.keys(filteredData).forEach((key) => {
        setValue(key, filteredData[key]);
      });
    }
  }, [addressQuery.data]);

  const { mutate, isPending } = useMutation({
    mutationFn: createAddress,
    onError: (error, variables, context) => {
      toast.error(error.message);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success(data);
      reduxDispatcxh(profileEditMoadalAction.closeModal(id ? "editAddressForm" + id : "addressForm"));
    },
  });

  // const createAddress = async (values) => {
  //   const result = await fetch("/api/address", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });

  //   if (!result.ok) {
  //     toast.error("در ارتباط با سرور خطایی رخ داده است");
  //   }

  //   const response = await result.json();
  //   if (response.success) {
  //     toast.success(response.success);
  //     reduxDispatcxh(profileEditMoadalAction.closeModal("addressForm"));
  //     return;
  //   } else if (response.error) {
  //     toast.error(response.error);
  //     return;
  //   }
  //   return;
  // };

  const onSubmit = (values: z.infer<typeof addressSchema>) => {
    mutate({ values, id });
  };
  return (
    <ProfileEditorModal modalID={id ? "editAddressForm" + id : "addressForm"}>
      {!addressQuery.isPending && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-2xl">
              آدرس مورد نظر را
              <span className="text-primary">وارد</span> کنید
            </span>
          </div>
          <Input
            isClearable
            type="text"
            label="نام آدرس"
            variant="bordered"
            placeholder="نام آدرس را وارد کنید"
            value={state.name}
            {...register("name")}
            isInvalid={errors.name ? true : false}
            errorMessage={errors.name?.message && errors.name?.message}
            onChange={(event) =>
              dispatch({ type: "SET_NAME", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_NAME", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />

          <Input
            isClearable
            type="text"
            label="آدرس"
            variant="bordered"
            placeholder="آدرس خود را وارد کنید"
            value={state.address}
            {...register("address")}
            isInvalid={errors.address ? true : false}
            errorMessage={errors.address?.message && errors.address?.message}
            onChange={(event) =>
              dispatch({ type: "SET_ADDRESS", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_ADDRESS", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />

          <Input
            isClearable
            type="text"
            label="پلاک"
            variant="bordered"
            placeholder="پلاک خود را وارد کنید"
            value={state.plate}
            {...register("plate")}
            isInvalid={errors.plate ? true : false}
            errorMessage={errors.plate?.message && errors.plate?.message}
            onChange={(event) =>
              dispatch({ type: "SET_PLATE", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_PLATE", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />

          <Input
            isClearable
            type="text"
            label="اسم ساختمان"
            variant="bordered"
            placeholder="پلاک خود را وارد کنید"
            value={state.bldName}
            {...register("bldName")}
            isInvalid={errors.bldName ? true : false}
            errorMessage={errors.bldName?.message && errors.bldName?.message}
            onChange={(event) =>
              dispatch({ type: "SET_BLD_NAME", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_BLD_NAME", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />

          <Input
            isClearable
            type="text"
            label="طبقه"
            variant="bordered"
            placeholder="طبقه خود را وارد کنید"
            value={state.floor}
            {...register("floor")}
            isInvalid={errors.floor ? true : false}
            errorMessage={errors.floor?.message && errors.floor?.message}
            onChange={(event) =>
              dispatch({ type: "SET_FLOOR", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_FLOOR", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />

          <Input
            isClearable
            type="text"
            label="واحد"
            variant="bordered"
            placeholder="واحد خود را وارد کنید"
            value={state.unit}
            {...register("unit")}
            isInvalid={errors.unit ? true : false}
            errorMessage={errors.unit?.message && errors.unit?.message}
            onChange={(event) =>
              dispatch({ type: "SET_UNIT", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_UNIT", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />

          <Input
            isClearable
            type="text"
            label="شهر"
            variant="bordered"
            placeholder="شهر خود را وارد کنید"
            value={state.city}
            {...register("city")}
            isInvalid={errors.city ? true : false}
            errorMessage={errors.city?.message && errors.city?.message}
            onChange={(event) =>
              dispatch({ type: "SET_CITY", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_CITY", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />

          <Input
            isClearable
            type="text"
            label="کد پستی"
            variant="bordered"
            placeholder="کد پستی خود را وارد کنید"
            value={state.postalCode}
            {...register("postalCode")}
            isInvalid={errors.postalCode ? true : false}
            errorMessage={
              errors.postalCode?.message && errors.postalCode?.message
            }
            onChange={(event) =>
              dispatch({ type: "SET_POSTALCODE", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_POSTALCODE", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />

          <Input
            isClearable
            type="text"
            label="استان"
            variant="bordered"
            placeholder="استان خود را وارد کنید"
            value={state.province}
            {...register("province")}
            isInvalid={errors.province ? true : false}
            errorMessage={errors.province?.message && errors.province?.message}
            onChange={(event) =>
              dispatch({ type: "SET_PROVINCE", payload: event.target.value })
            }
            onClear={() => {
              dispatch({ type: "SET_PROVICE", payload: "" });
            }}
            className="max-w-xs"
            isDisabled={isPending}
          />
          <LoactionPicker location={location} setLocation={setLocation} />
          {errors.coordinate?.message && (
            <p className="text-red-500">
              لطفا موقیعت آدرس را روی نقشه انتخاب کنید
            </p>
          )}
          {/* {notification && <NotoficationUi notification={notification} />} */}
          <Button color="primary" isLoading={isPending} type="submit">
            تغییر ادرس
          </Button>
        </form>
      )}
    </ProfileEditorModal>
  );
};

export default AddAddressForm;
