import { apiConfig } from "../api-config";

export async function apiAdminCollaboration({
  category,
}: {
  category: "dashboard" | "publish" | "reject" | "group";
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/collaboration?category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminCollaborationGetById({
  id,
  category,
}: {
  id: string;
  category: "publish" | "reject" | "group";
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/collaboration/${id}?category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminCollaborationReject({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(`/mobile/admin/collaboration/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
