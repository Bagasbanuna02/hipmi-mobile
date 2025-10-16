import { apiConfig } from "../api-config";

export async function apiAdminJob({
  category,
  search,
}: {
  category: "dashboard" | "publish" | "review" | "reject";
  search?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/job?category=${category}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
