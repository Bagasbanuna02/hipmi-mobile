import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

// const API_BASE_URL = process.env.API_BASE_URL

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export async function apiVersion() {
  console.log("API_BASE_URL", API_BASE_URL);
  const response = await apiClient.get("/version");
  console.log("Response version", response.data);
  return response.data;
}

export async function apiLogin({ nomor }: { nomor: string }) {
  const response = await apiClient.post("/auth/login", {
    nomor: nomor,
  });
  return response.data;
}

export async function apiCheckCodeOtp({ kodeId }: { kodeId: string }) {
  const response = await apiClient.get(`/auth/check/${kodeId}`);
  return response.data;
}

export async function apiValidationCode({ nomor }: { nomor: string }) {
  const response = await apiClient.post(`/auth/validasi`, {
    nomor: nomor,
  });
  return response.data;
}

export async function apiRegister({
  data,
}: {
  data: { nomor: string; username: string };
}) {
  const response = await apiClient.post(`/auth/register`, {
    data: data,
  });
  return response.data;
}
