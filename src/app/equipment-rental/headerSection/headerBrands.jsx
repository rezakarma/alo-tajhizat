import Image from "next/image";
import NikonSvg from "../../../../public/assets/equipmentRental/brandsLogoSvg/nikonSvg";
import CanonSvg from "../../../../public/assets/equipmentRental/brandsLogoSvg/canonSvg";
import SonySvg from "../../../../public/assets/equipmentRental/brandsLogoSvg/sonySvg";
import SigmaSvg from "../../../../public/assets/equipmentRental/brandsLogoSvg/sigmaSvg";
import ZeissSvg from "../../../../public/assets/equipmentRental/brandsLogoSvg/zeissSvg";

const HeaderBrands = (props) => {

    
    return ( 
        <div className={props.className ? `flex justify-evenly items-center bg-equipmentRentalGrayBg dark:bg-darkBg  ${props.className}`:"flex justify-evenly items-center bg-equipmentRentalGrayBg "}>
            <ZeissSvg/>
            <SigmaSvg/>
            <SonySvg/>
            <CanonSvg/>
            <NikonSvg/>

        </div>
     );
}
 
export default HeaderBrands;