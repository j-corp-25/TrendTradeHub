// AddProduct.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, fetchProducts } from '../app/product';

const NewProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    author: '',
    title: '',
    condition: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  },[]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddProduct = () => {
    dispatch(addProduct(productData));
  };

  return (
    <div>
      <h1>Add Product</h1>
      <div>
        <label>Author:</label>
        <input type="text" name="author" onChange={handleInputChange} />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" name="title" onChange={handleInputChange} />
      </div>
      <div>
        <label>Condition:</label>
        <input type="text" name="condition" onChange={handleInputChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" name="price" onChange={handleInputChange} />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" name="category" onChange={handleInputChange} />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default NewProduct;
