import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { DeleteIcon } from "../../../../../../../public/assets/AdminTable/Delete";
import { EditIcon } from "../../../../../../../public/assets/AdminTable/EditIcon";

const AddProductImageCard = (props) => {

const deleteHandel =() =>{
  if(props.updatimages){
    props.onDelete(props.index)
  }else{
    props.onDelete(props.img)
  }
}

const editHandel =() =>{
  props.onEdit()
  // if (props.inputRef.current) {
  //   props.inputRef.current.click();
  // }
}

  return (
    <Card className="mt-2 w-40 h-40 rounded-md" shadow="sm" isPressable>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt=""
          className="w-full object-cover h-[140px]"
          src={props.img}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <button className="text-danger" type="button" onClick={deleteHandel}>
          <DeleteIcon />
        </button>
        <button onClick={editHandel} type="button">
          <EditIcon />
        </button>
      </CardFooter>
    </Card>
  );
};

export default AddProductImageCard;
