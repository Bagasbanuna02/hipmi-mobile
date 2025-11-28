import { apiConfig } from "../api-config";

/**
 * @param id | Profile ID
 * @param search | Search Query
 * @param page | Page Number
 */
export async function apiGetBlocked({
  id,
  search,
  page,
}: {
  id: string;
  search?: string;
  page?: string;
}) {
  const pageQuery = page ? `&page=${page}` : "";
  const searchQuery = search ? `&search=${search}` : "";
  try {
    const response = await apiConfig.get(
      `/mobile/block-user?id=${id}${pageQuery}${searchQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiGetBlockedById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/block-user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiUnblock({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/block-user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}