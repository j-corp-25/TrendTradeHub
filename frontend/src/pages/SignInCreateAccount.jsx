import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, login, register } from "../app/userReducer";
import "../pageStyles/SignInCreateAccount.css";
import { BeatLoader } from "react-spinners";
import { Container } from "react-bootstrap";

const SignInCreateAccount = () => {
  const [isActive, setIsActive] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/products");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.password2) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(register(registerData));
  };

  const handleInputChange = (e, form) => {
    const { name, value } = e.target;
    if (form === "login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegisterClick = () => {
    setIsActive(false);
  };

  const handleLoginClick = () => {
    setIsActive(true);
  };

  if (isLoading) {
    return (
      <Container className="my-6">
        <div>
          <BeatLoader />
        </div>
      </Container>
    );
  }

  return (
    <>
      <section className="main-sign-register">
        <div
          className={`container-sign-register ${isActive ? "active" : ""}`}
          id="container-sign-register"
        >
          <div className="form-container sign-up">
            <form onSubmit={handleRegister}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={registerData.name}
                onChange={(e) => handleInputChange(e, "register")}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={registerData.email}
                onChange={(e) => handleInputChange(e, "register")}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={registerData.password}
                onChange={(e) => handleInputChange(e, "register")}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={registerData.password2}
                onChange={(e) => handleInputChange(e, "register")}
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <span>Use your email and password</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={(e) => handleInputChange(e, "login")}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, "login")}
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-right">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="hidden" onClick={handleLoginClick}>
                  Sign Up
                </button>
              </div>
              <div className="toggle-panel toggle-left">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button className="hidden" onClick={handleRegisterClick}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInCreateAccount;
