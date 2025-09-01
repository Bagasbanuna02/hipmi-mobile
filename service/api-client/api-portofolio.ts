import { apiConfig } from "../api-config";

export async function apiPortofolioCreate({ data }: { data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/portofolio`, {
      data: data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiGetPortofolio({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/portofolio?id=${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiGetOnePortofolio({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/portofolio/${id}`);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDeletePortofolio({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/portofolio/${id}`);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}
  