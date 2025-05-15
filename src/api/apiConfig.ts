import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import setupInterceptors from './interceptors';

// Default config for the axios instance
const axiosParams = {
  // Set different base URL based on the environment
  baseURL: process.env.REACT_APP_API_URL || 'https://api.example.com',
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

// Setup request and response interceptors
setupInterceptors(axiosInstance);

// Main api function
export const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => 
      axios.get<T, AxiosResponse<T>>(url, config).then(response => response.data),

    post: <T>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<T> => 
      axios.post<T, AxiosResponse<T>>(url, body, config).then(response => response.data),

    put: <T>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<T> => 
      axios.put<T, AxiosResponse<T>>(url, body, config).then(response => response.data),

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => 
      axios.delete<T, AxiosResponse<T>>(url, config).then(response => response.data),

    // Add other methods as needed
  };
};

// Export the api instance with pre-configured axios
export default api(axiosInstance);

// Allow custom instances if needed
export const customApi = (customAxios: AxiosInstance) => api(customAxios);

// Function to set the base URL dynamically
export const setBaseUrl = (baseURL: string) => {
  axiosInstance.defaults.baseURL = baseURL;
};
