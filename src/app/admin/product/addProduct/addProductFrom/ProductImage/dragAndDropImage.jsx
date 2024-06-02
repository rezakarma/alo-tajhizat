import ProductContainerWithScoroll from "@/components/utils/productContainerWithScoroll";
import AddProductImageCard from "./addProductImageCard";
import { useRef } from "react";

const DragAndDropImage = ({images, setImages, imageDeleteHandler,register,isPending}) => {
    // const [images, setImages] = useState([]);

    const inputRef = useRef(null);
  
    const handleButtonClick = (e) => {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    uploadImages(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    uploadImages(files);
  };

  const uploadImages = (files) => {
    const droppedImages = files.filter((file) => file.type.startsWith('image/'));
    const imageUrls = droppedImages.map((image) => URL.createObjectURL(image));
    const newImage = droppedImages.map((images, index) => [images , imageUrls[index]])
    setImages([...images, ...newImage]);
  };

  return (
    <>
    <div
    disabled={isPending}
      className="flex justify-center border-2 border-dashed border-gray-400 p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      >
      <div className="flex flex-col justify-center items-center m-4  ">
        <h2 className="text-lg font-semibold">Drag and Drop Images</h2>
        <p className="text-sm text-gray-500">Drop images here to upload or</p>
        <input
        disabled={isPending}
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          className="mr-16"
          onChange={handleFileInputChange}
          // {...register('productImages')}
          />
      </div>
    </div>
    {images.length > 0 && (
          <ProductContainerWithScoroll>
            {images.map((item, index) => (
              <div key={index}>
                <AddProductImageCard
                  img={item[1]}
                  key={index}
                  onEdit={handleButtonClick}
                  inputRef={inputRef}
                  onDelete={imageDeleteHandler}
                  />
                  {console.log(item)}
              </div>
              ))}
          </ProductContainerWithScoroll>
        )}
        </>
  );
}
 
export default DragAndDropImage;