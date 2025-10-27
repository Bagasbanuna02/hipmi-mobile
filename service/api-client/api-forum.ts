import { apiConfig } from "../api-config";

export async function apiForumCreate({ data }: { data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/forum`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumGetAll({
  search,
  authorId,
}: {
  search: string;
  authorId?: string;
}) {
  const authorQuery = authorId ? `?authorId=${authorId}` : "";
  const searchQuery = search ? `?search=${search}` : "";
  const query = search ? searchQuery : authorQuery;

  try {
    const response = await apiConfig.get(`/mobile/forum${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/forum/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumUpdate({ id, data }: { id: string; data: any }) {
  try {
    const response = await apiConfig.put(`/mobile/forum/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumUpdateStatus({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/forum/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumDelete({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/forum/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumCreateComment({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/forum/${id}/comment`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumGetComment({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/forum/${id}/comment`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumDeleteComment({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/forum/${id}/comment`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
