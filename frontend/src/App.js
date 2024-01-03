import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Listings from "./pages/Listings";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import NewProduct from "./pages/NewProduct";
function App() {
  return (
    <>
        <NavBar />
      <div className="">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newproduct" element={<NewProduct />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
