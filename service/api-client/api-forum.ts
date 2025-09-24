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

export async function apiForumGetAll({search}: {search: string}) {
  try {
    const response = await apiConfig.get(`/mobile/forum?search=${search}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
