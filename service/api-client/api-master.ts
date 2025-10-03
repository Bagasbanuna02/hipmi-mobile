import { apiConfig } from "../api-config";

// ================== START MASTER PORTFOLIO ================== //
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

// ================== END MASTER PORTFOLIO ================== //

// ================== START MASTER EVENT ================== //

export async function apiMasterEventType() {
  try {
    const response = await apiConfig.get(`/mobile/master/event-type`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ================== END MASTER EVENT ================== //

// ================== START MASTER COLLABORATION ================== //

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

// ================== END MASTER COLLABORATION ================== //

// ================== START MASTER FORUM ================== //

export async function apiMasterForumReportList() {
  try {
    const response = await apiConfig.get(`/mobile/master/forum-report`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ================== END MASTER FORUM ================== //

export async function apiForumCreateReportPosting({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/forum/${id}/report-posting`,
      {
        data: data,
      }
    );
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
    const response = await apiConfig.post(
      `/mobile/forum/${id}/report-commentar`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ================== START MASTER INVESTMENT ================== //

export async function apiMasterInvestment({
  category,
}: {
  category?:
    | "pencarian-investor"
    | "periode-deviden"
    | "pembagian-deviden"
    | string;
}) {
  const selectCategory = category ? `?category=${category}` : "";
  try {
    const response = await apiConfig.get(
      `/mobile/master/investment${selectCategory}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMasterBank() {
  try {
    const response = await apiConfig.get(`/mobile/master/bank`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiMasterDonation({
  category,
}: {
  category: "category" | "duration" | "";
}) {
  const selectCategory = category ? `?category=${category}` : "";
  try {
    const response = await apiConfig.get(
      `/mobile/master/donation${selectCategory}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
