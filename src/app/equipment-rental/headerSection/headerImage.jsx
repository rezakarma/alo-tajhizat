// import { useEffect, useState } from "react";

// const HeaderImage = (props) => {

//     return ( 
        
//             <img className={`w-[350px] absolute left-[27%] top-[27%] ${props.isAniamte  ? 'fade-in' : ''}`} src={props.src} onLoad={props.onLoad} alt="camera"/>
        
//      );
// }
 
// export default HeaderImage;

import { useEffect, useState } from "react";

const HeaderImage = (props) => {
//   const [isAnimate, setIsAnimate] = useState(false);

//   useEffect(() => {
//     setIsAnimate(true); // Trigger fade-in effect after the component is mounted
//   }, []);

//   const handleImageLoad = () => {
//     setIsAnimate(false);
//   };

  return (
    <img
      className={`w-[350px] absolute left-[27%] top-[27%]  ${props.isVisible ? "fade-in-from-top" : ""}`}
      src={props.src}
    //   onAnimationEnd={handleImageLoad}
      alt="camera"
    />
  );
};

export default HeaderImage;