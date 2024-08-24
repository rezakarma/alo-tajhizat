import AddSettingProduct from "@/app/admin/product/addProductSettings/AddSettingProduct";
import DropDown from "@/app/admin/product/addProduct/addProductFrom/dropDown/DropDown";
import { useEffect, useReducer, useTransition } from "react";
import {z} from "zod"
import { addProductSettingAdminSchema } from '@/schema/index'
import GetProductBrand from "@/data/products/getProductBrands";
import GetProductGategory from "@/data/products/getProductGategory";
import { toast } from "sonner";
import GetCategoryTypes from "@/data/products/getCategoryTypes";
import TypeList from "./categoryTypeList/typeList";
const initialState = {
  categoryList: [],
  newCategory:null,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY_LIST":
      return { ...state, categoryList: action.payload };
    case "SET_NEW_CATEGORY":
      return { ...state, newCategory: action.payload };
    case "SET_ERROR":
        return { ...state , error: action.payload }
    default:
      return state;
  }
};
const AddTypeProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchBrands = async () => {
        const category = await GetProductGategory();
        dispatch({ type: "SET_CATEGORY_LIST", payload: category})
    }
    fetchBrands()
  },[])
  
  // useEffect(() => {
  //   const fetchCategoryTypes =async () => {
  //     const categoryTypes = await GetCategoryTypes(state.newCategory);
  //     console.log('categoryTypes ', categoryTypes)
  //     return categoryTypes
  //   }
  //   if(state.newCategory !== '' && state.newCategory !== null) {
  //     fetchCategoryTypes()
  //   }
  // },[state.newCategory])
  
  const sendProductType = async(data) => {
    try{const result = await fetch('/api/productType', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(!result.ok) {
        toast.error("در ارتباط با سرور مشکلی پیش امده است")
        return
    }
    const response = await result.json()
    console.log(response)
    if(response.success) {
        toast.success(response.success)
        return
    }else if(response.error) {
        toast.error(response.error)
        return
    } }catch(error) {
        toast.error("در هنگام ثبت نوع محصول خطایی رخ داده است لطفا در زمانی دیگر تلاش کنید")
    }
  }

  const onSubmit = (value: z.infer<typeof addProductSettingAdminSchema>) => {
    if(state.newCategory === ''){
        toast.error("لطفا ابتدا یک دسته بندی انتخاب کنید")
        dispatch({ type:"SET_ERROR", payload: { message: "لطفا ابتدا یک دسته بندی انتخاب کنید" } })
        return
    }
    const values = {
        id: state.newCategory,
        ...value
    }
    startTransition(async ()=>{
        console.log(values)
        await sendProductType(values);
    })
  }
  return (
    <>
      <DropDown
        onChange={(e) => {
          dispatch({
            type: "SET_NEW_CATEGORY",
            payload: e.target.value,
          });
          dispatch({
            type: "SET_ERROR",
            payload: '',
          });
        }}
        placeholder="لطفا دسته بندی مورد نظر را انتخاب کنید"
        value={state.newCategory}
        englishValueExtractor={(option) => option.englishCategory}
        persianValueExtractor={(option) => option.persianCategory}
        label="دسته بندی"
        //   error={errors.category}
        options={state.categoryList}
        isPending={isPending}
        error={state.error}
      />
      <AddSettingProduct
        title="اضافه کردن نوع محصول"
        onSubmitHandler={onSubmit}
      />
      <TypeList id={state.newCategory}/>
    </>
  );
};

export default AddTypeProduct;
