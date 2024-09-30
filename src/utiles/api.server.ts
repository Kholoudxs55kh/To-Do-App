import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  message: string;
  data: T;
}
const baseURL =
  process.env.NODE_ENV === "production"
    ? "api/"
    : process.env.NEXT_PUBLIC_API_URL + "api/";
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const fetchTasks = async (url: string): Promise<taskI[] | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<taskI[]>> = await api.get(url);
    const res = response.data.data;
    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error;
    } else {
      console.error("Unknown error:", error);
    }
  }
};

const createTask = async (
  url: string,
  body: taskCreateI,
  options: AxiosRequestConfig = {}
): Promise<taskCreateI | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<taskCreateI>> = await api.post(
      url,
      body,
      options
    );
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error;
    } else {
      console.error("Unknown error:", error);
    }
  }
};

const updateTask = async (
  url: string,
  body: taskUpdateI
): Promise<taskUpdateI | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<taskUpdateI>> = await api.put(
      url,
      body
    );
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error;
    } else {
      console.error("Unknown error:", error);
    }
  }
};

const clearTasks = async (url: string): Promise<void> => {
  try {
    await api.put(url);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error;
    } else {
      console.error("Unknown error:", error);
    }
  }
};

export { fetchTasks, createTask, updateTask, clearTasks };
