import { apiConfig } from "../api-config";

export async function apiMapsCreate({ data }: { data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/maps`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMapsGetAll() {
  try {
    const response = await apiConfig.get("/mobile/maps");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMapsGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/maps/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMapsUpdate({ id, data }: { id: string; data: any }) {
  try {
    const response = await apiConfig.put(`/mobile/maps/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}