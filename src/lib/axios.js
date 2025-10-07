import axios from 'axios';

import baseUrl from './baseUrl';

// Create an instance of Axios
const instance = axios.create({
  baseURL: baseUrl, // Your API base URL
  timeout: 10000, // Request timeout in milliseconds
});

export default instance;