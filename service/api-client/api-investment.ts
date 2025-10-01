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
  category,
}: {
  id: string;
  data: any;
  category: "data" | "prospectus";
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/investment/${id}?category=${category}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentUpsertDocument({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/investment/${id}/document`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentGetDocument({
  id,
  category,
}: {
  id: string;
  category: "one-document" | "all-document";
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/investment/${id}/document?category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentDeleteDocument({
  id,
}: {
  id: string;
}) {
  try {
    const response = await apiConfig.delete(
      `/mobile/investment/${id}/document`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
