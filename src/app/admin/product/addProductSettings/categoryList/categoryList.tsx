"use client";
import SyncLoader from "react-spinners/SyncLoader";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useCategorySocket from "@/hooks/useCtegorySocket";

type Category = {
    id: string;
    persianCategory: string;
    englishCategory: string;
  };

async function getData(): Promise<Category[]> {
  const result = await fetch("/api/productCategory");
  if (!result.ok) {
    toast.error("در ارتباط با سرور خطایی رخ داده است");
    console.log("data fetched: ", result);

    return [];
  }
  console.log("data fetched");
  const response = await result.json();
  if (response.error) {
    toast.error(response.error);
    return [];
  }
  const categoryListData = response.map((category: Category) => {
    return {
      id: category.id,
      persianName: category.persianCategory,
      englishName: category.englishCategory,
    };
  });

  return categoryListData;
}

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const data = await getData();
      setCategoryList(data);
    };
    setData();
  }, []);

  const connection = useCategorySocket((data: any, actionType: string) => {
    switch (actionType) {
      case "ADD_CATEGORY":
        return setCategoryList((prevData) => [
          ...prevData,
          {
            id: data.id,
            persianName: data.persianCategory,
            englishName: data.englishCategory,
          },
        ]);
      case "DELETE_CATEGORY":
        return setCategoryList((prevData) =>
          prevData.filter((item) => item.id !== data.id)
        );
      case "UPDATE_CATEGORY":
        return setCategoryList((prevData) =>
          prevData.map((item) =>
            item.id === data.id
              ? {
                  id: data.id,
                  persianName: data.persianCategory,
                  englishName: data.englishCategory,
                }
              : item
          )
        );
      default:
        return;
    }
  });

  return (
    <>
      <div className="container mx-auto py-10">
        {categoryList.length >= 1 && (
          <DataTable columns={columns} data={categoryList} />
        )}
      </div>
      {categoryList.length < 1 && (
        <div className="flex justify-evenly items-center flex-col gap-15 min-h-[200px]">
          <SyncLoader />
          <p>در حال بارگیری دسته بندی ها...</p>
        </div>
      )}
    </>
  );
};

export default CategoryList;
