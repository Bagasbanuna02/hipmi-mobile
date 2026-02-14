import { apiConfig } from "../api-config";

export async function apiAdminEvent({
  category,
  search,
  page = "1",
}: {
  category: "dashboard" | "history" | "publish" | "review" | "type-of-event";
  search?: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/event?category=${category}&search=${search}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminEventById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/admin/event/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminEventUpdateStatus({
  id,
  changeStatus,
  data,
}: {
  id: string;
  changeStatus: "publish" | "review" | "reject";
  data?: string;
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/event/${id}?status=${changeStatus}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminEventListOfParticipants({ 
  id, 
  page = "1",
  search = ""
}: { 
  id: string; 
  page?: string;
  search?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/event/${id}/participants?page=${page}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


