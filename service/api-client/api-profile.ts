import { apiConfig } from "../api-config";

export async function apiCreateProfile(data: any) {
  const response = await apiConfig.post(`/mobile/profile`, {
    data: data,
  });
 return response;
}
