import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://xeno-78h9.onrender.com/api', // Centralized API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default axiosInstance;
