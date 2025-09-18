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
}: {
  id: string;
  status: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/voting/${id}/${status}`);
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
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(`/mobile/voting/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiVotingGetAll({ search }: { search: string }) {
  try {
    const searchQuery = search ? `?search=${search}` : "";
    const response = await apiConfig.get(`/mobile/voting${searchQuery}`);
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

export async function apiVotingCheckContribution({
  id,
  authorId,
}: {
  id: string;
  authorId: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/voting/${id}/contribution?authorId=${authorId}`
    );
    console.log("[DATA CONTRIBUION]", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
