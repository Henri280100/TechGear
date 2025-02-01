import { ApiError } from "@/app/exceptions/ApiError";
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token or other request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new ApiError(error.response.status, error.response.data.message || "API Error");
    }
    throw new Error("Network error. Please try again.");
  }
);

export default axiosInstance;
