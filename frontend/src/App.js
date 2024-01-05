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

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      {/* <Reviews/> */}
      <div className="">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
