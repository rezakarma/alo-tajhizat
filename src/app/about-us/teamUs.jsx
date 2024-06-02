import PrimaryDarkCard from "@/components/card/primaryDarkCard";
import teamSvg from "../../../public/assets/aboutUsSvg/teamSvg";
import RezaKarmaSvg from "../../../public/assets/aboutUsSvg/membersSvgs/rezakarmaSvg";
import RezaMtSvg from "../../../public/assets/aboutUsSvg/membersSvgs/rezamtSvg";
import MehdiTgSvg from "../../../public/assets/aboutUsSvg/membersSvgs/mehditgSvg";
import MehrsadArkiSvg from "../../../public/assets/aboutUsSvg/membersSvgs/mehrsadarkiSvg";

function teamUs() {
  const teamUs = [
    {
      id: 1,
      svg: <teamSvg />,
      name: "مرصاد ارکی",
      role: "بنیان گذار و مدیر اجرایی",
      icon: <MehrsadArkiSvg />,
    },
    {
      id: 2,
      svg: "",
      name: "مهدی تقی نژاد",
      role: "بنیان گذار و مدیر اجرایی",
      icon: <MehdiTgSvg />,
    },
    {
      id: 3,
      svg: "",
      name: "سیدرضا متینی",
      role: "طراح و توسعه دهنده",
      icon: <RezaMtSvg />,
    },
    {
      id: 4,
      svg: "",
      name: "محمدرضا شادمان",
      role: "طراح و توسعه دهنده",
      icon: <RezaKarmaSvg />,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row h- lg:h-[35rem] justify-evenly items-center">
      <div className="flex flex-col h-[15rem] lg:h-0 lg:w-1/4 ">
        <div class=" border-b-8 border-primaryLight lg:mb-5 lg:w-60"></div>
          <p class="font-base text-medium text-center w-52 lg:text-right lg:w-9/12 ">
            تیم الو تجهیزات متشکل از افرادی با تجربه و توانمند است که میتواند
            تمامی نیاز هایی که ممکن است در اینده برای مشتریان پیش بیاید را به
            راحتی برطرف کند
          </p>
      </div>
      <div className="lg:w-1/4  ">
      <ul className="flex flex-col ">
        {teamUs.map((item) => (
          <li className="py-5  flex flex-row gap-5 items-center" key={item.id}>
            {item.icon}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-primaryDark dark:text-primaryYellow">
                {item.name}
              </h2>
              <p className="text-base text-gray-400">{item.role}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default teamUs;
