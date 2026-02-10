import { apiConfig } from "../api-config";

export async function apiDonationCreate({
  data,
  category,
}: {
  data: any;
  category: "temporary" | "permanent";
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/donation?category=${category}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationGetOne({
  id,
  category,
}: {
  id: string;
  category: "temporary" | "permanent";
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/donation/${id}?category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationGetByStatus({
  authorId,
  status,
  page = "1",
}: {
  authorId: string;
  status: string;
  page?: string;
}) {
  const authorQuery = `/${authorId}`;
  const statusQuery = `/${status}`;
  const pageQuery = `?page=${page}`;

  try {
    const response = await apiConfig.get(
      `/mobile/donation${authorQuery}${statusQuery}${pageQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationUpdateStatus({
  id,
  status,
}: {
  id: string;
  status: "draft" | "review" | "publish" | "reject";
}) {
  try {
    const response = await apiConfig.put(`/mobile/donation/${id}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationDelete({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/donation/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationUpdateData({
  id,
  data,
  category,
}: {
  id: string;
  data: any;
  category: "edit-donation" | "edit-story" | "edit-bank-account";
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/donation/${id}?category=${category}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationGetAll({
  category,
  authorId,
  page = "1"
}: {
  category: "beranda" | "my-donation";
  authorId?: string;
  page?: string;
}) {
  const authorQuery = authorId ? `&authorId=${authorId}` : "";
  const pageQuery = `&page=${page}`;
  try {
    const response = await apiConfig.get(
      `/mobile/donation?category=${category}${authorQuery}${pageQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationFundrising({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/donation/${id}/fundrising`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationCreateDonatur({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/donation/${id}/donatur`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationCreateInvoice({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/donation/${id}/invoice`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationGetInvoiceById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/donation/${id}/invoice`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationUpdateInvoice({
  id,
  fileId,
  status,
}: {
  id: string;
  fileId?: string;
  status: "berhasil" | "gagal" | "proses" | "menunggu";
}) {
  const statusQuery = `?status=${status}`;
  try {
    const response = await apiConfig.put(
      `/mobile/donation/${id}/invoice${statusQuery}`,
      {
        data: fileId,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationCreateNews({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/donation/${id}/news`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationGetNewsById({
  id,
  category,
  page = "1"
}: {
  id: string;
  category: "get-all" | "get-one";
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/donation/${id}/news?category=${category}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationUpdateNews({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(`/mobile/donation/${id}/news`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationDeleteNews({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/donation/${id}/news`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationDisbursementOfFundsListById({
  id,
  page = "1"
}: {
  id: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/donation/${id}/disbursement?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationListOfDonaturById({
  id,
  page = "1"
}: {
  id: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/donation/${id}/donatur?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
