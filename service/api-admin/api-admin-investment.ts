import { typeRejectedData } from "@/types/type-collect-other";
import { apiConfig } from "../api-config";

export async function apiAdminInvestment({
  category,
  search,
  page = "1",
}: {
  category: "dashboard" | "publish" | "review" | "reject";
  search?: string;
  page?: string;
}) {
  const propsQuery =
    category === "dashboard"
      ? `category=${category}&page=${page}`
      : `category=${category}&search=${search}&page=${page}`;

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
  page = "1",
}: {
  id: string;
  status: "berhasil" | "gagal" | "proses" | "menunggu" | null;
  page?: string;
}) {
  const queryParams = new URLSearchParams();
  
  if (status && status !== null) {
    queryParams.append("status", status);
  }
  
  queryParams.append("page", page);

  try {
    const response = await apiConfig.get(
      `/mobile/admin/investment/${id}/investor?${queryParams.toString()}`
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
