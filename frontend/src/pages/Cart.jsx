import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../app/cartReducer";
import { useEffect } from "react";
import { fetchProducts } from "../app/productReducer";
import { fetchUsers } from "../app/userReducer";

const Cart = () => {
  const userId = useSelector(state=> state.auth.user._id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers()) },[]);
  


  return (
    <div>
      <section style={{ backgroundColor: "#eee", padding: "50px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "70%" }}>
              <h5>
                <a href="#!" style={{ textDecoration: "none", color: "black" }}>
                  ← Continue shopping
                </a>
              </h5>

              <hr />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                  <p className="mb-1">Shopping cart</p>
                  <p className="mb-0">You have 4 items in your cart</p>
                </div>
                <div>
                  <p style={{ color: "#cecece" }}>
                    <span className="text-muted">Sort by:</span>
                    <a href="#!" style={{ textDecoration: "none", color: "black" }}>
                      price
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                //Loop through userCart
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                        style={{ width: "65px", borderRadius: "5px" }}
                        alt="Shopping item"
                      />
                    </div>
                    <div style={{ marginLeft: "15px" }}>
                      <h5>Iphone 11 pro</h5>
                      <p className="small mb-0">256GB, Navy Blue</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "50px" }}>
                      <h5 className="fw-normal mb-0">2</h5>
                    </div>
                    <div style={{ width: "80px" }}>
                      <h5 className="mb-0">$900</h5>
                    </div>
                    <div>
                       <a href="#!" style={{ color: "#cecece" }}>
                        Remove
                      </a>
                    </div>
                     
                    
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: "30%", marginLeft: "20px" }}>
              <div style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h5>Card details</h5>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    style={{ width: "45px", borderRadius: "50%" }}
                    alt="Avatar"
                  />
                </div>

                <p className="small">Card type</p>
                <div style={{ display: "flex" }}>
                  <a href="#!" style={{ color: "white", marginRight: "10px" }}>
                    <i className="fab fa-cc-mastercard fa-2x"></i>
                  </a>
                  <a href="#!" style={{ color: "white", marginRight: "10px" }}>
                    <i className="fab fa-cc-visa fa-2x"></i>
                  </a>
                  <a href="#!" style={{ color: "white", marginRight: "10px" }}>
                    <i className="fab fa-cc-amex fa-2x"></i>
                  </a>
                  <a href="#!" style={{ color: "white", marginRight: "10px" }}>
                    <i className="fab fa-cc-paypal fa-2x"></i>
                  </a>
                </div>

                <hr />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="mb-2">Subtotal</p>
                  <p className="mb-2">$4798.00</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="mb-2">Shipping</p>
                  <p className="mb-2">$20.00</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="mb-2">Total(Incl. taxes)</p>
                  <p className="mb-2">$4818.00</p>
                </div>

                <button style={{ backgroundColor: "#17a2b8", color: "white", width: "100%", padding: "10px", borderRadius: "5px", marginTop: "20px" }}>
                  Checkout <i className="fas fa-long-arrow-alt-right" style={{ marginLeft: "5px" }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
