import React, { useState } from 'react';
import '../styles/auth.css'; 
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';
import { storeTokens} from '@/app/utils/authHelpers';
import { API_BASE_URL, ENDPOINTS } from '@/app/constants/apiEndpoints';

const Signup = () => {
  // const { setSession } = useSessionA();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
  
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.REGISTER}`,
        {
          username,
          email,
          password,
          confirm_password: confirmPassword, // Match this field to the backend's expected naming
        },
        {
          headers: { 'Content-Type': 'application/json' }, // Set headers here
        }
      );
  
      const { access, refresh } = response.data;
      storeTokens(access, refresh); // Save tokens in localStorage
      setSuccess('Account created successfully!');
      // Redirect to dashboard or any protected route
      window.location.href = '/';
    } catch (error: any) {
      setError(
        error?.response?.data?.non_field_errors || 'An error occurred'
      );
    }
  };
  

  return (
    <>
      <form onSubmit={handleSignup}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <div className="infield">
          <input 
            type="text" 
            placeholder="Name" 
            value={username} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="infield">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="infield">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="infield">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Signup;
