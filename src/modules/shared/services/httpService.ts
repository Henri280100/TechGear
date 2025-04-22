import { backendApiClient } from "@/app/api/config/axiosInstance";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const getWithQuery = async <T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> => {
  try {
    const { data }: AxiosResponse<T> = await backendApiClient.get(endpoint, {
      params,
    });
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Generic reusable GET request function
 * @param client - Axios instance (e.g., backendApiClient or newsApiClient)
 * @param url - API endpoint
 * @param params - Query params
 * @param config - Optional Axios config
 */
export const getRequest = async <T>(
  client: AxiosInstance,
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.get<T>(url, {
    params,
    ...config,
  });
  return response.data;
};

// Generic POST
export const postRequest = async <T>(
  client: AxiosInstance,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.post<T>(url, data, config);
  return response.data;
};

// Generic PUT
export const putRequest = async <T>(
  client: AxiosInstance,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.put<T>(url, data, config);
  return response.data;
};

// Generic DELETE
export const deleteRequest = async <T>(
  client: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.delete<T>(url, config);
  return response.data;
};
