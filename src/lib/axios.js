import axios from 'axios';

import baseUrl from './baseUrl';

// Create an instance of Axios
const instance = axios.create({
  baseURL: baseUrl, // Your API base URL
  timeout: 30000, // Request timeout in milliseconds (30s for Render cold start)
});

// Retry logic: retry once on timeout or network error
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (
      !config._retry &&
      (error.code === 'ECONNABORTED' || !error.response)
    ) {
      config._retry = true;
      return instance(config);
    }
    return Promise.reject(error);
  }
);

export default instance;