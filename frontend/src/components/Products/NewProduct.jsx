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

    images.forEach((image) => {
      formData.append("myPic", image);
    });

    dispatch(addProduct(formData));
  };

  return (
    <div>
      
      <div>
        <label className="label">Author:</label>
        <input className="input" type="text" name="author" onChange={handleInputChange} />
      </div>
      <div>
        <label className="label">Title:</label>
        <input className="input" type="text" name="title" onChange={handleInputChange} />
      </div>
      <div>
        <label className="label">Condition:</label>
        <input className="input" type="text" name="condition" onChange={handleInputChange} />
      </div>
      <div>
        <label className="label">Price:</label>
        <input className="input" type="text" name="price" onChange={handleInputChange} />
      </div>
      <div>
        <label className="label">Category:</label>
        <input  className="input" type="text" name="category" onChange={handleInputChange} />
      </div>
      <div>
        {/* <label className="label">Images:</label> */}
        <input className="input" type="file" name="myPic" onChange={handleImageChange} multiple />
      </div>
      <button onClick={handleAddProduct} className="button-72">Add Product</button>
    </div>
  //    <form className="form-container">
  //    <div className="input-container">
  //      <label htmlFor="base-input" className="label">
  //        Title
  //      </label>
  //      <input type="text" id="base-input" className="input" name="title" onChange={handleInputChange} />
  //    </div>
  //    <div className="input-container">
  //      <label htmlFor="large-input" className="label">
  //        Description
  //      </label>
  //      <input type="text" id="large-input" className="input" />
  //    </div>
  //    <div className="input-container">
  //      <label htmlFor="small-input" className="label">
  //        Condition
  //      </label>
  //      <input type="text" id="small-input" className="input" />
  //    </div>
  //    <div className="input-container">
  //      <label htmlFor="small-input" className="label">
  //        Price
  //      </label>
  //      <input type="text" id="small-input" className="input" />
  //    </div>
  //    <div className="input-container">
  //      <label htmlFor="small-input" className="label">
  //        Cathegory
  //      </label>
  //      <input type="text" id="small-input" className="input" />
  //    </div>
  //    <div className="input-container">
  //      <label htmlFor="small-input" className="label">
  //      </label>
  //      <input type="file" name="myPic" onChange={handleImageChange} multiple id="small-input" className="input" style={{background:"Gray"}} />

  //    </div>
  //      <button class="button-72" role="button" onClick={handleAddProduct}>Add Product</button>

  //  </form>
  );
};

export default NewProduct;
