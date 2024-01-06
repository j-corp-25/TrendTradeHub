import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Listings from "./pages/Listings";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import NewProduct from "./pages/NewProduct";

import Reviews from "./components/Reviews/ReviewItems";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductItems from "./components/Products/ProductItems";

import ProductUnit from "./components/ProductUnit";
import ProductDetails from "./components/ProductDetails";
import Dual from "./pages/Dual";
import Dual2 from "./pages/SignInCreateAccount";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/login" element={<Dual2 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newproduct" element={<NewProduct />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/productUnit" element={<ProductUnit />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/dual/*" element={<Dual />} />
      </Routes>
    </>
  );
}

export default App;
