import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BASE_URL, ENDPOINTS } from '../../../constants/apiEndpoints';
import { clearTokens } from '../../../utils/authHelpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await axios.post(`${API_BASE_URL}${ENDPOINTS.LOGOUT}`, {}, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    clearTokens();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data || 'Internal server error' });
  }
}
