import { typeRejectedData } from "@/types/type-collect-other";
import { apiConfig } from "../api-config";

export async function apiAdminVoting({
  category,
  search,
  page = "1",
}: {
  category: "dashboard" | "history" | "publish" | "review" | "report";
  search?: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/voting?category=${category}&search=${search}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminVotingById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/admin/voting/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminVotingUpdateStatus({
  id,
  data,
  status,
}: {
  id: string;
  data?: typeRejectedData;
  status: "publish" | "review" | "reject";
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/voting/${id}?status=${status}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
