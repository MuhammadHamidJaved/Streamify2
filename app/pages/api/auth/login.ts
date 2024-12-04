import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { storeTokens } from '../../../utils/authHelpers';
import { TokenResponse } from '../../../types/apiTypes';

// Use environment variables for sensitive data
const API_BASE_URL = process.env.DJANGO_API_BASE_URL || 'http://localhost:8000';
const LOGIN_ENDPOINT = '/login/';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Incoming Login Request:', req.body); // Log request body for debugging

    // Make login request to Django REST API
    const response  = await axios.post<TokenResponse>(
      `${API_BASE_URL}${LOGIN_ENDPOINT}`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json', // Explicitly set content type
        },
      }
    );

    console.log('Response from Django API:', response.data); // Log successful response

    // Destructure tokens and user data
    const { access, refresh, user } = response.data;

    // Store tokens securely (implement `storeTokens` as per your app's needs)
    storeTokens(access, refresh, user);

    // Return the user data as response
    res.status(200).json(user);
  }
  catch (error: any) {
    console.error('Login Error:', error); // Log error for debugging

    // Return error message
    res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data || 'Internal server error' });
  }
}