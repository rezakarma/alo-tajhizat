import Navbar from "@/components/header/navbar/navbar";
import MainHeader from "./headerSection/mainHeader";
import ProductsMain from "./productsSection/productsMain";
import { Footer } from "@/components/footer/footer";

const EquipmentRental = () => {
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
