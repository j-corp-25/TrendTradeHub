import React from "react";
import Login from "./Login";
import Register from "./Register";

function Dual() {

    
  return (
    <div class="container" id="container">
      <Login />
      <Register />
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn" onClick={goSignIn}>
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp" onClick={goSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
