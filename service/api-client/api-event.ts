import { apiConfig } from "../api-config";

export async function apiEventCreate(data: any) {
  try {
    const response = await apiConfig.post(`/mobile/event`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventGetByStatus({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/event/${id}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/event/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventUpdateStatus({
  id,
  status,
}: {
  id: string;
  status: "draft" | "review" | "publish" | "reject";
}) {
  try {
    const response = await apiConfig.put(`/mobile/event/${id}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventUpdateData({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(`/mobile/event/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventDelete({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/event/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventGetAll({
  category,
  userId,
}: {
  category?: "beranda" | "contribution" | "all-history" | "my-history";
  userId?: string;
}) {
  try {
    const categoryEvent = category ? `?category=${category}` : "";
    const userIdCreator = userId ? `&userId=${userId}` : "";
    const response = await apiConfig.get(
      `/mobile/event${categoryEvent}${userIdCreator}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventJoin({
  id,
  userId,
}: {
  id: string;
  userId?: string;
}) {
  try {
    const response = await apiConfig.post(`/mobile/event/${id}/participants`, {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventListOfParticipants({ id }: { id?: string }) {
  try {
    const response = await apiConfig.get(`/mobile/event/${id}/participants`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventCheckParticipants({
  id,
  userId,
}: {
  id: string;
  userId?: string;
}) {
  try {
    const selectUserId = userId ? `?userId=${userId}` : "";
    const response = await apiConfig.get(
      `/mobile/event/${id}/check-participants${selectUserId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventGetConfirmation({
  id,
  userId,
}: {
  id: string;
  userId?: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/event/${id}/confirmation?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventConfirmationAction({
  id,
  userId,
  category,
}: {
  id: string;
  userId?: string;
  category?: "join_and_confirm" | "confirmation";
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/event/${id}/confirmation?category=${category}`,
      {
        data: {
          userId: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
