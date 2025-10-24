import { apiConfig } from "../api-config";

export async function apiAdminEvent({
  category,
  search,
}: {
  category: "dashboard" | "history" | "publish" | "review" | "type-of-event";
  search?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/event?category=${category}&search=${search}`
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

export async function apiAdminEventListOfParticipants({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/event/${id}/participants`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


