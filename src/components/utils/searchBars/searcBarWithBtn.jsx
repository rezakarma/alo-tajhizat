"use client"
import PrimaryButton from "@/components/button/primaryButton";
import SearchBar from "./shearchBar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { filteringAction } from "@/store/filtering-slice";

const SearchBarWithBtn = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    const search = searchParams.get('search');
    if(search) {
      setSearch(search)
    }
  },[])


  const searchChangeHandler = (search) => {
    dispatch(filteringAction.updateQueryParams({ key: "search", value: search }));
    setSearch(search)
  }

  const onButtonClickHandler = () => {
    dispatch(filteringAction.updateQueryParams({ key: "search", value: search }));
  }
    return ( 
        <div className="flex mt-5 w-11/12 lg:w-full ">
          <PrimaryButton href={`/equipment-rental?${searchParams.toString()}`}title="جستجو" onClick={onButtonClickHandler} className="bg-primary w-32 h-12 font-bold rounded-full text-white drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)] hover:scale-110 hover:bg-primaryDark hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-150"/>
          <SearchBar search={search} setSearch={setSearch}/>
        </div>
     );
}
 
export default SearchBarWithBtn;