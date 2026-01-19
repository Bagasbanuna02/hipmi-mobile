import { apiConfig } from "../api-config";

export async function apiAdminForum({
  category,
  search,
}: {
  category: "dashboard" | "posting" | "report_posting" | "report_comment";
  search?: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/forum?category=${category}&search=${search}`
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
}: {
  id: string;
  category: "get-all" | "get-one";
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/forum/${id}/comment?category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminForumListReportCommentById({
  id,
}: {
  id: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/forum/${id}/report-comment`
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
}: {
  id: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/forum/${id}/report-posting`
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
