import { apiConfig } from "../api-config";

export async function apiMasterBidangBisnis() {
  try {
    const response = await apiConfig.get(`/master/bidang-bisnis`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMasterSubBidangBisnis({id}: {id: string}) {
  try {
    const response = await apiConfig.get(`/master/sub-bidang-bisnis/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

