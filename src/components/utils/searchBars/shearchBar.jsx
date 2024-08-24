"use client";
import Link from "next/link";
import {useState} from "react";


function SearchBar({search,setSearch}) {
  // const [search,setSearch] = useState("");
  return (
    <div className="w-[350px] text-lg  ">
      <div className="md:max-w-md lg:col-span-2">     
        <form className="flex flex-col md:flex-row relative">
          <svg
            class="m-3 mr-5 w-7 h-5 absolute text-primaryLight"
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
            className="rounded-full flex-grow w-full h-12 px-11 mb-3  transition duration-200 bg-white border border-gray-300  shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline focus:text-gray-800"
          />
          <div
            class="absolute end-0 px-0.2 py-0"
          >
            <Link href='*'><svg xmlns="http://www.w3.org/2000/svg" className=' fill-primaryYellow' width="45" height="48" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
