import { apiConfig } from "../api-config";

export async function apiInvestmentCreate({ data }: { data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/investment`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentGetByStatus({
  authorId,
  status,
}: {
  authorId: string;
  status: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/investment/${authorId}/${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentGetById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/investment/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentUpdateStatus({
  id,
  status,
}: {
  id: string;
  status: "publish" | "draft" | "review" | "reject";
}) {
  console.log("[DATA FETCH]", JSON.stringify({ id, status }, null, 2));
  try {
    const response = await apiConfig.put(`/mobile/investment/${id}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentDelete({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/investment/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentUpdateData({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(`/mobile/investment/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
