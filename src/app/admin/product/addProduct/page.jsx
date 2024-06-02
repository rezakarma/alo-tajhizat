"use client";
import TableProduct from "./tableProduct/tableProduct";
import AddProductForm from "./addProductFrom/AddProductForm";
import ProductsList from '../productsList/productsList'
import EditProducts from "../editProduct/editProduct";
const AddProduct = () => {
  return (
    <div className='w-full '>

      <AddProductForm productId='6632b8aa38b1cd6bdfa58426'/>
      <ProductsList/>
      
    </div>
  );
};

export default AddProduct;
