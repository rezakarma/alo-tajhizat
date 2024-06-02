"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "../../../../../../public/assets/AdminTable/Delete";
import { useForm } from "react-hook-form";
const ModalDetails = ({data,setData,setDetils,isPending}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };



  const handleAddRow = () => {
    setData([...data, { title: "", description: "" }]);
    console.log(data)
    setValue("details", data)
  };

  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...data];
    newData[index][name] = value;
    setData(newData);
  };
  
  const submitHandler = () => {
    console.log(data)
    setDetils(data)
    // dispatch({ type: 'SET_NEW_DETAILS', payload: data});
    // onClose();
  };

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      details: []
    },
  });



  const onSubmit = (value) => {
    console.log(value)
    console.log(data)
    // const productDetails = data.map((row) => ({
    //   title: row.title,
    //   description: row.description,
    // }));
    // console.log(productDetails)
  }


  
  return (
    <form>
      <div className="flex flex-wrap gap-3">
        <Button
        isDisabled={isPending}
          className="bg-primary m-10 font-semibold text-lg hover:scale-110 hover:transition hover:duration-700 hover:ease-in-out"
          onPress={() => handleOpen()}
        >
          + جزییات
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <div className="container mx-auto mt-8">
                  <table className="table-auto w-full border-collapse border border-gray-400">
                    <thead>
                      <tr>
                        <th className="border border-gray-400 px-4 py-2">
                          Column 1
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                          Column 2
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                          Actions
                        </th>{" "}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-400 px-4 py-2">
                            <input
                              type="text"
                              name="title"
                              value={row.title}
                              
                              // {...register(`details.${index}.title`)}
                              onChange={(e) => handleChange(index, e)}
                              className="w-full"
                            />
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            <input
                              type="text"
                              name="description"
                              value={row.description}
                              // {...register(detailsDescription)}
                              // {...register(`details.${index}.description`)}
                              onChange={(e) => handleChange(index, e)}
                              className="w-full"
                            />
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            <Button
                              onClick={() => handleDeleteRow(index)}
                              className="flex  justify-center items-center text-danger  "
                            >
                              <DeleteIcon/>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex gap-5 py-5">
                  <Button
                    className="mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
                    onClick={handleAddRow}
                  >
                    +اضافه کردن
                  </Button>
                  <Button
                    className="mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
                    onClick={submitHandler}
                    // type="submit"
                  >
                    ثبت
                  </Button>
                  </div>
                </div>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
};

export default ModalDetails;



// "use client";

// import { useState } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalBody,
//   Button,
//   useDisclosure,
// } from "@nextui-org/react";
// import { DeleteIcon } from "../../../../../../public/assets/AdminTable/Delete";
// import { useForm } from "react-hook-form";

// const ModalDetails = ({ dispatch, detailsDescription, detailsTitle }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [data, setData] = useState([{ title: detailsTitle, description: detailsDescription }]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       details: []
//     },
//   });

//   const handleOpen = () => {
//     onOpen();
//   };

//   const handleAddRow = () => {
//     setData([...data, { title: "", description: "" }]);
//   };

//   const handleDeleteRow = (index) => {
//     const newData = [...data];
//     newData.splice(index, 1);
//     setData(newData);
//   };

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const newData = [...data];
//     newData[index][name] = value;
//     setData(newData);
//   };

//   const submitHandler = () => {
//     const productDetails = data.map((row) => ({
//       title: row.title,
//       description: row.description,
//     }));
//     dispatch({ type: "SET_NEW_DETAILS", payload: productDetails });
//     onClose();
//   };

//   const onSubmit = (value) => {
//     console.log(value)
//     const productDetails = data.map((row) => ({
//       title: row.title,
//       description: row.description,
//     }));
//     console.log(productDetails)
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="flex flex-wrap gap-3">
//         <Button
//           className="bg-primary m-10 font-semibold text-lg hover:scale-110 hover:transition hover:duration-700 hover:ease-in-out"
//           onPress={() => handleOpen()}
//         >
//           + جزییات
//         </Button>
//       </div>
//       <Modal
//         backdrop="blur"
//         scrollBehavior="inside"
//         size="5xl"
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalBody>
//                 <div className="container mx-auto mt-8">
//                   <table className="table-auto w-full border-collapse border border-gray-400">
//                     <thead>
//                       <tr>
//                         <th className="border border-gray-400 px-4 py-2">
//                           Column 1
//                         </th>
//                         <th className="border border-gray-400 px-4 py-2">
//                           Column 2
//                         </th>
//                         <th className="border border-gray-400 px-4 py-2">
//                           Actions
//                         </th>{" "}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {data.map((row, index) => (
//                         <tr key={index}>
//                           <td className="border border-gray-400 px-4 py-2">
//                             <input
//                               type="text"
//                               name="title"
//                               value={row.title}
//                               {...register(`details.${index}.title`)}
//                               onChange={(e) => handleChange(index, e)}
//                               className="w-full"
//                             />
//                           </td>
//                           <td className="border border-gray-400 px-4 py-2">
//                             <input
//                               type="text"
//                               name="description"
//                               value={row.description}
//                               {...register(`details.${index}.description`)}
//                               onChange={(e) => handleChange(index, e)}
//                               className="w-full"
//                             />
//                           </td>
//                           <td className="border border-gray-400 px-4 py-2">
//                             <Button
//                               onClick={() => handleDeleteRow(index)}
//                               className="flex  justify-center items-center text-danger  "
//                             >
//                               <DeleteIcon />
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <div className="flex gap-5 py-5">
//                     <Button
//                       className="mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
//                       onClick={handleAddRow}
//                     >
//                       +اضافه کردن
//                     </Button>
//                     <Button
//                       className="mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
//                       // onClick={submitHandler}
//                       type="submit"
//                     >
//                       ثبت
//                     </Button>
//                   </div>
//                 </div>
//               </ModalBody>
//             </>
//           )}

// </ModalContent>
//     </Modal>
//      </form>
//    );
//  };

//  export default ModalDetails;