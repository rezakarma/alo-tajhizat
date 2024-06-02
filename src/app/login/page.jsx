import { Footer } from "@/components/footer/footer";
import LoginSvg from "../../../public/assets/Login/SignUp/loginSvg";

const { default: LoginForm } = require("./loginForm");

const Login = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-primaryDark  dark:bg-darkBg">
        <div className="flex justify-center h-[90%] w-[95%] rounded-3xl bg-white  dark:bg-primaryDark2">
          <div className="flex flex-col gap-12 lg:w-1/2 justify-center md:mr-5 xl:pr-24">
            <div className="flex flex-col gap-5">
              <h1 className="flex font-bold text-3xl justify-center lg:justify-start xl:text-5xl text-black dark:text-primaryYellow">
                ورود به <span className="text-primary">حساب</span> کاربری
              </h1>
              <p className="flex justify-center lg:justify-start  text-lg mr-2">
                لطفا اطلاعات کاربری خود را وارد کنید
              </p>
            </div>
            <LoginForm />
          </div>
          <div className="hidden md:w-1/2 md:flex md:items-center md:justify-center bg-bgLoginSignup md:rounded-l-3xl dark:bg-primaryDark">
            <LoginSvg />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
