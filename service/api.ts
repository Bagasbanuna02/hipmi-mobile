import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiVersion() {
  console.log("API_BASE_URL", API_BASE_URL);
  const response = await api.get("/version");
  return response.data;
}

export async function apiLogin({ nomor }: { nomor: string }) {
  const response = await api.post("/auth/login", {
    nomor: nomor,
  });
  return response.data;
}

export async function apiCheckCodeOtp({ kodeId }: { kodeId: string }) {
  const response = await api.get(`/auth/check/${kodeId}`);
  return response.data;
}

export async function apiValidationCode({ nomor }: { nomor: string }) {
  const response = await api.post(`/auth/validasi`, {
    nomor: nomor,
  });
  return response.data;
}

export async function apiRegister({
  data,
}: {
  data: { nomor: string; username: string };
}) {
  const response = await api.post(`/auth/register`, {
    data: data,
  });
  return response.data;
}
