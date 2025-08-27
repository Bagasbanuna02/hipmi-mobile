import { apiConfig } from "../api-config";

export async function apiCreateProfile(data: any) {
  const response = await apiConfig.post(`/mobile/profile`, {
    data: data,
  });
  return response.data;
}

export async function apiProfile({ id }: { id: string }) {
  const response = await apiConfig.get(`/mobile/profile/${id}`);
  return response.data;
}

export async function apiUpdateProfile({
  id,
  data,
  category,
}: {
  id: string;
  data: any;
  category: "profile" | "photo" | "background";
}) {
  const response = await apiConfig.put(`/mobile/profile/${id}?category=${category}`, {
    data: data,
  });
  return response.data;
}
