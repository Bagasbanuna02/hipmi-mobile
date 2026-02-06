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
  page = "1",
}: {
  authorId: string;
  status: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/investment/${authorId}/${status}?page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentGetOne({ id }: { id: string }) {
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
  page = "1",
}: {
  id: string;
  category: "one-document" | "all-document";
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/investment/${id}/document?category=${category}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentDeleteDocument({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(
      `/mobile/investment/${id}/document`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentGetAll({
  category,
  authorId,
  page = "1",
}: {
  category: "my-holding" | "bursa";
  authorId?: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/investment?category=${category}${
        authorId ? `&authorId=${authorId}` : ""
      }&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentCreateInvoice({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/investment/${id}/invoice`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentGetInvoice({
  id,
  authorId,
  category,
  page = "1",
}: {
  id?: string;
  authorId?: string;
  category: "my-invest" | "transaction" | "invoice";
  page?: string;
}) {
  const categoryQuery = `?category=${category}`;
  const authorIdQuery = authorId ? `&authorId=${authorId}` : "";
  const pageQuery = `&page=${page}`;
  try {
    const response = await apiConfig.get(
      `/mobile/investment/${id}/invoice${categoryQuery}${authorIdQuery}${pageQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentUpdateInvoice({
  id,
  data,
  status,
}: {
  id: string;
  data: {
    imageId?: string;
  };
  status: "berhasil" | "gagal" | "proses" | "menunggu";
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/investment/${id}/invoice?status=${status}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentCreateNews({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/investment/${id}/news`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentGetNews({
  id,
  category,
}: {
  id: string;
  category: "all-news" | "one-news";
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/investment/${id}/news?category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentDeleteNews({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/investment/${id}/news`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiInvestmentGetInvestorById({
  id,
}: {
  id: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/investment/${id}/investor`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
  