"use client";

import { useState,useEffect } from 'react';
import EditProductModal from './editProductModal'
import { BiDotsVerticalRounded } from "react-icons/bi";
import Product from './product.json'


const ProductTable =  ({ onUpdateProduct }) => {

  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  
  const fetchData = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (Product) => {
    setEditingProduct({...Product});
  };

  const handleSave = () => {
    onUpdateProduct({...editingProduct});
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleChange = (e, field) => {
    setEditingProduct({
      ...editingProduct,
      [field]: e.target.value,
    });
  };

  return (
    <div className="mb-10 ">
      <table className="w-8/12 mx-auto  md:w-11/12 ">
        <thead className=" bg-gray-50">
          <tr className=' px-6 py-3 xl:text-left text-xs font-medium text-gray-500 uppercase tracking-wider' >
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Product.map((pro) => (
            <tr key={pro.id}>
              <td className="px-0 py-4 ">
                {editingProduct && editingProduct.id === pro.id ? (
                  <input type="text" value={editingProduct.title} onChange={(e) => handleChange(e, 'title')} />
                ) : (
                  <span>{pro.title}</span>
                )}
              </td>
              <td className="px-5 py-4 ">
                {editingProduct && editingProduct.id === pro.id ? (
                  <input type="text" value={editingProduct.price} onChange={(e) => handleChange(e, 'price')} />
                ) : (
                  <span>{pro.price}</span>
                )}
              </td>
              <td className="px-6 py-4 ">
                {editingProduct && editingProduct.id === pro.id ? (
                  <input type="text" value={editingProduct.description} onChange={(e) => handleChange(e, 'description')} />
                ) : (
                  <span>{pro.description}</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                {editingProduct && editingProduct.id === pro.id ? (
                     <EditProductModal
                     productInfo={editingProduct}
                     onSave={handleSave}
                     onCancel={handleCancel}
                   />
                ) : 
                (
                  <BiDotsVerticalRounded  className="text-primary cursor-pointer w-10 h-7 " onClick={() => handleEdit(pro)}/>
                )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
