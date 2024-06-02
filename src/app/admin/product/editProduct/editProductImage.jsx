import ProductContainerWithScoroll from "@/components/utils/productContainerWithScoroll";
import AddProductImageCard from "@/app/admin/product/addProduct/addProductFrom/ProductImage/addProductImageCard";

import { useEffect, useRef, useState } from "react";

const EditProductImage = ({
  images,
  setImages,
  imageDeleteHandler,
  editedImages,
  setEditedImages,
  isPending,
}) => {
  // const [images, setImages] = useState([]);
  const [linkOfImages, setLinkOfImages] = useState([]);
  useEffect(() => {
    const newImages = images.map((item) => {
      return `${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${item}`;
    });
    setLinkOfImages(newImages);
  }, [images]);

  const inputRef = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleEditItem = (index) => {
    console.log(`Edit button clicked for item at index ${index}`);
    // You can also access the item itself using images[index]
    const editedItem = images[index];
    console.log(editedItem);
    inputRef.current.click();
    const fileInput = inputRef.current;
    fileInput.onchange = (e) => {
      const files = Array.from(e.target.files);
      const selectedImage = files.filter((file) =>
        file.type.startsWith("image/")
      );
      if (!selectedImage) {
        return;
      }
      const imageUrl = selectedImage.map((image) => URL.createObjectURL(image));
      const newImages = [...images];
      newImages[index] = imageUrl;
      setLinkOfImages(newImages);
      const existEditedImages = [...editedImages];
      existEditedImages[index] = [...selectedImage, editedItem]
      setEditedImages(existEditedImages);
      console.log(editedImages)
      const file = fileInput.files[0];
      console.log(file);
    };
    // Do something with the edited item
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    uploadImages(files);
  };

  const uploadImages = (files) => {
    const droppedImages = files.filter((file) =>
      file.type.startsWith("image/")
    );
    const imageUrls = droppedImages.map((image) => URL.createObjectURL(image));
    const newImage = droppedImages.map((images, index) => [
      images,
      imageUrls[index],
    ]);
    setImages([...images, ...newImage]);
  };

  const test = (index) => {
      let newImages = images.filter((element, i) => i!== index);
      console.log(images)
      setImages(newImages)
      console.log(linkOfImages)
      let newLinkOfImages = linkOfImages.filter((element, i) => i!== index)
      setLinkOfImages(newLinkOfImages)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-4  ">
        <input
          disabled={isPending}
          type="file"
          accept="image/*"
          ref={inputRef}
          className="mr-16 hidden"
          // onChange={handleFileInputChange}
          // {...register('productImages')}
        />
      </div>
      {images.length > 0 && (
        <ProductContainerWithScoroll>
          {linkOfImages.map((item, index) => (
            <div key={index}>
              <AddProductImageCard
                img={item}
                key={index}
                index={index}
                onEdit={() => handleEditItem(index)}
                inputRef={inputRef}
                onDelete={test}
                updatimages={true}
              />
            </div>
          ))}
        </ProductContainerWithScoroll>
      )}
    </>
  );
};

export default EditProductImage;
