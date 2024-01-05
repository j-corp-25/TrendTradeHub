import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Listings from "./pages/Listings";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import NewProduct from "./pages/NewProduct";
import ProductUnit from "./components/ProductUnit";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <>
      <NavBar />
      {/* <ToastContainer /> */}
      <div className="">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newproduct" element={<NewProduct />} />

          <Route path="/productUnit" element={<ProductUnit />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
