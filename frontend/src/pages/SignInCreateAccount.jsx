import React, { useState } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaGithubAlt,
} from "react-icons/fa";
import { reset, login, register } from "../app/user";
import "./SignInCreateAccount.css";
const SignInCreateAccount = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(false);
  };

  const handleLoginClick = () => {
    setIsActive(true);
  };
  return (
    <>
      <section className="main-sign-register">
        <div className={`container-sign-register ${isActive ? "active" : ""}`} id="container-sign-register">
          <div className="form-container sign-up">
            <form>
              <h1>Create Account</h1>
              {/* <div className="social-icons">
                <a href="" className="icon">
                  <FaGoogle />
                </a>
                <a href="" className="icon">
                  <FaFacebook />
                </a>
                <a href="" className="icon">
                  <FaLinkedin />
                </a>
                <a href="" className="icon">
                  <FaGithubAlt />
                </a>
              </div> */}
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              {/* <div className="social-icons">
                <a href="" className="icon">
                  <FaGoogle />
                </a>
                <a href="" className="icon">
                  <FaFacebook />
                </a>
                <a href="" className="icon">
                  <FaLinkedin />
                </a>
                <a href="" className="icon">
                  <FaGithubAlt />
                </a>
              </div> */}
              <span>Use your email and password</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="">Forgot Your Password?</a>
              <button>Sign In</button>
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
