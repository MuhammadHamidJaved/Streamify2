import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../constants/apiEndpoints';
import { getRefreshToken, storeTokens, clearTokens } from './authHelpers'; // Assuming clearTokens will log out user
import { TokenResponse } from '../types/apiTypes';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add the Authorization token to every request if available
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and token refreshing when unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle Unauthorized (401) errors by refreshing the token
    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post<TokenResponse>(
            `${API_BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`,
            { refresh: refreshToken }
          );
          // Store the new tokens securely
          storeTokens(data.access, data.refresh);
          
          // Retry the failed request with the new access token
          if (error.config.headers) {
            error.config.headers.Authorization = `Bearer ${data.access}`;
          }
          return axios(error.config); // Retry the original request
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          clearTokens(); // Clear tokens if refresh fails
          window.location.href = '/pages/auth'; // Redirect to login page
        }
      } else {
        // If no refresh token is available, log the user out
        
        clearTokens();
        window.location.href = '/pages/auth'; // Redirect to login page
      }
    }
    return Promise.resolve(error.response);
  }
);

export default axiosInstance;
