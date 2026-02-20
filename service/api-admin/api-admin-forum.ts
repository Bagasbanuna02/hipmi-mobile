import { apiConfig } from "../api-config";

export async function apiAdminForum({
  category,
  search,
  page = "1",
}: {
  category: "dashboard" | "posting" | "report_posting" | "report_comment";
  search?: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/forum?category=${category}&search=${search}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminForumPostingById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/admin/forum/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function apiAdminForumCommentById({
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
      `/mobile/admin/forum/${id}/comment?category=${category}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminForumListReportCommentById({
  id,
  page = "1",
}: {
  id: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/forum/${id}/report-comment?page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminForumDeactivateComment({
  id,
  data,
}: {
  id: string;
  data: { senderId: string };
}) {

  console.log("data", data)
  try {
    const response = await apiConfig.put(`/mobile/admin/forum/${id}/comment`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminForumListReportPostingById({
  id,
  page = "1",
}: {
  id: string;
  page?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/forum/${id}/report-posting?page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminForumDeactivatePosting({
  id,
  data,
}: {
  id: string;
  data: { senderId: string };
}) {
  try {
    const response = await apiConfig.put(`/mobile/admin/forum/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
