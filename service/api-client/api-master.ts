import { apiConfig } from "../api-config";

export async function apiMasterBidangBisnis() {
  try {
    const response = await apiConfig.get(`/master/bidang-bisnis`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMasterSubBidangBisnis({ id }: { id?: string }) {
  try {
    const selectBidangId = id ? `/${id}` : "";
    const response = await apiConfig.get(
      `/master/sub-bidang-bisnis${selectBidangId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMasterEventType() {
  try {
    const response = await apiConfig.get(`/mobile/master/event-type`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMasterCollaborationType() {
  try {
    const response = await apiConfig.get(
      `/mobile/master/collaboration-industry`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMasterForumReportList() {
  try {
    const response = await apiConfig.get(`/mobile/master/forum-report`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumCreateReportPosting({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/forum/${id}/report-posting`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumCreateReportCommentar({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/forum/${id}/report-commentar`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
  
