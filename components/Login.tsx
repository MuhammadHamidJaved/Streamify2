import React, { useState } from 'react';
import '../styles/auth.css'; 
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
// import axios from 'axios';
// import { storeTokens } from '@/app/utils/authHelpers';
// import { API_BASE_URL, ENDPOINTS } from '@/app/constants/apiEndpoints';
import handler from '@/app/pages/api/auth/login';
import { NextApiRequest, NextApiResponse} from 'next';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const Signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous errors

   

    const req = {
      body: { email, password },
      method: 'POST',
    } as NextApiRequest;

    const res = {
      status: (code: number) => {
        console.log('Response status:', code);
        return {
          json: (data: any) => {
            console.log('Response data:', data);
            if (code === 200) {
              // Store tokens securely (implement `storeTokens` as per your app's needs)
              // storeTokens(data.access, data.refresh, data.user);
              window.location.href = '/'; // Redirect to home page on success
            } else {
              setErrorMessage(data.message);
            }
          },
        };
      },
    } as NextApiResponse;

    handler(req, res);
    
  };

  return (
    <div className="auth-container">
      <form onSubmit={Signin}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebookF />
          </a>
          <a href="#" className="social">
            <FaGooglePlusG />
          </a>
          <a href="#" className="social">
            <FaLinkedinIn />
          </a>
        </div>
        <span>or use your account</span>
        <div className="infield">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label></label>
        </div>
        <div className="infield">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label></label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <a href="#" className="forgot">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
