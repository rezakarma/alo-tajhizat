"use client";
import { useEffect, useReducer, useState, useTransition } from "react";
import { Button } from "@nextui-org/react";
import ModalDetails from "./ModalDetails";
import DragAndDropImage from "./ProductImage/dragAndDropImage";
import InputFormProduct from "./InputFormProduct";
import DropDown from "./dropDown/DropDown";
import { dropdownOptions } from "./dropDown/data";
import GetProduct from "@/data/products/getProduct";
import ProductSupplyType from "./ProductSupplyType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductAdminSchema } from "@/schema/index";
import GetProductBrand from "@/data/products/getProductBrands";
import GetProductGategory from "@/data/products/getProductGategory";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import UploadProductImages from "@/app/utils/uploadProductImages";
import { stringify } from "postcss";
import EditProductImage from "../../editProduct/editProductImage";
import { isError } from "@sentry/utils";
import GetCategoryTypes, { typeOfRequest } from "@/data/products/getCategoryTypes";
const initialState = {
  newCategory: "",
  newBrand: "",
  newType: "",
  brandList: [],
  categoryList: [],
  typeList: [],
  productImages: [],
  productImagesKeys: [],
  editedProductImage: [],
  sellChecked: false,
  rentChecked: false,
  formValue: null,
  isLoading: true,
  isLoadingType: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VAlUE":
      return { ...state, formValue: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_NEW_CATEGORY":
      return { ...state, newCategory: action.payload };
    case "SET_NEW_BRAND":
      return { ...state, newBrand: action.payload };
    case "SET_NEW_TYPE":
      return { ...state, newType: action.payload };
    case "SET_CATEGORY_LIST":
      return { ...state, categoryList: action.payload };
    case "SET_BRAND_LIST":
      return { ...state, brandList: action.payload };
    case "SET_TYPE_LIST":
      return { ...state, typeList: action.payload };
    case "SET_PRODUCT_IMAGES_KEY":
      return { ...state, productImagesKeys: action.payload };
    case "SET_EDITED_PRODUCT_IMAGES":
      return { ...state, editedProductImage: action.payload };
    case "TOGGLE_SELL":
      return { ...state, sellChecked: !state.sellChecked };
    case "TOGGLE_RENT":
      return { ...state, rentChecked: !state.rentChecked };
    case "SET_SELL":
      return { ...state, sellChecked: action.payload };
    case "SET_RENT":
      return { ...state, rentChecked: action.payload };
    case "SET_TYPE_LOADING":
      return { ...state, isLoadingType: action.payload  }
    default:
      return state;
  }
};

const AddProductForm = (props) => {
  const [previewImages, setPreviewImages] = useState([]);

  const [images, setImages] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState([{ title: "", description: "" }]);
  const [isPending, startTransition] = useTransition();
  // const [isLoadingType, setIsLoadingType] = useState(false);
  useEffect(() => {
    const getProduct = async () => {
      const product = await GetProduct(props.productId);
      console.log("here2 :", product);
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("model", product.model);
      if (product.supplyType === "SELL") {
        setValue("sellCheckbox", true);
        setValue("rentCheckbox", false);
        dispatch({ type: "SET_SELL", payload: true });
        dispatch({ type: "SET_RENT", payload: false });
      } else if (product.supplyType === "RENT") {
        setValue("sellCheckbox", false);
        setValue("rentCheckbox", true);
      } else if (product.supplyType === "SELL_RENT") {
        setValue("sellCheckbox", true);
        setValue("rentCheckbox", true);
      }
      setValue("sellPrice", product.sellPrice);
      setValue("rentPrice", product.rentPrice);
      setValue("description", product.description);
      setValue("description", product.description);
      setValue("description", product.description);
      setValue("brand", product.brandId);
      setValue("category", product.categoryId);
      setValue("type", product.typeId);
      setValue("details", product.details);
      dispatch({ type: "SET_NEW_BRAND", payload: product.brandId });
      dispatch({ type: "SET_NEW_CATEGORY", payload: product.categoryId });
      dispatch({ type: "SET_NEW_TYPE", payload: product.typeId });
      setData(product.details);
      dispatch({ type: "SET_PRODUCT_IMAGES_KEY", payload: product.images });
      if (product.id) {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    if (props.productId) {
      getProduct();
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }

    const getProductBrandandCategory = async () => {
      const brand = await GetProductBrand();
      const category = await GetProductGategory();
      console.log(brand);
      console.log(category);
      dispatch({ type: "SET_CATEGORY_LIST", payload: category });
      dispatch({ type: "SET_BRAND_LIST", payload: brand });
    };
    getProductBrandandCategory();
  }, []);

  useEffect(()=> {
    const getProductCategoryTypes = async ()=> {
      // setIsLoadingType(true)
      dispatch({ type: "SET_TYPE_LOADING" , payload: true })
        const categoryTypes =await GetCategoryTypes(state.newCategory, typeOfRequest.single)
        
        dispatch({ type: "SET_TYPE_LIST", payload: categoryTypes });
        // setIsLoadingType(false)
      dispatch({ type: "SET_TYPE_LOADING" , payload: false })
      };
      
      if(state.newCategory !== '') {
        getProductCategoryTypes()
      }
      
    
  },[state.newCategory])

  // const getSupplyType = () => {
  //   if (state.sellChecked && state.rentChecked) {
  //     return "SELL_RENT";
  //   } else if (state.sellChecked && !state.rentChecked) {
  //     return "SELL";
  //   } else if (state.rentChecked && !state.sellChecked) {
  //     return "RENT";
  //   }
  // };
  const getSupplyType = (value) => {
    if (value.sellCheckbox && value.rentCheckbox) {
      return "SELL_RENT";
    } else if (value.sellCheckbox && !value.rentCheckbox) {
      return "SELL";
    } else if (value.rentCheckbox && !value.sellCheckbox) {
      return "RENT";
    }
  };

  const handleFileChange = (e) => {
    console.log(e);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const image = URL.createObjectURL(file);
      setPreviewImages((oldState) => [...oldState, image]);
    } else {
      return;
    }
  };

  const setEditedProductImage = (data) => {
    dispatch({ type: "SET_EDITED_PRODUCT_IMAGES", payload: data });
  };

  const setProductImagesKeys = (data) => {
    dispatch({ type: "SET_PRODUCT_IMAGES_KEY", payload: data });
  };

  const imageDeleteHandler = (img) => {
    const updatedState = images.filter((item) => item[1] !== img);
    setImages(updatedState);
  };

  const imageUpdatedDeleteHandler = (img) => {
    const updatedState = images.filter((item) => item[1] !== img);
    setImages(updatedState);
  };

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductAdminSchema),
    defaultValues: {
      title: "",
      description: "",
      model: "",
      sellCheckbox: false,
      rentCheckbox: false,
      sellPrice: "0",
      rentPrice: "0",
      brand: "",
      category: "",
      type: "",
      details: [],
      // detailsTitle: "",
      // detailsDescription: "",
    },
  });

  const resetForm = () => {
    reset();
    dispatch({ type: "SET_VAlUE", payload: null });
    dispatch({ type: "SET_NEW_CATEGORY", payload: "" });
    dispatch({ type: "SET_NEW_BRAND", payload: "" });
    dispatch({ type: "SET_NEW_TYPE", payload: "" });
    dispatch({ type: "SET_PRODUCT_IMAGES_KEY", payload: [] });
    setImages([]);
    setPreviewImages([]);
    setData([{ title: "", description: "" }]);
  };

  // const uploadFile = async (image, folder) => {
  //   console.log('run 2')

  //   // const result =await uploadImage(image[0])
  //   // console.log(result)
  //   const formData = new FormData();
  //   formData.append("file", image[0]);
  //   formData.append("folder", folder);
  //   try {
  //     const result = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (result.ok) {
  //       const response = await result.json();
  //       if (response.error) {
  //         console.log(response.error);
  //         // dispatch({
  //         //   type: "SET_ERROR",
  //         //   payload:
  //         //     "در هنگام بارگذاری عکس ها مشکلی پیش امده است ، لطفا مجدد تلاش کنید",
  //         // });
  //         toast.error("در هنگام بارگذاری عکس ها مشکلی پیش امده است ، لطفا مجدد تلاش کنید")
  //         return;
  //       } else if (response.success) {
  //         console.log(response.success);
  //         // dispatch({ type: "SET_SUCCESS", payload: "عکس ها بارگذاری شداند" });
  //         return response;
  //       }
  //     } else {
  //       // dispatch({
  //       //   type: "SET_ERROR",
  //       //   payload: "در ارتباط با سرور خطایی رخ داده است لطفا مجدد تلاش کنید",
  //       // });
  //       toast.error("در ارتباط با سرور خطایی رخ داده است لطفا مجدد تلاش کنید")
  //       console.log(result);
  //       return;
  //     }
  //   } catch (error) {
  //     // dispatch({
  //     //   type: "SET_ERROR",
  //     //   payload:
  //     //     "در بارگذاری عکس ها خطایی رخ داده است لطفا بعدا مجدد تلاس کنید",
  //     // });
  //     toast.error("در ارتباط با سرور خطایی رخ داده است لطفا مجدد تلاش کنید")

  //   }
  // };

  const uploadImage = async (images, imageKey, folder, setKey) => {
    console.log("run 1");
    if (images.length > 0) {
      console.log("run lenght 0");

      // if (imageKey.length === images.length) {
      //   console.log(imageKey);
      //   return imageKey;
      // }
      // const keys = images.map(async (image,index)=> {
      //   const result = await uploadFile(image, folder);
      // if (result.success && result.result.key) {
      //   // set success
      //   // dispatch({ type: setKey, payload: [...state.imageKeys , result.result.key] });
      //   console.log("result: ",result)
      //   return result.result.key
      // }else{
      //   return false
      // }
      // })

      // const keys = await Promise.all(
      //   images.map((image, index) => {
      //     return uploadFile(image, folder).then((result) => {
      //       if (result.success && result.result.key) {
      //         console.log("result: ", result);
      //         return result.result.key;
      //       } else {
      //         throw new Error("Upload failed"); // or return null, or whatever you want to do on failure
      //       }
      //     });
      //   })
      // );
      const existKey = "";
      const keys = await Promise.all(
        images.map(async (image, index) => {
          const result = await UploadProductImages(image, folder, existKey);
          if (result.success && result.result.key) {
            console.log("result: ", result);
            toast.success(`عکس ${index} با موفقیت اپلود شد`);
            return result.result.key;
          } else {
            console.error("Upload failed for image at index", index);
            toast.error(`عکس ${index} اپلود نشد`);
            return null;
          }
        })
      );
      dispatch({
        type: setKey,
        payload: [...state.productImagesKeys, ...keys],
      });
      return keys;
    } else {
      console.log("run return imageKey", imageKey);

      return [];
    }
  };

  const uploadEditedImage = async (images, folder) => {
    console.log("run uploadEditedImage");
    console.log(images)
    console.log(state.productImagesKeys)
    if (images.length > 0) {
      // if (imageKey.length === images.length) {
      //   console.log(imageKey);
      //   return imageKey;
      // }
      console.log("updated images", images);
      const keys = await Promise.all(
        images.map(async (image, index) => {
          const result = await UploadProductImages(image, folder, image[1]);
          console.log("result: ", result);

          if (result.success && result.result.key) {
            toast.success(`عکس ${index} با موفقیت اپلود شد`);
            return result.result.key;
          } else {
            console.error("Upload failed for image at index", index);
            toast.error(`عکس ${index} اپلود نشد`);
            return null;
          }
        })
      );
      return true;
    } else {
      return [];
    }
  };

  const addProduct = async (value) => {
    try {
      const result = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (!result.ok) {
        return {
          error: "مشکلی در ارتباط با سرور وجود دارد، لطفا بعدا امتحان کنید",
        };
      }
      const response = await result.json();
      return response;
    } catch (error) {
      return { error: "خطایی رخ داده است لطفا در زمال دیگری تلاش کنید" };
    }
  };

  const updateProduct = async (value) => {
    console.log("run updateProduct");
    try {
      console.log("run updateProduct 2");

      const result = await fetch(`/api/products/${props.productId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (!result.ok) {
        return {
          error: "مشکلی در ارتباط با سرور وجود دارد، لطفا بعدا امتحان کنید",
        };
      }
      const response = await result.json();
      setImages([])
      return response;
    } catch (error) {
      return { error: "خطایی رخ داده است لطفا در زمال دیگری تلاش کنید" };
    }
  };

  const onSubmit = async (value) => {
    startTransition(async () => {
      console.log(value);
      const supplyType = getSupplyType(value);
      console.log("before", supplyType);

      const productImageKey = await uploadImage(
        images,
        state.productImagesKeys,
        "products",
        "SET_PRODUCT_IMAGES_KEY"
      );
      console.log("after", [...state.productImagesKeys, ...productImageKey]);

      delete value.rentCheckbox;
      delete value.sellCheckbox;
      const productValue = {
        ...value,
        supplyType: supplyType,
        productImage: [...state.productImagesKeys, ...productImageKey],
      };
      if (props.productId) {
        console.log("here run");
        const updateimage = await uploadEditedImage(
          state.editedProductImage,
          ""
        );
        const updatedProduct = await updateProduct(productValue);
        console.log("result of :", updatedProduct);
        if (updatedProduct.success) {
          toast.success(updatedProduct.success);
        } else if (updatedProduct.error) {
          toast.error(updatedProduct.error);
        } else if (Array.isArray(updatedProduct)) {
          updatedProduct.map((item) => {
            toast.error(item.message);
          });
        }
      } else {
        const sendProduct = await addProduct(productValue);
        if (sendProduct.success) {
          toast.success(sendProduct.success);
          resetForm();
        } else if (sendProduct.error) {
          toast.error(sendProduct.error);
        }
      }
      return;
    });
  };

  const setDetails = (data) => {
    setValue("details", data);
  };

  return (
    <>
      {state.isLoading && <p>Loading...</p>}
      {!state.isLoading && (
        <form
          className="bg-white m-5 p-6 rounded-2xl drop-shadow-2xl dark:bg-slate-600 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl font-bold ">جزییات محصول</h2>
          <div>
            <div>
              <InputFormProduct
                state={state}
                dispatch={dispatch}
                prodTitle="title"
                prodDescription="description"
                prodModel="model"
                register={register}
                errors={errors}
                product={""}
                isPending={isPending}
              />
              <hr />
              <ProductSupplyType
                sellCheckbox="sellCheckbox"
                rentCheckbox="rentCheckbox"
                productPriceRent="rentPrice"
                productPriceSell="sellPrice"
                stateSell={state.sellChecked}
                stateRent={state.rentChecked}
                register={register}
                errors={errors}
                dispatch={dispatch}
                isPending={isPending}
              />
              <hr />
              <div className="flex flex-col xl:flex-row m-7 gap-20">
                {/* {dropdownOptions.map((dropdown, index) => (
              <DropDown
                onChange={(e) =>
                  dispatch({ type: dropdown.dispatch, payload: e.target.value })
                }
                key={index}
                label={dropdown.label}
                options={dropdown.options}
              />
            ))} */}
                <DropDown
                  onChange={(e) => {
                    dispatch({
                      type: "SET_NEW_BRAND",
                      payload: e.target.value,
                    });
                    setValue("brand", e.target.value);
                  }}
                  placeholder="لطفا برند مد نظر را انتخاب کنید"
                  value={state.newBrand}
                  englishValueExtractor={(option) => option.englishBrand}
                  persianValueExtractor={(option) => option.persianBrand}
                  label="برند"
                  error={errors.brand}
                  options={state.brandList}
                  isPending={isPending}
                />
                <DropDown
                  onChange={(e) => {
                    dispatch({
                      type: "SET_NEW_CATEGORY",
                      payload: e.target.value,
                    });
                    setValue("category", e.target.value);
                  }}
                  placeholder="لطفا دسته بندی مورد نظر را انتخاب کنید"
                  value={state.newCategory}
                  englishValueExtractor={(option) => option.englishCategory}
                  persianValueExtractor={(option) => option.persianCategory}
                  label="دسته بندی"
                  error={errors.category}
                  options={state.categoryList}
                  isPending={isPending}
                />
                <DropDown
                  onChange={(e) => {
                    dispatch({
                      type: "SET_NEW_TYPE",
                      payload: e.target.value,
                    });
                    setValue("type", e.target.value);
                  }}
                  placeholder="لطفا نوع مورد نظر را انتخاب کنید"
                  value={state.newType}
                  englishValueExtractor={(option) => option.englishType}
                  persianValueExtractor={(option) => option.persianType}
                  label="نوع"
                  error={errors.type}
                  options={state.typeList}
                  isPending={state.newCategory === "" ? true : isPending}
                  isLoading={state.isLoadingType}
                  // isActive={state.newCategory === "" ? true : false}
                />
              </div>
              <hr />
              <ModalDetails
                detailsTitle="detailsTitle"
                detailsDescription="detailsDescription"
                errors={errors}
                data={data}
                setData={setData}
                setDetils={setDetails}
                isPending={isPending}
              />
            </div>
          </div>
          <div className="" onChange={handleFileChange}>
            <DragAndDropImage
              isPending={isPending}
              images={images}
              setImages={setImages}
              imageDeleteHandler={imageDeleteHandler}
              value={previewImages}
              register={register}
              // productImage= "productImage"
            />
          </div>
          {props.productId && (
            <div>
              <EditProductImage
                isPending={state.isLoading}
                images={state.productImagesKeys}
                setImages={setProductImagesKeys}
                setEditedImages={setEditedProductImage}
                editedImages={state.editedProductImage}
                imageDeleteHandler={imageDeleteHandler}
              />
            </div>
          )}

          <Button
            className="bg-primary shadow-xl w-full mt-5 h-12 font-bold rounded-full text-white drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)]  hover:bg-primaryDark hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-300"
            type="submit"
            isLoading={isPending}
            isDisabled={isPending}
          >
            ثبت محصول
          </Button>
        </form>
      )}
    </>
  );
};

export default AddProductForm;
