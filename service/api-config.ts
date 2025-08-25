import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export const apiConfig: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});


apiConfig.interceptors.request.use(
  async (config) => {
    console.log("API_BASE_URL >>", API_BASE_URL);
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      // config.timeout = 10000;
      config.headers["Content-Type"] = "application/json";
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log("config", JSON.stringify(config, null, 2));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function apiVersion() {
  // console.log("API_BASE_URL", API_BASE_URL);
  const response = await apiConfig.get("/version");
  // console.log("Response version", JSON.stringify(response.data, null, 2));
  return response.data;
}

export async function apiLogin({ nomor }: { nomor: string }) {
  const response = await apiConfig.post("/auth/login", {
    nomor: nomor,
  });
  return response.data;
}

export async function apiCheckCodeOtp({ kodeId }: { kodeId: string }) {
  const response = await apiConfig.get(`/auth/check/${kodeId}`);
  return response.data;
}

export async function apiValidationCode({ nomor }: { nomor: string }) {
  const response = await apiConfig.post(`/auth/validasi`, {
    nomor: nomor,
  });
  return response.data;
}

export async function apiRegister({
  data,
}: {
  data: { nomor: string; username: string };
}) {
  const response = await apiConfig.post(`/auth/register`, {
    data: data,
  });
  return response.data;
}
