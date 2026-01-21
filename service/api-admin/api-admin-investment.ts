import { typeRejectedData } from "@/types/type-collect-other";
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
  data: typeRejectedData;
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

export async function apiAdminInvestmentListOfInvestor({
  id,
  status,
}: {
  id: string;
  status: "berhasil" | "gagal" | "proses" | "menunggu" | null;
}) {
  const query = status && status !== null ? `?status=${status}` : "";

  try {
    const response = await apiConfig.get(
      `/mobile/admin/investment/${id}/investor${query}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminInvestmentGetOneInvoiceById({
  id,
}: {
  id: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/investment/${id}/invoice`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminInvestmentUpdateInvoice({
  id,
  category,
  data,
}: {
  id: string;
  category: "deny" | "accept";
  data: {
    investasiId: string;
    lembarTerbeli: number;
    senderId: string
  };
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/investment/${id}/invoice?category=${category}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
