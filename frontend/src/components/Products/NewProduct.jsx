// NewProduct.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts } from "../../app/productReducer";
import './NewProduct.css'

const NewProduct = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);
  const [productData, setProductData] = useState({
    author: userId,
    title: "",
    condition: "",
    price: "",
    category: "",
    description: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages([...files]);
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append("author", userId);
    formData.append("title", productData.title);
    formData.append("condition", productData.condition);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("description", productData.description);

    images.forEach((image) => {
      formData.append("myPic", image);
    });

    dispatch(addProduct(formData));
  };

  return (
    <div className="form-container-create">
      
     
      <div className="input-container">
        <label className="label">Title:</label>
        <input className="input" type="text" name="title" onChange={handleInputChange} />
      </div>
      <div className="input-container">
        <label className="label">Description:</label>
        <input className="input" type="text" name="description" onChange={handleInputChange} />
      </div>
      <div className="input-container">
        <label className="label">Condition:</label>
        <input className="input" type="text" name="condition" onChange={handleInputChange} />
      </div>
      <div className="input-container">
        <label className="label">Price:</label>
        <input className="input" type="text" name="price" onChange={handleInputChange} />
      </div>
      <div className="input-container">
        <label className="label">Category:</label>
        <input  className="input" type="text" name="category" onChange={handleInputChange} />
      </div>
      <div className="input-container">
        {/* <label className="label">Images:</label> */}
        <input className="input" type="file" name="myPic" onChange={handleImageChange} multiple />
      </div>
      <button onClick={handleAddProduct} className="button-72">Add Product</button>
    </div>
  );
};

export default NewProduct;
