"use client";
import Link from "next/link";
import {useState} from "react";


function SearchBar() {
  const [search,setSearch] = useState("");
  return (
    <div className="  lg:text-lg  ">
      <div className="w-1/2 ">     
        <form className="bg-white rounded-full flex flex-row justify-between items-center w-[15rem] lg:w-[300px]  h-[48px]  focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline focus:text-gray-800 ">
          <div className="flex mr-1 lg:mr-4">
          <svg
            class="h-auto w-[25px] lg:w-[30px] lg:text-primaryLight"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            placeholder="جستجو در تجهیزات ..."
            required
            type="text"
            value={search}
            onChange={e=>setSearch(e.target.value.toLowerCase())}
            className="w-2/3 text-sm mr-1 outline-none text-black dark:bg-white lg:text-xl lg:w-3/4 lg:mr-3 "
          />
          </div>
          <div
            class=""
          >
            <Link href='*'><svg xmlns="http://www.w3.org/2000/svg" className=' fill-primaryYellow  ' width="45" height="48" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
