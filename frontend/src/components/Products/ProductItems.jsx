import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { BeatLoader } from "react-spinners";
import { Container } from "react-bootstrap";
import fetchProducts from "../../app/productReducer";
import { reset } from "../../app/userReducer";

function ProductItems() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    // Reset the state when the component mounts
    dispatch(reset());

    // Fetch products
    dispatch(fetchProducts());

  }, [dispatch]);
  return (
    <Container>
      <div className="my-5">
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            {/* <button onClick={() => navigate(`/product/${product._id}`)}>View Details</button> */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ProductItems;
