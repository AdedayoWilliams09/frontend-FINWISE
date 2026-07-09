// FILE: finwise/frontend/src/utils/axiosConfig.js
// LINE: Entire file

//  Child Explanation:
// This is the messenger we use to talk to the backend.
// We give it the address and tell it how to behave.

//  Technical Explanation:
// Axios instance with base configuration for API calls.
// Interceptors handle request/response logging and error handling.

import axios from 'axios';

//  Child Explanation:
// Get the backend address from our secret notebook.
// If it's not there, use the local address.

//  Technical Explanation:
// VITE_API_URL is an environment variable set in .env
// Fallback to localhost for development if not set
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

//  Child Explanation:
// Create a special messenger with the correct address.

//  Technical Explanation:
// Create an axios instance with default configuration
// This instance will be used for all API calls
const axiosInstance = axios.create({
  // Base URL for all requests
  baseURL: API_URL,
  // Request timeout (10 seconds)
  timeout: 10000,
  // Default headers for all requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ────────────────────────────────────────────────
// Request Interceptor
// ────────────────────────────────────────────────

//  Child Explanation:
// Before the messenger leaves, we check what it's carrying.
// We log it so we know what's being sent.

//  Technical Explanation:
// Request interceptor runs before the request is sent
// Used for logging and modifying request configuration
axiosInstance.interceptors.request.use(
  (config) => {
    // Log the request in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(` [${config.method?.toUpperCase()}] ${config.url}`, {
        data: config.data,
        params: config.params,
      });
    }
    
    // You can add authentication tokens here in future phases
    // Example: config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  (error) => {
    // If there's an error configuring the request
    console.error(' Request Error:', error);
    return Promise.reject(error);
  }
);

// ────────────────────────────────────────────────
// Response Interceptor
// ────────────────────────────────────────────────

//  Child Explanation:
// When the messenger comes back, we check what they brought.
// If it's good, we log it. If there's a problem, we handle it.

//  Technical Explanation:
// Response interceptor runs when a response is received
// Used for logging and global error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(` [${response.status}] ${response.config.url}`, {
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside the range of 2xx
      console.error(` API Error [${error.response.status}]:`, {
        url: error.config?.url,
        data: error.response.data,
        status: error.response.status,
      });
      
      // Add more specific error handling based on status code
      if (error.response.status === 404) {
        console.warn(' The requested resource was not found.');
      } else if (error.response.status === 500) {
        console.warn(' Server error occurred. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error(' No response from server:', {
        url: error.config?.url,
        message: error.message,
      });
      // Create a custom error for network failures
      error.message = 'Network error - please check if the backend is running';
    } else {
      // Something happened in setting up the request
      console.error(' Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

//  Child Explanation:
// We export the messenger so other files can use it.

//  Technical Explanation:
// Export the configured axios instance for use in other modules
export default axiosInstance;