import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { BeatLoader } from "react-spinners";
import { Container } from "react-bootstrap";
import fetchProducts from "../../app/productReducer";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../app/userReducer";

function ProductItems() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const sessionUser = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => dispatch(fetchUsers()),[]);
  return (
    <Container>
      <div className="my-5">
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => sessionUser ? navigate(`/product/${product._id}`) : navigate('/login')}>View Details</button>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ProductItems;
