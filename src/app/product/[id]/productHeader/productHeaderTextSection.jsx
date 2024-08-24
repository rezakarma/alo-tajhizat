import PrimaryButton from "@/components/button/primaryButton";

const ProductHeaderTextSection = ({description, rentPrice , brand, model}) => {
    return ( 
        <div className=" flex flex-col gap-10  w-full lg:w-1/3">
            <h1 className="font-semibold text-xl mx-auto lg:mx-0 lg:font-extrabold lg:text-3xl ">{`${brand} ${model}`}</h1>
            <div className="flex flex-col gap-5">
                <span className="font-bold mx-4 lg:mx-0 text-primary text-xl">معرفی کوتاه:</span>
                <p className="w-11/12 mx-auto lg:mx-0 lg:w-[400px]">{description}</p>
            </div>
            <span className="font-bold mx-4 text-primary text-xl lg:mx-0 ">آماده ارسال</span>
            <div className="flex flex-col mx-auto lg:mx-0 lg:flex-row gap-3 w-11/12 items-center">
                <span className="font-bold text-primary text-xl"> قیمت اجاره روزانه: </span>
                <p className="font-bold text-xl"><span> {rentPrice} </span> تومان </p>
                <PrimaryButton className='font-bold text-lg bg-primary text-white px-5 py-3 rounded-full hover:scale-110 hover:bg-primaryDark transition-all' title="افزودن به سبد خرید"/>
            </div>
        </div>
     );
}
 
export default ProductHeaderTextSection;