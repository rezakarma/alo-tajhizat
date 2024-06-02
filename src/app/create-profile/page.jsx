import Image from 'next/image';
import ProfileForm from './profileForm'
import createProfileSvg from '@/../public/assets/profile/createProfileSvg.svg'
const createProfilePage = () => {
    return (
        <>
        <div className="flex justify-center items-center h-[180vh] ssm:h-[150vh] md:h-[108vh] lg:h-[100vh] xl:h-screen bg-primaryDark dark:bg-darkBg">

        <div className="flex justify-center h-[90%] w-[95%] rounded-3xl bg-white">
            <div className="flex flex-col gap-5 w-11/12 mx-auto md:w-7/12  lg:w-1/2 justify-center xl:pr-24 dark:bg-primaryDark2">
                <div className="flex flex-col gap-5">
                <h1 className='font-bold text-5xl text-black dark:text-primaryYellow'> ساختن <span className='text-primary'>پروفایل </span> کاربری</h1>
                <p className='text-lg mr-2'>لطفا اطلاعات کاربری خود را وارد کنید</p>
                </div>
            <ProfileForm/>
            {/* <ProfileForm/> */}
            </div>
            <div className="hidden xl:w-1/2 xl:flex xl:items-center xl:justify-center xl:bg-bgLoginSignup xl:rounded-l-3xl xl:dark:bg-primaryDark">
            <Image src={createProfileSvg} alt='forgot password'/>
            </div>
        </div>
        </div>
      
        </>
    );
}
 
export default createProfilePage;