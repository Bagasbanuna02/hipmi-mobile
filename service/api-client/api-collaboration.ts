import { apiConfig } from "../api-config";

export async function apiCollaborationCreate({ data }: { data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/collaboration`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGetAll({
  category,
  authorId,
}: {
  category: "beranda" | "participant" | "my-project" | "group";
  authorId?: string;
}) {
  try {
    const authorQuery = authorId ? `&authorId=${authorId}` : "";
    const response = await apiConfig.get(
      `/mobile/collaboration?category=${category}${authorQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/collaboration/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationCreatePartisipasi({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/collaboration/${id}/participants`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGetParticipants({
  id,
  category,
  authorId,
}: {
  id: string;
  category: "list" | "check-participant";
  authorId?: string;
}) {
  try {
    const authorQuery = authorId ? `&authorId=${authorId}` : "";
    const response = await apiConfig.get(
      `/mobile/collaboration/${id}/participants?category=${category}${authorQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationCreateGroup({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/collaboration/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationEditData({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(`/mobile/collaboration/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGroup({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/collaboration/${id}/group`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGroupMessage({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/collaboration/${id}/message`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiCollaborationGroupMessageCreate({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/collaboration/${id}/message`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
