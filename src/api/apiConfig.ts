import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import setupInterceptors from './interceptors';

const axiosParams = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
};

const axiosInstance = axios.create(axiosParams);

setupInterceptors(axiosInstance);

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
  };
};

export default api(axiosInstance);

export const setBaseUrl = (baseURL: string) => {
  axiosInstance.defaults.baseURL = baseURL;
};
