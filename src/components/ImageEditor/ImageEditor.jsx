// import { useRef, useState, useEffect } from 'react';
// import AvatarEditor from 'react-avatar-editor';

// function ImageEditor({ imageUrl }) {
//   const editorRef = useRef();
//   const [croppedImage, setCroppedImage] = useState(null);
//   const [editorSize, setEditorSize] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const updateEditorSize = () => {
//       if (editorRef.current && editorRef.current.props.getImageSize) {
//         const { width, height } = editorRef.current.props.getImageSize();
//         const aspectRatio = width / height;
//         const editorWidth = Math.min(width, height);
//         const editorHeight = editorWidth / aspectRatio;
//         setEditorSize({ width: editorWidth, height: editorHeight });
//       }
//     };

//     updateEditorSize();
//     window.addEventListener('resize', updateEditorSize);

//     return () => {
//       window.removeEventListener('resize', updateEditorSize);
//     };
//   }, [imageUrl]);

//   const handleCrop = () => {
//     if (editorRef.current) {
//       const canvas = editorRef.current.getImageScaledToCanvas();
//       const croppedImageUrl = canvas.toDataURL();
//       setCroppedImage(croppedImageUrl);
//     }
//   };

//   return (
//     <div>
//       <div style={{ position: 'relative', width: '100%', height: editorSize.height }}>
//         <AvatarEditor
//           ref={editorRef}
//           image={imageUrl}
//           width={editorSize.width}
//           height={editorSize.height}
//           border={50}
//           color={[255, 255, 255, 0.6]} // RGBA
//           scale={1}
//           rotate={0}
//           onPositionChange={() => setCroppedImage(null)}
//         />
//       </div>
//       {croppedImage ? (
//         <div>
//           <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />
//         </div>
//       ) : (
//         <button onClick={handleCrop}>Crop Image</button>
//       )}
//     </div>
//   );
// }

// export default ImageEditor;





// import React, { useReducer, useCallback } from 'react';
// import Cropper from 'react-easy-crop';
// import getCroppedImg from 'react-easy-crop/dist/helpers/getCroppedImg';
// import { ImageResult, Point } from 'react-easy-crop/types';


// const initialImageCropState = {
//     imageSrc: '',
//     crop: { x: 0, y: 0, width: 0, height: 0 },
//     rotation: 0,
//   };
  
//   const imageCropReducer = (state, action) => {
//     switch (action.type) {
//       case 'SET_IMAGE_SRC':
//         return { ...state, imageSrc: action.payload };
//       case 'SET_CROP':
//         return { ...state, crop: { ...state.crop, ...action.payload } };
//       case 'SET_ROTATION':
//         return { ...state, rotation: action.payload };
//       default:
//         return state;
//     }
//   };

// const ImageEditor = () => {
//   const [state, dispatch] = useReducer(imageCropReducer, initialImageCropState);

//   const onCropComplete = useCallback(
//     async (croppedArea, croppedAreaPixels) => {
//       const croppedImage = await getCroppedImg(
//         state.imageSrc,
//         croppedAreaPixels,
//         state.rotation
//       );

//       // Do something with the cropped image, e.g., upload it to a server
//       console.log(croppedImage);
//     },
//     [state.imageSrc, state.rotation]
//   );

//   return (
//     <div>
//       <Cropper
//         image={state.imageSrc}
//         crop={state.crop}
//         rotation={state.rotation}
//         onCropChange={(crop) => dispatch({ type: 'SET_CROP', payload: crop })}
//         onRotationChange={(rotation) => dispatch({ type: 'SET_ROTATION', payload: rotation })}
//         onCropComplete={onCropComplete}
//       />
//     </div>
//   );
// };

// export default ImageEditor;


// import React, { useState } from "react";
// import ReactCrop from "react-image-crop";
// import 'react-image-crop/dist/ReactCrop.css'

// const ImageEditor = ({ image, setImage }) => {
//   const [crop, setCrop] = useState({ unit: "%", width: 50, height: 50, x: 25, y: 25 });

//   const onImageLoaded = (img) => {
//     setCrop({ ...crop, width: img.naturalWidth, height: img.naturalHeight });
//   };

//   const onCropComplete = (crop) => {
//     setCrop(crop);
//     const canvas = document.createElement("canvas");
//     const scaleX = crop.width / imgRef.current.naturalWidth;
//     const scaleY = crop.height / imgRef.current.naturalHeight;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(
//       imgRef.current,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );
//     setImage(canvas.toDataURL());
//   };

//   const imgRef = React.useRef(null);

//   return (
//     <div className="relative">
//       <ReactCrop
//         src={image}
//         onImageLoaded={onImageLoaded}
//         onComplete={onCropComplete}
//         crop={crop}
//         onChange={setCrop}
//         className="w-full h-full"
//       />
//       <div className="absolute inset-0 flex items-center justify-center">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => setImage(null)}
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImageEditor;





// import Image from 'next/image';
// import React, { useState } from 'react';
// import ReactCrop, { makeAspectCrop } from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// const ImageEditor = ({ image, setImage }) => {
//   const [crop, setCrop] = useState({
//     unit: '%', // Can be 'px' or '%'
//     x: 25,
//     y: 25,
//     width: 50,
//     height: 50
//   });

//   const onImageLoaded = (image) => {
//     const {width,height} = image.curerentTraget  
    
//     const crop = makeAspectCrop({
//       unit: 'px',
//       width : width,
  
//     },1,width,height
  
//   )
//     setCrop({crop});
//   };

//   const onCropComplete = (crop) => {
//     // Handle crop completion here
//     setCrop(crop);
//   };

//   const onCropChange = (crop) => {
//     setCrop(crop);
//   };

//   return (
//     <div>
//       <ReactCrop
//         src={image}
//         crop={crop}
//         onImageLoaded={onImageLoaded}
//         onComplete={onCropComplete}
//         onChange={onCropChange}
//       >

//            <Image
//         src={image}
//         alt='image'
//         layout="intrinsic"
//         width={crop.width}
//         height={crop.height}
//         onLoad={onImageLoaded}
//         />
//         </ReactCrop>
//       <button onClick={() => setImage((prevSate) => [crop , prevSate[1]])}>
//         Submit Changes
//       </button>
//     </div>
//   );
// };

// export default ImageEditor;




import 'react-image-crop/dist/ReactCrop.css'
import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import Image from 'next/image';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageEditor = ({ image, setImage, setEditorShow }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const setCanvasPreview = (image, canvas, pixelCrop) => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  };

  const handleCropImage = () => {
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );
    const dataUrl = previewCanvasRef.current.toDataURL("image/jpeg");
    const croppedImageFile = dataURLtoFile(dataUrl, "cropped-image.jpg");
    setImage([croppedImageFile, dataUrl]);
    setEditorShow(false)
  };

  // Helper function to convert data URL to File object
  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {image && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={image}
              alt="Upload"
              style={{ maxHeight: "50vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={handleCropImage}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageEditor;


















// import 'react-image-crop/dist/ReactCrop.css'
// import { useRef, useState } from "react";
// import ReactCrop, {
//   centerCrop,
//   convertToPixelCrop,
//   makeAspectCrop,
// } from "react-image-crop";

// const ASPECT_RATIO = 1;
// const MIN_DIMENSION = 150;

// const ImageEditor = ({ image, setImage }) => {
//   const imgRef = useRef(null);
//   const previewCanvasRef = useRef(null);
//   const [crop, setCrop] = useState();
//   const [rotation, setRotation] = useState(0);
//   const [error, setError] = useState("");

//   const onImageLoad = (e) => {
//     const { width, height } = e.currentTarget;
//     const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

//     const crop = makeAspectCrop(
//       {
//         unit: "%",
//         width: cropWidthInPercent,
//       },
//       ASPECT_RATIO,
//       width,
//       height
//     );
//     const centeredCrop = centerCrop(crop, width, height);
//     setCrop(centeredCrop);
//   };

//   const setCanvasPreview = (image, canvas, pixelCrop, rotation) => {
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     const ctx = canvas.getContext("2d");
//     canvas.width = pixelCrop.width;
//     canvas.height = pixelCrop.height;

//     ctx.save();
//     ctx.translate(pixelCrop.width / 2, pixelCrop.height / 2);
//     ctx.rotate((rotation * Math.PI) / 180);
//     ctx.translate(-pixelCrop.width / 2, -pixelCrop.height / 2);

//     ctx.drawImage(
//       image,
//       pixelCrop.x * scaleX,
//       pixelCrop.y * scaleY,
//       pixelCrop.width * scaleX,
//       pixelCrop.height * scaleY,
//       0,
//       0,
//       pixelCrop.width,
//       pixelCrop.height
//     );

//     ctx.restore();
//   };

//   const handleRotateLeft = () => {
//     setRotation((rotation - 90) % 360);
//   };

//   const handleRotateRight = () => {
//     setRotation((rotation + 90) % 360);
//   };

//   const handleCropImage = () => {
//     setCanvasPreview(
//       imgRef.current,
//       previewCanvasRef.current,
//       convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
//       rotation
//     );
//     const dataUrl = previewCanvasRef.current.toDataURL("image/jpeg");
//     const croppedImageFile = dataURLtoFile(dataUrl, "cropped-image.jpg");
//     setImage([croppedImageFile, dataUrl]);
//   };
  

//   // Helper function to convert data URL to File object
//   const dataURLtoFile = (dataUrl, filename) => {
//     const arr = dataUrl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
//   };

//   return (
//     <>
//       <label className="block mb-3 w-fit">
//         <span className="sr-only">Choose profile photo</span>
//       </label>
//       {error && <p className="text-red-400 text-xs">{error}</p>}
//       {image && (
//         <div className="flex flex-col items-center">
//           <div className="flex">
//             <ReactCrop
//               crop={crop}
//               onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
//               onImageLoaded={onImageLoad}
//               keepSelection
//               minWidth={MIN_DIMENSION}
//               style={{ marginRight: "10px" }}
//             >
//               <img
//                 ref={imgRef}
//                 src={image}
//                 alt="Upload"
//                 style={{ maxHeight: "70vh" }}
//               />
//             </ReactCrop>
//             <div className="flex flex-col justify-center">
//               <button
//                 className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-2 bg-sky-500 hover:bg-sky-600"
//                 onClick={handleRotateLeft}
//               >
//                 Rotate Left
//               </button>
//               <button
//                 className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-2 bg-sky-500 hover:bg-sky-600"
//                 onClick={handleRotateRight}
//               >
//                 Rotate Right
//               </button>
//             </div>
//           </div>
//           <button
//             className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
//             onClick={handleCropImage}
//           >
//             Crop Image
//           </button>
//         </div>
//       )}
//       {crop && (
//         <canvas
//           ref={previewCanvasRef}
//           className="mt-4"
//           style={{
//             display: "none",
//             border: "1px solid black",
//             objectFit: "contain",
//             width: 150,
//             height: 150,
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default ImageEditor;




// import 'react-image-crop/dist/ReactCrop.css';
// import { useRef, useState } from "react";
// import ReactCrop, {
//   centerCrop,
//   convertToPixelCrop,
//   makeAspectCrop,
// } from "react-image-crop";

// const ASPECT_RATIO = 1;
// const MIN_DIMENSION = 150;

// const ImageEditor = ({ image, setImage }) => {
//   const imgRef = useRef(null);
//   const previewCanvasRef = useRef(null);
//   const [crop, setCrop] = useState();
//   const [rotation, setRotation] = useState(0);
//   const [rotatedImage, setRotatedImage] = useState(image);
//   const [error, setError] = useState("");

//   const onImageLoad = (e) => {
//     const { width, height } = e.currentTarget;
//     const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

//     const crop = makeAspectCrop(
//       {
//         unit: "%",
//         width: cropWidthInPercent,
//       },
//       ASPECT_RATIO,
//       width,
//       height
//     );
//     const centeredCrop = centerCrop(crop, width, height);
//     setCrop(centeredCrop);
//   };

//   const setCanvasPreview = (image, canvas, pixelCrop, rotation) => {
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     const ctx = canvas.getContext("2d");
//     canvas.width = pixelCrop.width;
//     canvas.height = pixelCrop.height;

//     ctx.save();
//     ctx.translate(pixelCrop.width / 2, pixelCrop.height / 2);
//     ctx.rotate((rotation * Math.PI) / 180);
//     ctx.translate(-pixelCrop.width / 2, -pixelCrop.height / 2);

//     ctx.drawImage(
//       image,
//       pixelCrop.x * scaleX,
//       pixelCrop.y * scaleY,
//       pixelCrop.width * scaleX,
//       pixelCrop.height * scaleY,
//       0,
//       0,
//       pixelCrop.width,
//       pixelCrop.height
//     );

//     ctx.restore();
//   };

//   const handleRotateLeft = () => {
//     setRotation((rotation - 90) % 360);
//     setRotatedImage(rotateImage(image, -90));
//   };

//   const handleRotateRight = () => {
//     setRotation((rotation + 90) % 360);
//     setRotatedImage(rotateImage(image, 90));
//   };

//   const handleCropImage = () => {
//     setCanvasPreview(
//       imgRef.current,
//       previewCanvasRef.current,
//       convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
//       rotation
//     );
//     const dataUrl = previewCanvasRef.current.toDataURL("image/jpeg");
//     const croppedImageFile = dataURLtoFile(dataUrl, "cropped-image.jpg");
//     setImage([croppedImageFile, dataUrl]);
//   };

//   const dataURLtoFile = (dataUrl, filename) => {
//     const arr = dataUrl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
//   };

//   const rotateImage = (imageUrl, degrees) => {
//     const img = new Image();
//     img.src = imageUrl;
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const width = img.width;
//     const height = img.height;

//     canvas.width = width;
//     canvas.height = height;
//     ctx.translate(width / 2, height / 2);
//     ctx.rotate((degrees * Math.PI) / 180);
//     ctx.drawImage(img, -width / 2, -height / 2);

//     return canvas.toDataURL("image/jpeg");
//   };

//   return (
//     <>
//       <label className="block mb-3 w-fit">
//         <span className="sr-only">Choose profile photo</span>
//       </label>
//       {error && <p className="text-red-400 text-xs">{error}</p>}
//       {image && (
//         <div className="flex flex-col items-center">
//           <div className="flex">
//             <ReactCrop
//               crop={crop}
//               onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
//               onImageLoaded={onImageLoad}
//               keepSelection
//               minWidth={MIN_DIMENSION}
//               style={{ marginRight: "10px" }}
//             >
//               <img
//                 ref={imgRef}
//                 src={rotatedImage}
//                 alt="Upload"
//                 style={{ maxHeight: "70vh" }}
//               />
//             </ReactCrop>
//             <div className="flex flex-col justify-center">
//               <button
//                 className="btn btn-primary mb-2"
//                 onClick={handleRotateLeft}
//               >
//                 Rotate Left
//               </button>
//               <button
//                 className="btn btn-primary mb-2"
//                 onClick={handleRotateRight}
//               >
//                 Rotate Right
//               </button>
//               <button className="btn btn-primary" onClick={handleCropImage}>
//                 Crop
//               </button>
//             </div>
//           </div>
//           <canvas
//             ref={previewCanvasRef}
//             style={{ display: "none" }}
//           ></canvas>
//         </div>
//       )}
//     </>
//   );
// };

// export default ImageEditor;