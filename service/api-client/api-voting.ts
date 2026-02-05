import { apiConfig } from "../api-config";

export async function apiVotingCreate(data: any) {
  try {
    const response = await apiConfig.post(`/mobile/voting`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingGetByStatus({
  id,
  status,
  page = "1",
}: {
  id: string;
  status: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/voting/${id}/${status}?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/voting/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingUpdateStatus({
  id,
  status,
}: {
  id: string;
  status: "draft" | "review" | "publish" | "reject";
}) {
  try {
    const response = await apiConfig.put(`/mobile/voting/${id}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingDelete({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/voting/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingUpdateData({
  id,
  data,
  category,
}: {
  id: string;
  data: any;
  category: "edit" | "archive";
}) {
  const categoryQuery = `?category=${category}`;
  try {
    const response = await apiConfig.put(`/mobile/voting/${id}${categoryQuery}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingGetAll({ search, category, authorId, userLoginId, page = "1" }: { search?: string, category: "beranda" | "contribution" | "all-history" | "my-history", authorId?: string, userLoginId?: string, page?: string }) {
  try {
    console.log("userLoginId", userLoginId);
    const categoryQuery = category ? `?category=${category}` : "";
    const searchQuery = search ? `&search=${search}` : "";
    const authorIdQuery = authorId ? `&authorId=${authorId}` : "";
    const userLoginIdQuery = userLoginId ? `&userLoginId=${userLoginId}` : "";
    const pageQuery = `&page=${page}`;
    const response = await apiConfig.get(`/mobile/voting${categoryQuery}${searchQuery}${authorIdQuery}${userLoginIdQuery}${pageQuery}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingVote({ id, data }: { id: string; data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/voting/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingContribution({
  id,
  authorId,
  category,
  page = "1",
}: {
  id: string;
  authorId: string;
  category: "list" | "checked";
  page?: string;
}) {
  const query =
    category === "list"
      ? `?category=list&page=${page}`
      : `?category=checked&authorId=${authorId}&page=${page}`;
  try {
    const response = await apiConfig.get(
      `/mobile/voting/${id}/contribution${query}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
