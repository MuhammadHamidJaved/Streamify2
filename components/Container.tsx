"use client"; 

import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import '../styles/auth.css'; 

const Container: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
     { isSignUp?<div className={`form-container sign-up-container ${isSignUp ? 'active' : ''}`}>
        <Signup />
      </div>:<div className={`form-container sign-in-container ${isSignUp ? '' : 'active'}`}>
        <Login />
      </div>}
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
         { isSignUp?<div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button id="overlayBtn" onClick={toggleForm}>Sign In</button>
          </div>:<div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button id="overlayBtn" onClick={toggleForm}>Sign Up</button>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Container;
