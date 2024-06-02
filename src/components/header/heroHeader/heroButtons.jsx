import PrimaryButton from "@/components/button/primaryButton";

const HeroButtons = () => {
    return ( 
        <div className="flex gap-10">
          <PrimaryButton
            title="ثبت سفارش"
            href="/equipment-rental"
            className="bg-primary w-32 h-12 font-bold rounded-full text-white drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)] hover:scale-110 hover:bg-primaryDark hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-150"
          />
          <PrimaryButton
            title="درباره ما"
            href="/about-us"
            className="bg-white dark:bg-transparent w-32 h-12 font-bold rounded-full text-primary border-4 border-primary dark:border-primaryYellow dark:text-primaryYellow drop-shadow-[-2px_9px_10px_rgba(0,147,171,0.2)] hover:scale-110 hover:border-primaryDark hover:text-primaryDark hover:drop-shadow-[-2px_9px_15px_rgba(0,147,171,0.1)] transition-all duration-150"
          />
        </div>
     )
}
 
export default HeroButtons;