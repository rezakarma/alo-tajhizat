"use client";

import ProfileEditorModal from "@/components/modal/profileEditModal";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { profileEditMoadalAction } from "../../../store/profileEditModal-slice";
import { useEffect, useReducer } from "react";
import { DatePicker, InputDatePicker } from "jalaali-react-date-picker";
import "jalaali-react-date-picker/lib/styles/index.css";
import moment from "moment-jalaali";
import { CalendarDays } from "lucide-react";
import { Eraser } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import NotoficationUi from "../../../components/formValidateMessages/notification-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useTransition } from "react";
import { editBirthdate } from "@/schema/index";
import { uiActions } from "@/store/ui-slice";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { changeProfile } from "@/store/profile-actions";
import { useSession } from "next-auth/react";
const initialState = {
  currentBirthDate: null,
  newBirthDate: null,

  newSolarBirthDate: "",
  currentSolarBirthDate: "",

  newISO8601BirthDate: "",
  currentISO8601BirthDate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_BIRTH_DATE":
      return { ...state, newBirthDate: action.payload };
    case "SET_CURRENT_BIRTH_DATE":
      return { ...state, currentBirthDate: action.payload };
    case "SET_NEW_SOLAR_BIRTH_DATE":
      return { ...state, newSolarBirthDate: action.payload };
    case "SET_CURRENT_SOLAR_BIRTH_DATE":
      return { ...state, currentSolarBirthDate: action.payload };
    case "SET_NEW_ISO_BIRTH_DATE":
      return { ...state, newISO8601BirthDate: action.payload };
    case "SET_CURRENT_ISO_BIRTH_DATE":
      return { ...state, currentISO8601BirthDate: action.payload };

    default:
      return state;
  }
};

const BirthDateEditModal = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { update } = useSession();
  const isFirstRender = useRef(true);

  const user = useCurrentUser();
  const notification = useSelector((state) => state.ui.notification);

  const reduxDispatch = useDispatch();

  useEffect(() => {}, [reduxDispatch]);

  useEffect(() => {
    // handleCurrentPhoneNumber();
    if (user) {
      dispatch({
        type: "SET_CURRENT_BIRTH_DATE",
        payload: user.profile.birthDate.birthDate,
      });
      dispatch({
        type: "SET_CURRENT_SOLAR_BIRTH_DATE",
        payload: user.profile.birthDate.solarBirthDate,
      });
      dispatch({
        type: "SET_CURRENT_ISO_BIRTH_DATE",
        payload: user.profile.birthDate.ISO8601BirthDate,
      });
      setValue("id", user.profile.id);
      if (isFirstRender.current) {
        setValue("birthDate", user.profile.birthDate.solarBirthDate);
        const dateString = user.profile.birthDate.birthDate;
        const date = moment(dateString);
        const formattedDate = moment(dateString).format("jYYYY/jMM/jDD");
        dispatch({
          type: "SET_NEW_BIRTH_DATE",
          payload: date,
        });
        dispatch({
          type: "SET_NEW_SOLAR_BIRTH_DATE",
          payload: user.profile.birthDate.solarBirthDate,
        });
        dispatch({
          type: "SET_NEW_ISO_BIRTH_DATE",
          payload: user.profile.birthDate.ISO8601BirthDate,
        });

        isFirstRender.current = false; // Update the ref value after the first render
      }
    }
  }, [user]);

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editBirthdate),
    defaultValues: {
      birthDate: "",
      id: "",
    },
  });

  const onSubmit = (value) => {
    console.log(value);
    reduxDispatch(
      uiActions.showNotification({
        status: null,
        message: null,
      })
    );

    if (state.newSolarBirthDate === state.currentSolarBirthDate) {
      reduxDispatch(
        uiActions.showNotification({
          status: "error",
          message: "تاریخ تولد فعلی با تاریخ تولد جدید یکی است",
        })
      );
      return;
    }
    reduxDispatch(changeProfile(value.id,{birthDate:{
      birthDate: state.newBirthDate,
      solarBirthDate: state.newSolarBirthDate,
      ISO8601BirthDate: state.newISO8601BirthDate
    }})).then(() => {
      update();
    })
  };

  const handleDateChange = (date) => {
    console.log(date);
    if (date) {
      const gregorianDate = date._i;
      const solarDate = moment(gregorianDate, "YYYY-MM-DD").format(
        "jYYYY/jMM/jDD"
      );
      dispatch({ type: "SET_NEW_SOLAR_BIRTH_DATE", payload: solarDate });
      dispatch({ type: "SET_NEW_BIRTH_DATE", payload: date });
      dispatch({ type: "SET_NEW_ISO_BIRTH_DATE", payload: date.toISOString() });
      setValue("birthDate", solarDate);
      trigger("birthDate");
    }
  };

  const clearDateHandler = () => {
    dispatch({ type: "SET_NEW_SOLAR_BIRTH_DATE", payload: "" });
    dispatch({ type: "SET_NEW_BIRTH_DATE", payload: "" });
    dispatch({ type: "SET_NEW_ISO_BIRTH_DATE", payload: "" });
    setValue("birthDate", "");

    trigger("birthDate");
  };

  return (
    <ProfileEditorModal modalID={props.modalID} isDismissable={false}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">
            ایمیل خود را
            <span className="text-primary">وارد</span> کنید
          </span>
        </div>
        <div className="flex justify-evenly">
          <Input
            isClearable
            type="email"
            label="ایمیل"
            variant="bordered"
            placeholder="ایمیل خود را وارد کنید"
            value={state.newSolarBirthDate}
            isInvalid={errors.birthDate ? true : false}
            isReadOnly={true}
            onClear={clearDateHandler}
            className="max-w-xs"
            errorMessage={
              errors.birthDate?.message && errors.birthDate?.message
            }
          />

          <Popover placement="right">
            <PopoverTrigger>
              <button
                disabled={
                  notification && notification.status === "pending"
                    ? true
                    : false
                }
                type="button"
                className=" active:scale-125 hover:text-primary"
              >
                <CalendarDays />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <DatePicker
                dateFormat="jYYYY/jMM/jDD"
                value={state.newBirthDate}
                disabled={
                  notification && notification.status === "pending"
                    ? true
                    : false
                }
                onChange={handleDateChange}
                wrapperClassName="rounded-full flex flex-row"
                wrapperStyle={{
                  all: "unset",
                  display: "flex",
                  justifyContent: "between",
                  width: "100%",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {notification && <NotoficationUi notification={notification} />}
        <Button
          color="primary"
          radius="full"
          isLoading={
            notification && notification.status === "pending" ? true : false
          }
          type="submit"
        >
          تغییر ایمیل
        </Button>
      </form>
    </ProfileEditorModal>
  );
};

export default BirthDateEditModal;
