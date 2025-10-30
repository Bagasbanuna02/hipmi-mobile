import { apiConfig } from "../api-config";

export async function apiAdminInvestment({
  category,
  search,
}: {
  category: "dashboard" | "publish" | "review" | "reject";
  search?: string;
}) {
  const propsQuery =
    category === "dashboard"
      ? `category=${category}`
      : `category=${category}&search=${search}`;

  try {
    const response = await apiConfig.get(
      `/mobile/admin/investment?${propsQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminInvestmentDetailById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/admin/investment/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminInvestasiUpdateByStatus({
  id,
  status,
  data,
}: {
  id: string;
  status: "publish" | "review" | "reject";
  data: any;
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/investment/${id}?status=${status}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
