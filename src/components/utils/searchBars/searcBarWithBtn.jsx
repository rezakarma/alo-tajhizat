import PrimaryButton from "@/components/button/primaryButton";
import SearchBar from "./shearchBar";

const SearchBarWithBtn = () => {
    return ( 
        <div className="flex mt-5 w-11/12 lg:w-full ">
          <PrimaryButton href="/" title="جستجو" className="bg-primary w-32 h-12 font-bold rounded-full text-white drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)] hover:scale-110 hover:bg-primaryDark hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-150"/>
          <SearchBar/>
        </div>
     );
}
 
export default SearchBarWithBtn;