import axiosInstance from 'axios';

import { API_BASE_URL } from 'shared/config';

export const axios = axiosInstance.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
