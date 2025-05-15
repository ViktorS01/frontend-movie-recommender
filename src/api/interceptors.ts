import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Add a request interceptor
export const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get token from localStorage or other storage
      const token = localStorage.getItem('token');
      
      // If token exists, add it to the headers
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error: AxiosError) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};

// Add a response interceptor
export const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    (error: AxiosError) => {
      // Handle different error statuses
      if (error.response) {
        const { status } = error.response;
        
        // Handle 401 Unauthorized - redirect to login
        if (status === 401) {
          // Clear token and user data
          localStorage.removeItem('token');
          
          // Redirect to login page
          window.location.href = '/login';
        }
        
        // Handle 403 Forbidden
        if (status === 403) {
          console.error('Access forbidden');
        }
        
        // Handle 404 Not Found
        if (status === 404) {
          console.error('Resource not found');
        }
        
        // Handle 500 Internal Server Error
        if (status >= 500) {
          console.error('Server error');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Network error - no response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      
      return Promise.reject(error);
    }
  );
};

// Setup both interceptors
export const setupInterceptors = (instance: AxiosInstance): void => {
  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);
};

export default setupInterceptors;