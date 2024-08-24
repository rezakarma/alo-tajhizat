"use client";
import SyncLoader from "react-spinners/SyncLoader";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import GetCategoryTypes, { typeOfRequest } from "@/data/products/getCategoryTypes";
import useTypeSocket from "@/hooks/useTypeSocket";

type Type = {
  id: string;
  persianType: string;
  englishType: string;
 
};

async function getData(id): Promise<Type[]> {
  const typeListCreator = (response) => {
    const typeListData = response.map((type: Type) => {
      return {
        id: type.id,
        persianName: type.persianType,
        englishName: type.englishType,
      };
    });
    return typeListData;
  };
  if (id !== "") {
    const response = await GetCategoryTypes(id,typeOfRequest.single);
    const typeListData = typeListCreator(response);
    console.log('this line is running')
    return typeListData;
  }
  {
    const result = await fetch("/api/productType");
    console.log('hereeeee ',result)
    
    if (!result.ok) {
      toast.error("در ارتباط با سرور خطایی رخ داده است");

      return [];
    }
    const response = await result.json();
    if (response.error) {
      toast.error(response.error);
      return [];
    }
    const typeListData = typeListCreator(response);
    console.log('this line is running')

    return typeListData;
  }
}

const TypeList = (props) => {
  const [typeList, setTypeList] = useState([]);
  const [categoryId, setCategoryId] = useState('')
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    const setData = async () => {
      startTransition(async () => {
        const data = await getData(props.id ? props.id : "");
        setTypeList(data);
      });
    };
    setData();
    setCategoryId(props.id)
    
  }, [props.id]);

  const connection = useTypeSocket((data: any, actionType: string) => {
    switch (actionType) {
      case "ADD_TYPE":
        if(props.id === categoryId || categoryId === "") {
          return setTypeList((prevData) => [
            ...prevData,
            {
              id: data.id,
              persianName: data.persianType,
              englishName: data.englishType,
            },
          ]);
        }else {
          console.log('id not match ', props.id , data.CategoryId)
          return 
        }
      case "DELETE_TYPE":
        console.log("dlete-type run")
        return setTypeList((prevData) =>
          prevData.filter((item) => item.id !== data.id)
        );
      case "UPDATE_TYPE":
        return setTypeList((prevData) =>
          prevData.map((item) =>
            item.id === data.id
              ? {
                  id: data.id,
                  persianName: data.persianType,
                  englishName: data.englishType,
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
        {!isPending && <DataTable columns={columns} data={typeList} />}
      </div>
      {isPending && (
        <div className="flex justify-evenly items-center flex-col gap-15 min-h-[200px]">
          <SyncLoader />
          <p>در حال بارگیری نوع دسته بندی ها...</p>
        </div>
      )}
    </>
  );
};

export default TypeList;
