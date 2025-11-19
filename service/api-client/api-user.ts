import { apiConfig } from "../api-config";

export async function apiUser(id: string) {
  const response = await apiConfig.get(`/mobile/user/${id}`);
  return response.data;
}

export async function apiAllUser({ search }: { search: string }) {
  const response = await apiConfig.get(`/mobile/user?search=${search}`);
  return response.data;
}

export async function apiDeleteUser({id}:{id: string}) {
  const response = await apiConfig.delete(`/mobile/user/${id}`);
  return response.data;
}
