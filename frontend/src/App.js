import NavBar from "./components/common/NavBar";
import { Routes, Route } from "react-router-dom";
import Listings from "./pages/ListingsPage";
import Profile from "./pages/ProfilePage";
import NewProduct from "./components/Products/NewProduct";

import Reviews from "./components/Reviews/ReviewItems";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductItems from "./components/Products/ProductItems";

import ProductUnit from "./components/Products/ProductUnit";
import ProductDetails from "./components/Products/ProductDetails";
import DualSignUpSignIn from "./pages/SignInCreateAccountPage";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/products" element={<Listings />} />
        <Route path="/login" element={<DualSignUpSignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newproduct" element={<NewProduct />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/productUnit" element={<ProductUnit />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
