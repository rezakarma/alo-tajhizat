import Instagram from "../../../public/assets/socialIcon/instagram.js";
import Youtube from "../../../public/assets/socialIcon/youtube.js";
import Whatsapp from "../../../public/assets/socialIcon/whatsapp.js";
import Discord from "../../../public/assets/socialIcon/discord.js";
import Telegram from "../../../public/assets/socialIcon/telegram.js";
import Image from "next/image";

const SocialIcon = (props) => {
  return (
    <div className={`flex ${props.className}`}>
      {/* <Image className="fill-primary" src={instagram} alt="instagram" /> */}
      <Instagram color={props.color} className={props.color}/>
      <Youtube color={props.color} className={props.color} />
      <Whatsapp color={props.color} className={props.color}/>
      <Discord color={props.color} className={props.color}/>
      <Telegram color={props.color} className={props.color}/>
    </div>
  );
};

export default SocialIcon;
