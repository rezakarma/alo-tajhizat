"use client";
import { toast } from 'sonner'
import { useReducer } from "react";
import AddSettingProduct from "./AddSettingProduct";
import BrandList from './brandList/brandList'
import CategoryList from './categoryList/categoryList';
import  AddTypeProduct from './addTypeProduct'
const initialState = {
  // persianBrand:"",
  // englishBrand:"",
  // persianCategory:"",
  // englishCategory:"",
  formValue: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VAlUE":
      return { ...state, formValue: action.payload };
    // case "PERSIAN_BRAND":
    //     return {...state , persianBrand:action.payload};
    // case "ENGLISH_BRAND":
    //     return {...state , englishBrand:action.payload};
    // case "PERSIAN_CATEGORY":
    //     return {...state , persianCategory:action.payload};
    // case "ENGLISH_CATEGORY":
    //     return {...state , englishCategory:action.payload}
  }
};
const AddProductSetting = () => {
  const [state, dispatch] = useReducer(reducer, initialState);



const addBrandHandler =async (value) => {


    try {
      const result =await fetch('/api/productBrand',{
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(value)
      })
      if(!result.ok) {
        return console.log(result);
      }
      const response = await result.json()
      if(response.success) {
        return toast.success(response.success)
      }else if(response.error) {
        return toast.error(response.error)
      }
      
    } catch(error) {
      return toast.error('خطایی رخ داده لطفا بعدا مجدد تلاش کنید')
    }
  }

  const addCategoryHandler =async (value) => {


    try {
      const result =await fetch('/api/productCategory',{
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(value)
      })
      if(!result.ok) {
        return console.log(result);
      }
      const response = await result.json()
      if(response.success) {
        return toast.success(response.success)
      }else if(response.error) {
        return toast.error(response.error)
      }
      
    } catch(error) {
      return toast.error('خطایی رخ داده لطفا بعدا مجدد تلاش کنید')
    }
  }
  
  return (
    <div className="w-9/12 mx-auto  flex flex-col rounded-3xl m-20 shadow-2xl">
      <AddSettingProduct
        title="اضافه کردن برند"
        onSubmitHandler={addBrandHandler}
     
      />
      <AddSettingProduct
        title="اضافه کردن دسته بندی"
        onSubmitHandler={addCategoryHandler}

      />
      <AddTypeProduct/>
      <div className='flex flex-col w-full'>
      <BrandList/>
      <CategoryList/>
      </div>
      
    </div>
  );
};

export default AddProductSetting;
