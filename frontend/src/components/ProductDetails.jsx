import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { FaCartPlus, FaAngleRight,  FaCartArrowDown} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReviewItems from "./Reviews/ReviewItems";
import "./ProductDetails.css";
import {
  fetchSingleProduct,
  fetchRelatedProducts,
  fetchProducts,
} from "../app/product";
import ProductUnit from "./ProductUnit";

function ProductDetails() {
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct) || {};
  const { title, price, images, _id } = product;
  const relatedProductIds = useSelector(
    (state) => state.products.relatedProductIds
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSingleProduct(productId));
        await dispatch(fetchRelatedProducts(productId));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, productId]);

  useEffect(() => {
    const fetchAll = async () => {
      await dispatch(fetchProducts());
      setLoading(false);
    };

    fetchAll();
  }, [dispatch]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {/* {!loading && (
        <section>
          <div className="container my-5">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                <div className="card w-100 my-2 shadow-2-strong">
                  <div className="product-details">
                    <div className="image-details">
                      <img
                        src={images[currentImageIndex]}
                        alt={title}
                        className="card-img-top"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                      {images?.length > 1 && (
                        <FaAngleRight
                          className="right-arrow"
                          onClick={handleNextImage}
                          style={{ opacity: "2", right: "5px", top: "50%" }}
                        />
                      )}
                    </div>
                    <div className="prod-info">
                      <h1>{title}</h1>
                      <h2>${price}</h2>
                      <ReviewItems productId={productId}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sugg">
                <h4>Related Products</h4>
                <div className="col-12">
                  {relatedProductIds?.length > 0 &&
                    relatedProductIds?.map((relatedProductId) => (
                      <ProductUnit
                        key={relatedProductId}
                        productId={relatedProductId}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )} */}
      <section className="container-product-details main-body">
        <div className="title"> Product Details</div>
        <div className="detail">
          <div className="image">
            <img src={product.images[0]} alt="" />
          </div>
          <div className="content">
            <h1 className="name"> Title: {product.title}</h1>
            <div className="price"> Price: {product.price}</div>
            <div className="category">Category: {product.category}</div>
            <div className="buttons">
              <button>Checkout</button>
              <button>Add To Cart
                <span>
                  <FaCartArrowDown/>

                </span>
              </button>
            </div>
            <div className="description"></div>
          </div>
        </div>
        <div className="title">Related Products</div>
        <div className="listProduct"></div>

      </section>
    </>
  );
}

export default ProductDetails;
