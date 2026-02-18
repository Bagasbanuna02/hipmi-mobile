import { typeRejectedData } from "@/types/type-collect-other";
import { apiConfig } from "../api-config";

export async function apiAdminDonation({
  category,
  search,
  page = "1",
}: {
  category: "dashboard" | "publish" | "review" | "reject";
  search?: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/donation?category=${category}&search=${search}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminDonationDetailById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/admin/donation/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminDonationUpdateStatus({
  id,
  changeStatus,
  data,
}: {
  id: string;
  changeStatus: "publish" | "review" | "reject";
  data?: typeRejectedData;
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/donation/${id}?status=${changeStatus}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminDonationListOfDonatur({
  id,
  status,
  page = "1"
}: {
  id: string;
  status: "berhasil" | "gagal" | "proses" | "menunggu" | null;
  page?: string;
}) {
  const statusQuery = status && status !== null ? `&status=${status}` : "";
  const pageQuery = `&page=${page}`;

  try {
    const response = await apiConfig.get(
      `/mobile/admin/donation/${id}/donatur?${statusQuery}${pageQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminDonationInvoiceDetailById({
  id,
}: {
  id: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/donation/${id}/invoice`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminDonationInvoiceUpdateById({
  id,
  data,
  status,
}: {
  id: string;
  data: any;
  status: "berhasil" | "gagal" | "proses" | "menunggu";
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/donation/${id}/invoice?status=${status}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminDonationDisbursementOfFundsCreated({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/admin/donation/${id}/disbursement`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminDonationDisbursementOfFundsListById({
  id,
  category,
  page = "1",
}: {
  id: string;
  category: "get-all" | "get-one";
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/donation/${id}/disbursement?category=${category}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

