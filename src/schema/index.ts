import z, { boolean, string } from "zod";
import validator from "validator";
import { current } from "@reduxjs/toolkit";
import { Phone } from "lucide-react";
import { DeliveryTime, DeliveryType } from "@prisma/client";

export const loginSchemaWithNumber = z.object({
  password: z.string().min(1, { message: "رمزعبور الزامی است" }),
  phoneNumber: z
    .string()
    .min(1, { message: " شماره موبایل الزامی است" })
    .refine(
      (val) => validator.isMobilePhone(val, ["fa-IR"]),
      (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
    ),
});

export const loginSchemaWithUsername = z.object({
  userName: z.string(),
  password: z.string(),
});

export const signupSchema = z
  .object({
    userName: z
      .string()
      .min(4, { message: "نام کاربری باید حداقل 4 کاراکتر باشد" }),
    identifier: z.string(),
    phoneNumber: z
      .string()
      .min(10, { message: "تعداد ارقام وارده کم است" })
      .refine(
        (val) => validator.isMobilePhone(val, ["fa-IR"]),
        (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
      ),
    email: z
      .string()
      .min(1, { message: "ایمیل الزامی است" })
      .email({ message: "لطفا یک ایمیل معتبر وارد کنید" }),
    password: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
    confirmPassword: z.string().min(8).max(32),
    TOSAgreement: z.boolean().refine(Boolean, {
      message: "موافقت خود را با قوانین و مقررات تایدد کنید",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "رمزعبور یکی نیست",
      });
    }
  });

export const signupClientSchema = z
  .object({
    userName: z
      .string()
      .min(4, { message: "نام کاربری باید حداقل 4 کاراکتر باشد" }),

    phoneNumber: z
      .string()
      .min(10, { message: "تعداد ارقام وارده کم است" })
      .refine(
        (val) => validator.isMobilePhone(val, ["fa-IR"]),
        (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
      ),
    email: z
      .string()
      .min(1, { message: "ایمیل الزامی است" })
      .email({ message: "لطفا یک ایمیل معتبر وارد کنید" }),
    password: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
    confirmPassword: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
    TOSAgreement: z.boolean().refine(Boolean, {
      message: "موافقت خود را با قوانین و مقررات تایدد کنید",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "رمزعبور یکی نیست",
      });
    }
  });

export const signupVerificationSchema = z.object({
  identifier: z.string(),
  ipAddress: z.string(),
  phoneNumber: z
    .string()
    .min(1, { message: " شماره موبایل الزامی است" })
    .refine(
      (val) => validator.isMobilePhone(val, ["fa-IR"]),
      (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
    ),
  email: z.string().email(),
  userName: z.string(),
});

export const verifyCodeSchema = z.object({
  identifier: z.string(),
  code: z.string(),
  phoneNumber: z
    .string()
    .min(1, { message: " شماره موبایل الزامی است" })
    .refine(
      (val) => validator.isMobilePhone(val, ["fa-IR"]),
      (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
    ),
});

export const verifyCodeChangeSchema = z.object({
  userId: z.string(),
  code: z.string(),
  phoneNumber: z
    .string()
    .min(1, { message: " شماره موبایل الزامی است" })
    .refine(
      (val) => validator.isMobilePhone(val, ["fa-IR"]),
      (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
    ),
});

export const addProductAdminSchema = z.object({
  title: z
    .string()
    .min(1, { message: "نام محصول الزامی است" })
    .refine(
      (val) => val.length > 2,
      (val) => ({ message: `${val} نام محصول را کامل واردکنید` })
    ),
  description: z.string().min(1, { message: "توضیحات محصول الزامی است" }),
  model: z
    .string()
    .min(1, { message: "مدل الزامی است" })
    .superRefine((value, context) => {
      if (!englishAlphabet.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ققط کلمات انگلیسی وارد کنید",
        });
      }
    }),
  // productImage: z.array(z.string()),
  sellCheckbox: z.boolean().optional(),
  rentCheckbox: z.boolean().optional(),
  sellPrice: z.string().optional(),
  rentPrice: z.string().optional(),
  brand: z.string().min(1, { message: "انتخاب برند الزامی است" }),
  category: z.string().min(1, { message: "انتخاب دسته بندی الزامی است" }),
  type: z.string().min(1, { message: "انتخاب نوع الزامی است" }),
  details: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});

const supplyType = z.enum(["SELL", "RENT", "SELL_RENT"]).refine(
  (value) => {
    if (!["SELL", "RENT", "SELL_RENT"].includes(value)) {
      return false;
    }
    return true;
  },
  {
    message:
      "نوع تامین محصول باید یکی از گزینه های زیر باشد: SELL, RENT, SELL_RENT",
  }
);
type SupplyType = z.infer<typeof supplyType>;

export const newProductSchema = z.object({
  title: z.string().min(1, { message: "نام محصول الزامی است" }),
  description: z.string().min(1, { message: "توضیحات محصول الزامی است" }),
  productImage: z
    .array(z.string())
    .min(1, { message: "لطفا حداقل یک عکس برای محصول اپلود کنید" }),
  model: z
    .string()
    .min(1, { message: "مدل الزامی است" })
    .superRefine((value, context) => {
      if (!englishAlphabet.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ققط کلمات انگلیسی وارد کنید",
        });
      }
    }),
  sellPrice: z.string().optional(),
  rentPrice: z.string().optional(),
  supplyType: supplyType,
  brand: z.string().min(1, { message: "انتخاب برند الزامی است" }),
  category: z.string().min(1, { message: "انتخاب دسته بندی الزامی است" }),
  type: z.string().min(1, { message: "انتخاب نوع الزامی است" }),
  details: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});

export const userExistCheckSchema = z.object({
  email: z.string().email().optional(),
  phoneNumber: z
    .string()
    .min(1, { message: " شماره موبایل الزامی است" })
    .refine(
      (val) => validator.isMobilePhone(val, ["fa-IR"]),
      (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
    )
    .optional(),
  userName: z.string().optional(),
});

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "ایمیل الزامی است" })
    .email({ message: "لطفا یک ایمیل معتبر وارد کنید" }),
  identifier: z.string(),
  ipAddress: z.string(),
  // lastPassword: z.string().min(1, {message: "رمز عبور الزامی است"}).max(32, {message: "رمزعبور باید کمتر از 32 کاراکتر باشد"}),
});

export const forgetPasswordClientchema = z.object({
  email: z
    .string()
    .min(1, { message: "ایمیل الزامی است" })
    .email({ message: "لطفا یک ایمیل معتبر وارد کنید" }),
});

export const newPasswordClientSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
    confirmPassword: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "رمزعبور یکی نیست",
      });
    }
  });

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
    confirmPassword: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "رمزعبور یکی نیست",
      });
    }
  });

export const profileClientSchema = z.object({
  nationalCode: z.string().min(1, { message: "کد ملی الزامی است" }),
  // birthDate: z.date({
  //   required_error: "لطفا یک تاریخ تولد انتخاب کنید",
  //   invalid_type_error: "لطفا یک تاریخ معتبر وارد کنید",
  // }),
  // birthDate: z.string().datetime({message:"لطفا یک تاریخ تولد انتخاب کنید"}),
  birthDate: z.string().min(1, { message: "لطفا یک تاریخ تولد انتخاب کنید" }),
  job: z.string().optional(),
  landlineNumber: z
    .string()
    .min(10, {
      message: "لطفا یک شماره تلفن  ثابت معتبر همراه با کد استان وارد کنید",
    })
    .max(11, { message: "لطفا یک شماره تلفن  ثابت معتبر وارد کنید" }),
  fatherName: z
    .string()
    .min(3, { message: "نام پدر الزامی است" })
    .max(32, { message: "این نام معتبر نیست" }),
  photoWithIDCard: z.string().optional(),
  firstName: z
    .string()
    .min(3, { message: "لطفا یک اسم معتبر وارد کنید" })
    .max(32, {
      message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
    }),
  lastName: z
    .string()
    .min(2, { message: "لطفا یک اسم معتبر وارد کنید" })
    .max(50, {
      message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
    }),
  profileImage: z.string().optional(),
});

export const profileSchema = z.object({
  email: z.string().email(),
  id: z.string(),
  nationalCode: z.string().min(1, { message: "کد ملی الزامی است" }),
  birthDate: z.object({
    birthDate: z.string(),
    solarBirthDate: z.string(),
    ISO8601BirthDate: z.string(),
  }),
  job: z.string().optional(),
  landlineNumber: z
    .string()
    .min(10, {
      message: "لطفا یک شماره تلفن  ثابت معتبر همراه با کد استان وارد کنید",
    })
    .max(11, { message: "لطفا یک شماره تلفن  ثابت معتبر وارد کنید" }),
  fatherName: z
    .string()
    .min(3, { message: "نام پدر الزامی است" })
    .max(32, { message: "این نام معتبر نیست" }),
  photoWithIDCard: z.string().optional(),
  firstName: z
    .string()
    .min(3, { message: "لطفا یک اسم معتبر وارد کنید" })
    .max(32, {
      message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
    }),
  lastName: z
    .string()
    .min(2, { message: "لطفا یک اسم معتبر وارد کنید" })
    .max(50, {
      message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
    }),
  profileImage: z.string().optional(),
});

const englishAlphabet = /[a-zA-Z]/;
const farsiAlphabet = /[\u0600-\u06FF]/;

export const addProductSettingAdminSchema = z.object({
  persianName: z
    .string()
    .min(2, { message: "نام فارسی الزامی است" })
    .superRefine((value, context) => {
      if (!farsiAlphabet.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "فقط کلمات فارسی وارد کنید",
        });
      }
    }),

  englishName: z
    .string()
    .min(2, { message: "نام انگلیسی الزامی است" })
    .superRefine((value, context) => {
      if (!englishAlphabet.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ققط کلمات انگلیسی وارد کنید",
        });
      }
    }),
});

export const addProductSettingAdminWithIdSchema = z.object({
  id: z.string(),
  persianName: z
    .string()
    .min(2, { message: "نام فارسی الزامی است" })
    .superRefine((value, context) => {
      if (!farsiAlphabet.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "فقط کلمات فارسی وارد کنید",
        });
      }
    }),

  englishName: z
    .string()
    .min(2, { message: "نام انگلیسی الزامی است" })
    .superRefine((value, context) => {
      if (!englishAlphabet.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ققط کلمات انگلیسی وارد کنید",
        });
      }
    }),
});

export const contactUsForm = z.object({
  name: z.string().min(3, { message: "لطفا یک اسم معتبر وارد کنید" }).max(32, {
    message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "تعداد ارقام وارده کم است" })
    .refine(
      (val) => validator.isMobilePhone(val, ["fa-IR"]),
      (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
    ),
  email: z
    .string()
    .min(1, { message: "ایمیل الزامی است" })
    .email({ message: "لطفا یک ایمیل معتبر وارد کنید" }),
  description: z.string().min(1, { message: "توضیحات الزامی است" }),
});

export const notifications = z.object({
  title: z.string(),
  description: z.string(),
  details: z.string(),
});

export const editPhoneNumber = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: " شماره موبایل الزامی است" })
    .refine(
      (val) => validator.isMobilePhone(val, ["fa-IR"]),
      (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
    ),
  id: z.string(),
});

export const editEmail = z.object({
  email: z.string().email({ message: "لطفا یک ایمیل معتبر وارد کنید" }),
  id: z.string(),
});

export const editUserName = z.object({
  userName: z
    .string()
    .min(4, { message: "نام کاربری باید حداقل 4 کاراکتر باشد" }),
  id: z.string(),
});

export const editLandlineNumber = z.object({
  landlineNumber: z
    .string()
    .min(10, {
      message: "لطفا یک شماره تلفن  ثابت معتبر همراه با کد استان وارد کنید",
    })
    .max(11, { message: "لطفا یک شماره تلفن  ثابت معتبر وارد کنید" }),
  id: z.string(),
});

export const editIdentity = z.object({
  id: z.string(),
  nationalCode: z.string().min(1, { message: "کد ملی الزامی است" }),
  fatherName: z
    .string()
    .min(3, { message: "نام پدر الزامی است" })
    .max(32, { message: "این نام معتبر نیست" }),
  firstName: z
    .string()
    .min(3, { message: "لطفا یک اسم معتبر وارد کنید" })
    .max(32, {
      message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
    }),
  lastName: z
    .string()
    .min(2, { message: "لطفا یک اسم معتبر وارد کنید" })
    .max(50, {
      message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
    }),
});

export const editPassword = z
  .object({
    id: z.string(),
    currentPassword: z.string(),
    password: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
    confirmPassword: z
      .string()
      .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
      .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "رمزعبور یکی نیست",
      });
    }
  });

export const editJob = z.object({
  job: z.string().min(1, { message: "شغل الزامی است" }),
  id: z.string(),
});

export const editBirthdate = z.object({
  birthDate: z.string().min(1, { message: "لطفا یک تاریخ تولد انتخاب کنید" }),
  id: z.string(),
});

export const editProfileImage = z.object({
  profileImage: z.string(),
  id: z.string(),
});

export const editPhotoWithIDCard = z.object({
  photoWithIDCard: z.string(),
  id: z.string(),
});

export const patchUser = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  currentEmail: z.string().email().optional(),
  phoneNumber: z
    .string()
    .min(1, { message: " شماره موبایل الزامی است" })
    .refine(
      (val) => validator.isMobilePhone(val, ["fa-IR"]),
      (val) => ({ message: `${val} این شماره معتبر نمی باشد` })
    )
    .optional(),
  userName: z
    .string()
    .min(4, { message: "نام کاربری باید حداقل 4 کاراکتر باشد" })
    .optional(),
  password: z
    .object({
      currentPassword: z.string(),
      password: z
        .string()
        .min(8, { message: "رمزعبور باید بیشتر از 8 کاراکتر باشد" })
        .max(32, { message: "رمزعبور باید کمتر از 32 کاراکتر باشد" }),
      confirmPassword: z.string().min(8).max(32),
    })
    .optional(),
});

export const patchProfile = z.object({
  names: z
    .object({
      nationalCode: z.string().min(1, { message: "کد ملی الزامی است" }),
      fatherName: z
        .string()
        .min(3, { message: "نام پدر الزامی است" })
        .max(32, { message: "این نام معتبر نیست" }),
      firstName: z
        .string()
        .min(3, { message: "لطفا یک اسم معتبر وارد کنید" })
        .max(32, {
          message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
        }),
      lastName: z
        .string()
        .min(2, { message: "لطفا یک اسم معتبر وارد کنید" })
        .max(50, {
          message: "این اسم خیلی طولانی است ، لطفا یک اسم معتبر وارد کنید",
        }),
    })
    .optional(),
  birthDate: z
    .object({
      birthDate: z.string(),
      solarBirthDate: z.string(),
      ISO8601BirthDate: z.string(),
    })
    .optional(),
  job: z.string().optional(),
  landlineNumber: z
    .string()
    .min(10, {
      message: "لطفا یک شماره تلفن  ثابت معتبر همراه با کد استان وارد کنید",
    })
    .max(11, { message: "لطفا یک شماره تلفن  ثابت معتبر وارد کنید" })
    .optional(),
  photoWithIDCard: z.string().optional(),
  profileImage: z.string().optional(),
});

export const productCategoryIds = z.object({
  categoryIds: z.array(z.string().optional()),
});

const cartActonType = z.enum(["ADD", "REMOVE"]).refine(
  (value) => {
    if (!["ADD", "REMOVE"].includes(value)) {
      return false;
    }
    return true;
  },
  { message: "نوع اکشنسبد خرید باید یکی از این گزینه ها باشد : ADD , REMOVE" }
);

export const cartSchema = z.object({
  actionType: cartActonType,
  productId: z
    .string()
    .min(1, { message: "لطفا یک شناسه ی محصول ارائه دهدید" }),
});

export const addressSchema = z.object({
  name: z.string().min(1, { message: "لطفا یک نام برای این آدرس انتخاب کنید" }),
  address: z.string().min(1, { message: "لطفا یک ادرس وارد کنید" }),
  plate: z.string().optional(),
  bldName: z.string().optional(),
  floor: z.string().optional(),
  unit: z.string().optional(),
  city: z.string().min(1, { message: "لطفا یکا شهر انتخاب کنید" }),
  province: z.string().min(1, { message: "لطفا یک استان انتخاب کنید" }),
  postalCode: z.string().min(1, { message: "لطفا یککد پستی معتبر وارد کنید" }),
  coordinate: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

const DeliveryTypeSchema = z.nativeEnum(DeliveryType).refine(
  (value) => {
    if (
      !Object.values(DeliveryType).includes(value) ||
      value === null ||
      value === undefined
    ) {
      return false;
    }
    return true;
  },
  {
    message:
      "نوع تامین محصول باید یکی از گزینه های زیر باشد: تحویل شخصی، ارسال",
  }
);

const DeliveryTimeSchema = z.nativeEnum(DeliveryTime).refine(
  (value) => {
    if (
      !Object.values(DeliveryTime).includes(value) ||
      value === null ||
      value === undefined
    ) {
      return false;
    }
    return true;
  },
  {
    message: "زمان ارسال محصول باید یکی از گزینه های زیر باشد: شب، بعد از ظهر",
  }
);

export const orderSettingSchema = z.object({
  deliveryTime: DeliveryTimeSchema,
  deliveryType: DeliveryTypeSchema,
  addressId: z.string().min(1,{message: "لطفا یک آدرس انتخاب کنید"}),
  description: z
    .string()
    .max(300, { message: "توضیحات باید حداکثر 300 نویسه باشد" })
    .optional(),
});
