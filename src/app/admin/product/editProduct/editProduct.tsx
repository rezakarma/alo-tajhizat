import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";
import AddProductForm from "../addProduct/addProductFrom/AddProductForm";


const EditProducts = (props) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    console.log('btn clicked')
    return (
      <div className="flex flex-col gap-2">
        <Button onPress={onOpen}>ویرایش </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior='inside'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                <AddProductForm productId={props.id}/>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  
 
export default EditProducts;