import { ApiError } from "@/app/exceptions/ApiError";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";


// Axios instance for NewsAPI
const newsApiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://newsapi.org/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios instance for your backend API
const backendApiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? "https://your-backend-api.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor for NewsAPI: Add API key as query parameter
newsApiClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Request Interceptor for Backend API: Add Bearer token to headers
backendApiClient.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_BACKEND_API_TOKEN; // Replace with your token logic (e.g., from localStorage or a context)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for NewsAPI: Handle global error responses
newsApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`NewsAPI Error [${status}]: ${data?.message || "Unknown error"}`);
      if (status === 401) {
        console.error("Unauthorized - Please check your NewsAPI key");
      } else if (status === 429) {
        console.error("Too many requests - Please try again later");
      }
    } else if (error.request) {
      console.error("Network Error: Please check your internet connection");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Response Interceptor for Backend API: Handle global error responses
backendApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`Backend API Error [${status}]: ${data?.message || "Unknown error"}`);
      if (status === 401) {
        console.error("Unauthorized - Please check your backend API token");
      } else if (status === 403) {
        console.error("Forbidden - You do not have access to this resource");
      }
    } else if (error.request) {
      console.error("Network Error: Please check your internet connection");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export { newsApiClient, backendApiClient };
