import DownArrowSvg from "../../../../public/assets/equipmentRental/productChnagerSvgs/downArrowSvg";
import UpArrowSvg from "../../../../public/assets/equipmentRental/productChnagerSvgs/upArrowSvg";

const HeaderProductChanger = (props) => {
  return (
    <div className="flex flex-col items-center  gap-10 w-1/5">
      <div onClick={props.increace}>
      <UpArrowSvg />
      </div>
      <span className="text-lg font-extrabold text-[#C6C6C6]">{props.productNumber +1}</span>
      <div onClick={props.decrease}>
      <DownArrowSvg />
      </div>
    </div>
  );
};

export default HeaderProductChanger;
