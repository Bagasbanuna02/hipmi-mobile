import { apiConfig } from "../api-config";

export async function apiCollaborationCreate({ data }: { data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/collaboration`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGetAll() {
  try {
    const response = await apiConfig.get(`/mobile/collaboration`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/collaboration/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationCreatePartisipasi({
  id,
  data,
  
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/collaboration/${id}/participants`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGetParticipants({
  id,
  category,
  authorId,
}: {
  id: string;
  category: "list" | "check-participant";
  authorId?: string;
}) {
  try {
    const authorQuery = authorId ? `&authorId=${authorId}` : "";
    const response = await apiConfig.get(
      `/mobile/collaboration/${id}/participants?category=${category}${authorQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
