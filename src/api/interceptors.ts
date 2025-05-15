import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};

export const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const { status, config } = error.response;

        if (status === 401 && config?.url !== '/auth/login') {
          localStorage.removeItem('token');

          window.location.href = '/login';
        }

        if (status === 403) {
          console.error('Access forbidden');
        }

        if (status === 404) {
          console.error('Resource not found');
        }

        if (status >= 500) {
          console.error('Server error');
        }
      } else if (error.request) {
        console.error('Network error - no response received');
      } else {
        console.error('Error', error.message);
      }
      
      return Promise.reject(error);
    }
  );
};

export const setupInterceptors = (instance: AxiosInstance): void => {
  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);
};

export default setupInterceptors;