import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {profileEditMoadalAction} from '../../store/profileEditModal-slice';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { uiActions } from "@/store/ui-slice";



const ProfileEditorModal = (props) => {
    const modalState = useSelector((state) => state.profileEditModal[props.modalID])
    const dispatch = useDispatch();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();



    return ( 
        <Modal isOpen={modalState} onOpenChange={onOpenChange}
        onClose={() => {dispatch(profileEditMoadalAction.closeModal(props.modalID))
          dispatch(
            uiActions.showNotification({
              status: null,
              message: null
            })
          );
        }}
        scrollBehavior='inside'
        size={props.size && props.size}
        backdrop='blur'
        isDismissable={props.isDismissable && props.isDismissable}
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
              <ModalBody>
                {props.children}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
     );
}
 
export default ProfileEditorModal;