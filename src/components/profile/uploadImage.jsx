import ProductContainerWithScoroll from "@/components/utils/productContainerWithScoroll";
import AddProductImageCard from "@/app/admin/product/addProduct/addProductFrom/ProductImage/addProductImageCard";
import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
const UploadImage = ({image, setImage, imageDeleteHandler}) => {
    // const [images, setImages] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const droppedImage = files.filter((file) => file.type.startsWith('image/'));

    if (droppedImage.length > 1) {
      
      alert("لطفا یک عکس را بکشید و رها کنید");
      return;
    }
    if(!droppedImage){
      return
    }
    uploadImages(droppedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    const selectedImage = files.filter((file) => file.type.startsWith('image/'));
    uploadImages(selectedImage);
  };

  const uploadImages = (files) => {
    const droppedImage = files.filter((file) => file.type.startsWith('image/'));
    const imageUrl = droppedImage.map((image) => URL.createObjectURL(image));
    console.log(droppedImage)
    if(!droppedImage){
      return
    }
    setImage([droppedImage[0],imageUrl]);
  };

    const inputRef = useRef(null);
  
    const handleButtonClick = (e) => {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

  return (
    <div className="flex flex-col xl:flex-row w-9/12 xl:w-full mx-auto gap-2  ">
    <div
      className="flex justify-center  border-2 border-dashed border-gray-400 rounded-xl"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      >
      <div className="m-4 w-9/12 ">
        <h2 className="text-lg font-semibold">عکس رابه اینجا بکشید و رها کنید</h2>
        <p className="text-sm text-gray-500">عکس را در این کادر بیندازید یا اینکه ان را بارگذاری کنید</p>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileInputChange}
          className="w-9/12"
          />
      </div>
    </div>
    {image.length > 0 && (
          
            
              <div>
                <AddProductImageCard
                  img={image[1]}
                  onDelete={imageDeleteHandler}
                  onEdit={handleButtonClick}
                  inputRef={inputRef}
                  />
                  {console.log(image)}
              </div>
        )}
        </div>
  );
}
 
export default UploadImage;


