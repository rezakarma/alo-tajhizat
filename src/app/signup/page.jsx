import { Footer } from "@/components/footer/footer";
import SignupSvg from "../../../public/assets/Login/SignUp/signupSvg";
import SignupForm from "./signupForm";

const Signup = () => {
    return ( 
        <>
        <div className="flex justify-center items-center h-screen bg-primaryDark dark:bg-darkBg">

        <div className="flex justify-center h-[90%] w-[95%] rounded-3xl bg-white dark:bg-primaryDark2 ">
            <div className="flex flex-col gap-10 w-1/2 justify-center md:p-6 lg:pr-20 ">
                <div className="flex flex-col  gap-5">
                <h1 className='flex flex-row text-4xl items-center  justify-center xl:justify-start font-bold lg:text-5xl text-black dark:text-primaryYellow'> ساختن <span className=' text-primary'>حساب </span> کاربری</h1>
                <p className=' text-lg mr-2'>لطفا اطلاعات کاربری خود را وارد کنید</p>
                </div>
            <SignupForm/>
            {/* <ProfileForm/> */}
            </div>
            <div className="hidden md:w-1/2 md:flex items-center justify-center bg-bgLoginSignup rounded-l-3xl dark:bg-primaryDark">
            <SignupSvg/>
            </div>
        </div>
        </div>
      
        </>
     );
}
 
export default Signup;