import { Footer } from "@/components/footer/footer";
import Navbar from "@/components/header/navbar/navbar";
import TotalPrice from "./totalPrice";

const OrderLyaout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row w-full justify-center gap-10 my-14">
        {children}
        <TotalPrice />
      </div>
      <Footer />
    </>
  );
};

export default OrderLyaout;
