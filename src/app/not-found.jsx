import Image from "next/image";
import notFound from "../../public/assets/not-foundSvg/notFound.svg";
import Link from "next/link";
import PrimaryButton from '../components/button/primaryButton'

const notFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-32  ">
      <Image className="" width={300} height={30} src={notFound} />
      <div className="flex flex-col items-center justify-center p-10">
        <h3 className="font-extrabold text-3xl">404 Error</h3>
        <h2 className="font-semibold text-2xl">oh!</h2>
        <p className="font-medium text-xl"> صفحه مورد نظر یافت نشد</p>
      </div>
      {/* <Link className="border-2 bg-primary p-5 rounded-full text-gray-200 font-semibold  " href="/">
        بازگشت به صفحه اصلی
      </Link> */}
          <PrimaryButton
            title="بازگشت به صفحه اصلی"
            href="/"
            className="bg-primary p-5 font-bold rounded-full text-white drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)] hover:scale-110 hover:bg-primaryDark hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-150"
          />
    </div>
  );
};

export default notFoundPage;
