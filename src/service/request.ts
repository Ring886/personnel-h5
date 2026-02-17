import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { type ApiResponse } from '@/types/api';

const config: AxiosRequestConfig = {
  // baseURL: '/api', // Removed to allow full URL control in urls.ts
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const service: AxiosInstance = axios.create(config);

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, message } = response.data;
    if (code === 200) {
      return response;
    } else {
      console.error(`API Error: ${message}`);
      return Promise.reject(new Error(message || 'Error'));
    }
  },
  (error) => {
    console.error('Network Error:', error);
    return Promise.reject(error);
  }
);

export default service;
