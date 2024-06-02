
import Navbar from "@/components/header/navbar/navbar";
import HeaderUs from "./headerUs";
import InfoUs from "./infoUs";
import TeamUs from "./teamUs";
import { Footer } from "@/components/footer/footer";

function aboutUs() {
  return (
    <div>
      <Navbar />
      <HeaderUs />
      <InfoUs />
      <TeamUs />
      <Footer />
    </div>
  );
}

export default aboutUs;
