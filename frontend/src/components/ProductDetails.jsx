import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { FaCartPlus, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct, fetchRelatedProducts } from "../app/product";
import ProductUnit from "./ProductUnit";

function ProductDetails() {
  const {productId} = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct) || {};
  const { title, price, images, _id } = product;
  const relatedProducts = useSelector((state) => state.products.relatedProduct) || {};

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchRelatedProducts(productId));
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
        <h2>${price}</h2>
      </div>
    </div>

    <div className="sugg">
        <h4>Related Products</h4>
        {/* <div className="same-cat">
        {relatedProducts && relatedProducts.map((relatedProduct) => (
            <ProductUnit key={relatedProduct._id} product={relatedProduct} />
          ))}
        </div> */}
    </div>
    </>
   
  );
}

export default ProductDetails;
