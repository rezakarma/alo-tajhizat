"use client";
// import { useRouter } from 'next/router'
import { useRouter } from "next/navigation";
import useQueryParams from "@/hooks/useQueryParams";
import { useSearchParams } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import ArrowFilteringSvg from "../../../../../public/assets/equipmentRental/productSection/arrowFilteringSvg";
import { useEffect, useReducer } from "react";
import GetProductGategory from "@/data/products/getProductGategory";
import GetProductBrand from "@/data/products/getProductBrands";
import { Skeleton } from "@nextui-org/skeleton";
import GetProductTypes from "@/data/products/getProductTypes";
import GetCategoryTypes, {
  typeOfRequest,
} from "@/data/products/getCategoryTypes";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { filteringAction } from "@/store/filtering-slice";
import { categoryListAction } from "@/store/categoryList-slice";
import { useNavigate } from "next/navigation";
import Link from "next/link";
const initialState = {
  categoryList: [],
  selectedCategories: [],
  brandList: [],
  selectedBrands: [],
  typeList: [],
  selectedTypes: [],
  isLoding: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGPRY_LIST":
      return { ...state, categoryList: action.payload };
    case "SET_BRAND_LIST":
      return { ...state, brandList: action.payload };
    case "SET_TYPE_LIST":
      return { ...state, typeList: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoding: action.payload };
    case "SET_SELECTED_CATEGORIES":
      return { ...state, selectedCategories: action.payload };
    case "SET_SELECTED_BRANDS":
      return { ...state, selectedBrands: action.payload };
    case "SET_SELECTED_TYPES":
      return { ...state, selectedTypes: action.payload };
    default:
      return state;
  }
};

const FilteringAccording = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const readQuery = useSelector((state) => state.filtering.readQuery);
  const category = useSelector(
    (state) => state.filtering.queryParams.category,
    shallowEqual
  );

  useEffect(() => {
    if (category) {
      dispatch({ type: "SET_SELECTED_CATEGORIES", payload: category });
    }
  }, [category]);

  useEffect(() => {
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const type = searchParams.get("type");
    console.log(category, " searchParamss");
    if (category) {
      const arrayCategory = category.split(",");
      dispatch({ type: "SET_SELECTED_CATEGORIES", payload: arrayCategory });
    }
    if (brand) {
      const arrayBrand = brand.split(",");

      dispatch({ type: "SET_SELECTED_BRANDS", payload: arrayBrand });
    }
    if (type) {
      const arrayType = type.split(",");

      dispatch({ type: "SET_SELECTED_TYPES", payload: arrayType });
      // const commonItems = state.typeList.filter(item => arrayType.includes(item));
      // console.log('type array ', arrayType, " commonitem ", commonItems)
      // if(commonItems.length > 0){
      //   dispatch({ type: "SET_SELECTED_TYPES", payload: commonItems })
      // }
    }
    console.log("test brand ", brand);
  }, [readQuery]);

  // const [setQueryParams, getQueryParams] = useQueryParams()
  // const categoryChangeHandler = (categories) => {
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   newSearchParams.set('category', categories);
  //   window.location.search = newSearchParams.toString();
  //   dispatch({ type: "SET_SELECTED_CATEGORIES", payload: categories });
  // };
  // const router = useRouter();
  const queryParams = useSelector((state) => state.filtering.queryParams);

  const categoryChangeHandler = (categories) => {
    // router.push('/path/to/new/url', {
    //   query: { foo: 'bar' },
    // });

    // router.push({
    //   pathname: router.pathname,
    //   query: {...router.query, newParam: 'newValue' },
    // });

    // router.push(router.basePath + router.pathname + `?newParam=newValue`);

    reduxDispatch(
      filteringAction.updateQueryParams({ key: "category", value: categories })
    );

    dispatch({ type: "SET_SELECTED_CATEGORIES", payload: categories });
  };

  const brandChangeHandler = (brands) => {
    reduxDispatch(
      filteringAction.updateQueryParams({ key: "brand", value: brands })
    );

    dispatch({ type: "SET_SELECTED_BRANDS", payload: brands });
  };

  const typeChangeHandler = (types) => {
    reduxDispatch(
      filteringAction.updateQueryParams({ key: "type", value: types })
    );

    dispatch({ type: "SET_SELECTED_TYPES", payload: types });
  };

  useEffect(() => {
    const getCtageoryAndBrandList = async () => {
      // dispatch({ type: "SET_IS_LOADING", payload: true });
      const categories = await GetProductGategory();
      const brands = await GetProductBrand();
      const types = await GetProductTypes();
      console.log("types ", types);
      dispatch({ type: "SET_CATEGPRY_LIST", payload: categories });

      reduxDispatch(categoryListAction.setCategoryList(categories));

      dispatch({ type: "SET_BRAND_LIST", payload: brands });
      dispatch({ type: "SET_TYPE_LIST", payload: types });
      // dispatch({ type: "SET_IS_LOADING", payload: false });
    };

    getCtageoryAndBrandList();
  }, []);

  useEffect(() => {
    console.log(state.selectedCategories);
    const updateTypeList = async () => {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      const categoryTypeList = await GetCategoryTypes(
        state.selectedCategories,
        typeOfRequest.multiple
      );
      console.log("categoryTypeList ", categoryTypeList);
      dispatch({ type: "SET_TYPE_LIST", payload: categoryTypeList });
      dispatch({ type: "SET_IS_LOADING", payload: false });
    };
    updateTypeList();
  }, [state.selectedCategories]);

  const checkboxItemClasses = {
    base: "flex gap-3 ",
    label: " hover:text-primaryLight transition-all dark:text-primaryYellow",
  };

  // const categoryChangeHandler = (categories) => {
  //   setUrlParams({ category: categories });
  //   dispatch({ type: "SET_SELECTED_CATEGORIES" , payload: categories })
  // }

  return (
    <Accordion selectionMode="multiple">
      <AccordionItem
        indicator={<ArrowFilteringSvg />}
        key="1"
        aria-label="Accordion 1"
        title="دسته بندی:"
      >
        {state.categoryList.length === 0 && (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        )}
        {state.categoryList.length > 0 && (
          <CheckboxGroup
            value={state.selectedCategories}
            onChange={categoryChangeHandler}
            color="primary"
          >
            {state.categoryList.map((item, index) => (
              <Checkbox
                key={item.id}
                value={item.id}
                classNames={checkboxItemClasses}
              >
                <Link href={`?category=${state.selectedCategories}`}></Link>
                {item.persianCategory}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      </AccordionItem>
      <AccordionItem
        indicator={<ArrowFilteringSvg />}
        key="2"
        aria-label="Accordion 2"
        title="برند:"
      >
        {state.brandList.length === 0 && (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        )}
        {state.brandList.length > 0 && (
          <CheckboxGroup
            value={state.selectedBrands}
            onChange={brandChangeHandler}
            color="primary"
          >
            {state.brandList.map((item, index) => (
              <Checkbox
                key={item.id}
                value={item.id}
                classNames={checkboxItemClasses}
              >
                {item.persianBrand}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      </AccordionItem>
      <AccordionItem
        indicator={<ArrowFilteringSvg />}
        key="3"
        aria-label="Accordion 3"
        title="نوع:"
      >
        {state.typeList.length === 0 ||
          (state.isLoding && (
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          ))}
        {state.typeList.length > 0 && state.isLoding === false && (
          <CheckboxGroup
            value={state.selectedTypes}
            onChange={typeChangeHandler}
            color="primary"
          >
            {state.typeList.map((item, index) => (
              <Checkbox
                key={item.id}
                value={item.id}
                classNames={checkboxItemClasses}
              >
                {item.persianType}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default FilteringAccording;
