"use client"
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import Dot3Svg from "../../../../../public/assets/product/dot3Svg";

const ImageModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pickedImage, setPickedImage] = useState(0);

  const handleOpen = () => {
    onOpen();
  };

  const pickImageHandler = (index) => {
    setPickedImage(index);
  };

  return (
    <>
      <div
        onClick={() => handleOpen()}
        className="h-[80px] w-[80px] bg-white rounded-2xl relative flex justify-center items-center"
      >
        <div className="absolute flex items-center justify-center w-full h-full z-10">
          <Dot3Svg />
        </div>

        <div className="absolute w-[80px] h-[80px] inset-0 rounded-xl bg-gray-200 overflow-hidden z-1">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${props.OpenerbgImage}`}
            alt="NextUI Fruit Image with Zoom"
            className="object-cover w-full h-full filter blur-sm opacity-70 z-1"
          />
        </div>
      </div>

      <Modal backdrop="blur" size="3xl" isOpen={isOpen} onClose={onClose} scrollBehavior='inside'  classNames={{
          closeButton: "left-0 right-auto ml-2",
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
               تصاویر محصول
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-evenly">
                  <div className="h-[300px] w-[300px] rounded-2xl overflow-hidden">
                  <Image
                  shadow="md"
                  isBlurred
                    className="h-[300px] w-[300px] object-contain rounded-2xl"
                    alt="picked image"
                    src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${props.images[pickedImage]}`}
                  />
                  </div>
                  <div className="flex flex-col gap-10">
                    <div>{props.title}</div>
                  <div className="grid grid-cols-3 gap-3 h-[170px] ">
                    {props.images.map((item, index) => (
                      <Image
                      width='80'
                      height='80'
                        key={index}
                        onClick={() => pickImageHandler(index)}
                        className="w-[80px] h-[80px] rounded-xl object-cover"
                        alt="NextUI Fruit Image with Zoom"
                        src={`${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${item}`}
                      />
                    ))}

                  </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
