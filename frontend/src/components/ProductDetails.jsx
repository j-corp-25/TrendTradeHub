import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { FaCartPlus, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../app/product";

function ProductDetails() {
  const {productId} = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct) || {};
  const { title, price, images, _id } = product;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <> 
    <div className="product-details">
      <div className="image-details">
        {console.log(product)}
        <img
          src={
            images?.length > 0 ? images[currentImageIndex] : "default-image-url"
          }
          alt={title}
        />
        {images?.length > 1 && (
            <FaAngleRight className="right-arrow" onClick={handleNextImage} style={{opacity:"2", right:"5px", top:"50%"}} />
          )}
      </div>
      <div className="prod-info">
        <h1>{title}</h1>
        <h2>${price.toFixed(2)}</h2>
      </div>
    </div>

    <div className="sugg">
        <h4>In the same category</h4>
        <div className="same-cat">
            
        </div>
    </div>
    </>
   
  );
}

export default ProductDetails;
