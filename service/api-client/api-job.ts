import { apiConfig } from "../api-config";

export async function apiJobCreate(data: any) {
  try {
    const response = await apiConfig.post(`/mobile/job`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiJobGetByStatus({
  authorId,
  status,
}: {
  authorId: string;
  status: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/job/${authorId}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiJobGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/job/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiJobUpdateStatus({
  id,
  status,
}: {
  id: string;
  status: "draft" | "review" | "publish" | "reject";
}) {
  try {
    const response = await apiConfig.put(`/mobile/job/${id}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiJobDelete({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/job/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiJobGetAll({
  search,
  category,
  authorId,
}: {
  search?: string;
  category: "archive" | "beranda";
  authorId?: string;
}) {
  try {
    let categoryText = category ? `?category=${category}` : "";
    if (category === "archive") {
      categoryText = `?category=${category}&authorId=${authorId}`;
    }
    const searchText = search ? `&search=${search}` : "";
    const response = await apiConfig.get(
      `/mobile/job${categoryText}${searchText}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiJobUpdateData({
  id,
  data,
  category,
}: {
  id: string;
  data: any;
  category: "edit" | "archive";
}) {
  try {
    const categoryJob = category ? `?category=${category}` : "";
    const response = await apiConfig.put(`/mobile/job/${id}${categoryJob}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
