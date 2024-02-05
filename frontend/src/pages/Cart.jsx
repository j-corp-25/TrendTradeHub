import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../app/cartReducer";
import { fetchProducts } from "../app/productReducer";
import { fetchUsers } from "../app/userReducer";
import { FaTrash } from "react-icons/fa";



const Cart = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchCart(userId));
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch, userId]);

  // Filter products based on the IDs in the cart
  const cartProducts = products.filter((product) =>
    Object.values(cart)[0].includes(product._id)
);
  

  // Calculate total price
  const totalPrice = cartProducts.reduce((total, product) => {
    return total + product.price 
}, 0);

const removeProduct = (productId) =>{
    dispatch(removeFromCart(productId,userId));
}


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
                  <p className="mb-0">You have {Object.values(cart)[0].length} items in your cart</p>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                {/* Loop through cartProducts instead of userCart */}
                {cartProducts.map((product) => (
                  <div key={product._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" , marginBottom:"10px"}}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <img
                          src={product.images[0]} 
                          style={{ width: "65px", borderRadius: "5px" }}
                          alt="Shopping item"
                        />
                      </div>
                      <div style={{ marginLeft: "15px" }}>
                        <h5>{product.title}</h5>
                        <p className="small mb-0">{product.description}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between",  marginRight: "70px", width: "100px"  }}>
                      
                      <div style={{ width: "120px"  }}>
                        <h5 className="mb-0">{product.price}</h5>
                      </div>
                      <div>
                        <a href="#!" style={{ color: "Black" }} onClick={() => removeProduct(product._id)}>
                          <FaTrash/>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ width: "30%", marginLeft: "20px" }}>
              <div style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: "20px" }}>
                  <h5>Card details</h5>
                 
                  <img src={user.image} style={{ width: "45px", borderRadius: "50%" }} alt="Avatar" />
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
                  <p className="mb-2">${totalPrice.toFixed(2)}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="mb-2">Shipping</p>
                  <p className="mb-2">$20.00</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="mb-2">Total(Incl. taxes)</p>
                  <p className="mb-2">${(totalPrice + 20).toFixed(2)}</p>
                </div>

                <button
                  style={{ backgroundColor: "#17a2b8", color: "white", width: "100%", padding: "10px", borderRadius: "5px", marginTop: "20px" }}
                >
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
