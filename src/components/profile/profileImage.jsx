import { Image } from "@nextui-org/react";
import { useState } from "react";
import { ImagePlus } from 'lucide-react';
import ProfileImageEditModal from "@/app/profile/infosEditModal/profileImageEditModal";
const ProfileImage = ({ src, alt, handleClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div onClick={handleClick} className="">
      <Image
        width={100}
        removeWrapper={true}
        height={100}
        alt={alt}
        src={src}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        
        className="absolute h-[100px] w-[100px] top-0 m-auto rounded-full left-0 right-0 bottom-0 flex justify-center items-center  overlay"
      ></Image>
      {isHovered && (
        <div s onClick={handleClick} className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center z-20 text-white">
         <ImagePlus/>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
