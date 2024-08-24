import PrimaryButton from "@/components/button/primaryButton";
import LeftFleshSvg from "../../../../public/assets/equipmentRental/leftFleshSvg";
import {Skeleton} from "@nextui-org/skeleton";
const HeaderProductInfo = (props) => {
    return ( 
        <div className={`flex flex-col w-[70%] ml-52 items-end gap-4 `}>
       
             <div className={`flex flex-col gap-4 items-end ${props.isVisible ? "fade-in-from-left" : ""}`}>

          <h1 className="text-7xl font-extrabold animate-fade-down animate-once dark:text-primaryYellow animate-duration-1000 animate-delay-500 animate-ease-in-out">{props.brand}</h1>
          <h1 className="text-7xl font-extrabold animate-fade-down animate-duration-1000 dark:text-primaryYellow animate-delay-500 animate-ease-in-out">{props.model}</h1>
          </div>
          <div className={`flex flex-col items-end gap-4 ${props.isVisible ? "fade-in-from-bottom" : ""}`}>

          <span className="text-equipmentRentalGrayText -mt-3 dark:text-white">
            {props.persianTitle}
          </span>
          <PrimaryButton
            href="/"
            title="مشاهده"
            svg={<LeftFleshSvg className="font-bold" />}
            className={`w-32 h-11 font-bold rounded-full text-primaryLight border-2 border-primaryLight drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)] hover:scale-110 hover:border-primary hover:text-primary hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-150`}
            />
            </div>
        </div>
     );
}
 
export default HeaderProductInfo;