import { apiConfig } from "../api-config";

export async function apiUser(id: string) {
  const response = await apiConfig.get(`/user/${id}`);
  return response.data;
}
