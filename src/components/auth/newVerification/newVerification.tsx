import Image from "next/image";
import NewVerificationSvg from '@/../public/assets/authSvgs/newVerificationSvg.svg'
import NewVerificationForm from "./newVerificationForm";
const NweVerification = () => {
    return ( 
        <>
        <div className="flex justify-center items-center h-screen bg-primaryDark dark:bg-darkBg">

        <div className="flex justify-center h-[90%] w-[95%] rounded-3xl bg-white dark:bg-primaryDark2">
            <div className="flex flex-col gap-12 w-1/2 justify-center pr-24">
                <div className="flex flex-col gap-5">
                <h1 className='font-bold text-5xl text-black dark:text-primaryYellow'>تایید <span className='text-primary'>آدرس </span> ایمیل</h1>
                </div>
            <NewVerificationForm/>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-bgLoginSignup rounded-l-3xl dark:bg-primaryDark">
            <Image src={NewVerificationSvg} alt="svg" className="" />
            </div>
        </div>
        </div>
      
        </>
     );
}
 
export default NweVerification;