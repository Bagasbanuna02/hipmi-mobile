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
    console.log("[SUCCESS]", response.data);
    return response.data;
  } catch (error) {
    // console.log("[ERROR FECTH]", error);
    throw error;
  }
}

export async function apiEventUpdateData({ id, data }: { id: string; data: any }) {
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
  

export async function apiEventGetAll() {
  try {
    const response = await apiConfig.get(`/mobile/event`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
  