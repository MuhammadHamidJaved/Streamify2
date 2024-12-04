import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/config';
import { User } from '../types/apiTypes';

export const storeTokens = (accessToken: string, refreshToken: string, user?: User): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  if(user){
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);

};

import axios from 'axios';

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      alert("You must be logged in to perform this action.");
      return null;
    }

    const response = await axios.post("http://localhost:8000/token/refresh/", {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    const newRefreshToken = response.data.refresh;
    storeTokens(newAccessToken, newRefreshToken);
    console.log("Access token refreshed.");
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    alert("Session expired. Please log in again.");
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    return null;
  }
}