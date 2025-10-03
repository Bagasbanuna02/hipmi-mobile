import { apiConfig } from "../api-config";

export async function apiDonationCreate({ data , category}: { data: any , category: "temporary" | "permanent"}) {
  try {
    const response = await apiConfig.post(`/mobile/donation?category=${category}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationGetOne({ id, category }: { id: string , category: "temporary" | "permanent"}) {
  try {
    const response = await apiConfig.get(`/mobile/donation/${id}?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
  