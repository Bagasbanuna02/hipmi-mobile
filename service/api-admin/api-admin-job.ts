import { apiConfig } from "../api-config";

export async function apiAdminJob({
  category,
  search,
  page = "1",
}: {
  category: "dashboard" | "publish" | "review" | "reject";
  search?: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/job?category=${category}&search=${search}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminJobGetById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/admin/job/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminJobUpdate({
  id,
  status,
  data,
}: {
  id: string;
  status: "publish" | "review" | "reject";
  data?: string;
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/job/${id}?status=${status}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
