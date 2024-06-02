import { Divider } from "@nextui-org/react";

const UserProfileCard = (props) => {
  const titleArray = props.title.split(" ");
  const firstWord = titleArray[0];
  const secondWord = titleArray[1];
  const thirdWord = titleArray[2];
  let colorfulWord = "";
  let remainingWords = "";
  if (thirdWord.length < 3) {
    colorfulWord = secondWord + " " + thirdWord;
    remainingWords = titleArray.slice(3).join(" ");
  } else {
    colorfulWord = secondWord;
    remainingWords = titleArray.slice(2).join(" ");
  }
  return (
    <div className="w-[90%] h-[70%] bg-white mt-[5%] rounded-3xl shadow-lg flex flex-col justify-evenly dark:text-primaryYellow dark:bg-slate-800">
      <div className="flex flex-col gap-3 w-max mr-5 mt-5">
        <div className="font-bold text-2xl">
          {firstWord} <span className="text-primary">{colorfulWord}</span>{" "}
          {remainingWords ? remainingWords : ""}
        </div>
        <Divider className=" py-[2px] w-4/5 bg-primary" />
      </div>
      <div className="flex justify-center items-center h-[70%]">{props.children}</div>
    </div>
  );
};

export default UserProfileCard;
