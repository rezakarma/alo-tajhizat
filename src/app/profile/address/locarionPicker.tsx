"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import MapView from "./mapView";
import { toast } from "sonner";

const LoactionPicker = ({ location, setLocation }) => {
  const [showLocation, setShowLocation] = useState(location);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const submitLocationHandler = (onClose) => {
    if (showLocation === null || showLocation === undefined) {
      toast.error("لطفا یک مکان را روی نقشه انتخاب کنید س");
      return;
    }
    setLocation(showLocation);
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} variant="bordered" color="primary">
        انتخاب روی نقشه
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                محل دقیق آدرس مورد نظر را انتخاب کنید
              </ModalHeader>
              <ModalBody>
                <MapView
                  selectedLocation={showLocation}
                  setSelectedLocation={setShowLocation}
                  width={600}
                  height={400}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={submitLocationHandler.bind(this, onClose)}
                >
                  تایید محل انتخابی
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoactionPicker;
