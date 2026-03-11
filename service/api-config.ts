import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";
export const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;
export const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;
export const DEEP_LINK_URL = Constants.expoConfig?.extra?.DEEP_LINK_URL || 'hipmimobile://';

export const apiConfig: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});


apiConfig.interceptors.request.use(
  async (config) => {
    console.log("API_BASE_URL >>", API_BASE_URL);
    const token = await AsyncStorage.getItem("authToken");
    // console.log("[TOKEN] >>", token);
    if (token) {
      // config.timeout = 10000;
      config.headers["Content-Type"] = "application/json";
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function apiVersion() {
  const response = await apiConfig.get("/version");
  return response.data;
}

export async function apiLogin({ nomor }: { nomor: string }) {
  const response = await apiConfig.post("/auth/mobile-login", {
    nomor: nomor,
  });
  return response.data;;
}

export async function apiCheckCodeOtp({ kodeId }: { kodeId: string }) {
  const response = await apiConfig.get(`/auth/check/${kodeId}`);
  return response.data;
}

export async function apiValidationCode({
  nomor,
  code,
}: {
  nomor: string;
  code: string;
}) {
  const response = await apiConfig.post(`/auth/mobile-validasi`, {
    nomor: nomor,
    code: code,
  });
  return response.data;
}

export async function apiRegister({
  data,
}: {
  data: { nomor: string; username: string; termsOfServiceAccepted: boolean };
}) {
  const response = await apiConfig.post(`/auth/mobile-register`, {
    data: data,
  });
  return response.data;
}

export async function apiAcceptTermService({
  data,
}: {
  data: { id: string; termsOfServiceAccepted: boolean };
}) {
  const response = await apiConfig.post(`/auth/term-service`, {
    data: data,
  });
  return response.data;
}


export async function apiUpdatedTermCondition({nomor}: {nomor: string}) {
  const response = await apiConfig.post(`/auth/mobile-eula`, {
    nomor: nomor,
  });
  return response.data;
}