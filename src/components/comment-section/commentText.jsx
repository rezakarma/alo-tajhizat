import PrimaryButton from "@/components/button/primaryButton";

function commentText() {
  return (
    <div>
      <div className="mr-5 mt-80 mb-40 lg:mb-0 lg:mr-32 lg:mt-80 ">
        <h2 className="w-3/4 text-3xl font-bold mb-2 dark:text-primaryYellow lg:text-4xl lg:font-bold lg:mb-2">
          {" "}
          نظرات<span className="text-primary"> مشتریان</span> خوبمون درباره ما
          چیه؟
        </h2>
        <br />
        <p className="text-xl w-5/6 h-10 mr-3 lg:text-xl lg:w-4/6 lg:h-24 ">
          مشتریان ما معمولا جامعه کارگردان ها ، سینما گران ، عکاس ها ، فیلمبردار
          ها، نورپرداز ها، مدیران تولید، تولید کنندگان محتوا و... البته از تمامی
          اقشار جامعه با ما کار میکنن و بسته به قشر یا شغل خاصی نیست
        </p>
      </div>
      <PrimaryButton
            title="ثبت نطر شما"
            href="/equipment-rental"
            className="mb-5 mr-24 bg-primary w-40 h-12 font-bold rounded-full text-white lg:mt-40 lg:mr-32 lg:drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)] lg:hover:scale-110 lg:hover:bg-primaryDark lg:hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] lg:transition-all"
          />
    </div>
  );
}

export default commentText;
