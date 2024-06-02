"use client";

import { useState } from "react";
import AddProductForm from "../addProductFrom/AddProductForm";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import  prisma  from "../../../../../prisma/client";

const EditProductModal = async ({ productInfo, onSave, onCancel })=> {
  const [editedProduct, setEditedProduct] = useState(productInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();

// const product = await prisma.product.findUnique({
//   where:{id: params.id}
// })

  const handleOpen = () => {
    onOpen();
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedProduct({
  //     ...editedProduct,
  //     [name]: value,
  //   });
  // };

  const handleSave = () => {
    onSave(editedProduct);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-primary text-gray-200 font-semibold text-lg hover:scale-110 hover:transition hover:duration-700 hover:ease-in-out"
          onPress={() => handleOpen()}
        >
          Edit
        </Button>
      </div>
      <Modal
        backdrop="blur"
        scrollBehavior="inside"
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <AddProductForm
                  // product={product}
                  product={editedProduct}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProductModal;
