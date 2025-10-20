import { apiConfig } from "../api-config";

export async function apiAdminVoting({
  category,
  search,
}: {
  category: "dashboard" | "history" | "publish" | "review" | "report";
  search?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/voting?category=${category}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminVotingById({
  id,
}: {
  id: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/admin/voting/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
