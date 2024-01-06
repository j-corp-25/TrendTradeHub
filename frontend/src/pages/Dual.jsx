import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import './Dual.css';

function Dual() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const goSignIn = () => {
    setIsSignUpActive(false);
  };

  const goSignUp = () => {
    setIsSignUpActive(true);
  };

  return (
    <div className={`containerDual ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
      <Register />
      <Login />
      
      <div className="overlay-container">
        <div className="overlay">
          <div className={`overlay-panel overlay-left ${isSignUpActive ? 'right-panel-active' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={goSignIn}>
              Sign In
            </button>
          </div>
          <div className={`overlay-panel overlay-right ${isSignUpActive ? 'right-panel-active' : ''}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start the journey with us</p>
            <button className="ghost" id="signUp" onClick={goSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dual;
