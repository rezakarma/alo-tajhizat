"use client";
import Navbar from "@/components/header/navbar/navbar";
import MainHeader from "./headerSection/mainHeader";
import ProductsMain from "./productsSection/productsMain";
import { Footer } from "@/components/footer/footer";
import { useRouter } from "next/navigation";
import { useNavigate } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { v1 } from "uuid";
import { filteringAction } from "@/store/filtering-slice";
import { useDispatch } from "react-redux";
const EquipmentRental = () => {
  const queryParams = useSelector((state) => state.filtering.queryParams);
  // const navigate = useNavigate();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const type = searchParams.get("type");
    const price = searchParams.get("priceRange");
    const order = searchParams.get("order");
    const page = searchParams.get("page");
    const search = searchParams.get("search");

    const params = {};
    for (const [key, value] of searchParams.entries()) {
      if (value.includes(",")) {
        // Convert comma-separated values to an array
        console.log(key, value, " loop values");

        params[key] = value.split(",");
      } else {
        params[key] = value;
      }
    }

    console.log(params, " paramssss");
    dispatch(filteringAction.setQueryParams(params));
    dispatch(filteringAction.setReadingQueryTrue());
  }, []);

  useEffect(() => {
    // console.log("this is queryParams 1 ", queryParams);
    // const newQueryParams = new URLSearchParams();
    // if (Object.keys(queryParams).length > 0) {
    //   Object.keys(queryParams).forEach((key) => {
    //     if (
    //       queryParams[key] !== undefined &&
    //       queryParams[key] !== null &&
    //       queryParams[key].length > 0
    //     ) {
    //       if (Array.isArray(queryParams[key])) {
    //         newQueryParams.set(key, queryParams[key].join(","));
    //       } else {
    //         console.log(key, "key");
    //         newQueryParams.set(key, queryParams[key]);
    //       }
    //     }
    //   });
    // }else if (Object.keys(queryParams).length === 0 || Object.values(queryParams).some((value) => value === null || value === undefined || (Array.isArray(value) && value.length === 0))) {
    //   // If queryParams is empty or has any empty keys, clear the query params from the URL
    //   router.push(`${pathname}`, { scroll: false });
    //   return
    // }
    // // const paramsString = `${newQueryParams.length ? "?" : ''}${paramsString.toString()}`
    // // router.push(`${pathname}?${newQueryParams.toString()}`);
    // const newPath = `${pathname}?${newQueryParams.toString()}`;
    // console.log(newPath, " urlParam");
    // if (newQueryParams.toString() !== "") {
    //   router.push(newPath, { scroll: false });
    // }

    console.log("this is queryParams 1 ", queryParams);
    const newQueryParams = new URLSearchParams();
    if (Object.keys(queryParams).length === 0 || Object.values(queryParams).some((value) => value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0))) {
      // If queryParams is empty or has any empty keys, clear the query params from the URL
      router.push(`${pathname}`, { scroll: false });
    } else {
      Object.keys(queryParams).forEach((key) => {
        if (
          queryParams[key] !== undefined &&
          queryParams[key] !== null &&
          queryParams[key].length > 0
        ) {
          if (Array.isArray(queryParams[key])) {
            newQueryParams.set(key, queryParams[key].join(","));
          } else {
            console.log(key, "key");
            newQueryParams.set(key, queryParams[key]);
          }
        }
      });
      const newPath = `${pathname}?${newQueryParams.toString()}`;
      console.log(newPath, " urlParam");
      if (newQueryParams.toString() !== "") {
        router.push(newPath, { scroll: false });
      }
    }
  }, [queryParams]);

  return (
    <>
      <div className=" w-[100%] h-screen ">
        <div className="hidden xl:h-[9%] xl:min-h-fit xl:w-full xl:z-10 xl:bg-white xl:flex xl:justify-center xl:items-center xl:dark:bg-darkBg ">
          <Navbar />
        </div>
        <MainHeader />
      </div>
      <div className="w-full h-[full]">
        <ProductsMain />
      </div>
    </>
  );
};

export default EquipmentRental;
