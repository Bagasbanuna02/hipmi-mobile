import { apiConfig } from "../api-config";

// ================== START MASTER BANK ================== //
export async function apiAdminMasterBank({ page = "1" }: { page?: string }) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/master/bank?page=${page}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterBankById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/admin/master/bank/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterBankUpdate({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(`/mobile/admin/master/bank/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterBankCreate({ data }: { data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/admin/master/bank`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ================== END MASTER BANK ================== //

// ================== START BUSINNES FIELD ================== //

export async function apiAdminMasterBusinessField({
  page = "1",
}: {
  page: string;
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/master/business-field?page=${page}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterBusinessFieldById({
  id,
  subBidangId,
  category,
  page = "1"
}: {
  id: string;
  subBidangId?: string | null;
  category: "bidang" | "sub-bidang" | "all" | "only-sub-bidang" 
  page?: string
}) {
  const queryCategory = category ? `?category=${category}` : "";
  const querySubBidang = subBidangId ? `&subBidangId=${subBidangId}` : "";
  const queryPage = page ? `&page=${page}` : "";
  try {
    const response = await apiConfig.get(
      `/mobile/admin/master/business-field/${id}${queryCategory}${querySubBidang}${queryPage}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterBusinessFieldUpdate({
  id,
  data,
  category,
}: {
  id: string;
  data: any;
  category: "bidang" | "sub-bidang";
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/master/business-field/${id}?category=${category}`,
      {
        data: data,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterBusinessFieldCreate({
  data,
}: {
  data: any;
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/admin/master/business-field`,
      {
        data: data,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ================== END BUSINNES FIELD ================== //

// ================== START EVENT ================== //
export async function apiAdminMasterTypeOfEvent() {
  try {
    const response = await apiConfig.get(`/mobile/admin/master/type-of-event`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEventCreateTypeOfEvent({ data }: { data: string }) {
  try {
    const response = await apiConfig.post(
      `/mobile/admin/master/type-of-event`,
      {
        data: data,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterTypeOfEventGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/master/type-of-event/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterTypeOfEventUpdate({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/master/type-of-event/${id}`,
      {
        data: data,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ================== END EVENT ================== //

// ================== START DONATION ================== //

export async function apiAdminMasterDonationCategory() {
  try {
    const response = await apiConfig.get(`/mobile/admin/master/donation`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterDonationCategoryById({
  id,
}: {
  id: string;
}) {
  try {
    const response = await apiConfig.get(`/mobile/admin/master/donation/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterDonationCategoryUpdate({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/master/donation/${id}`,
      {
        data: data,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterDonationCategoryCreate({
  data,
}: {
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/admin/master/donation`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ================== END DONATION ================== //

// ================== START FECTH APP INFORMATION ================== //

export async function apiFetchAdminMasterAppInformation({
  page = "1",
  category,
}: {
  page: string;
  category?: "bank" | "business" | string
}) {
  if (category === "bank") {
    const response = await apiAdminMasterBank({ page });
    // TODO: implement bank logic
    return response;
  } else if (category === "business") {
    const response = await apiAdminMasterBusinessField({ page });
    // TODO: implement business logic
    return response
  } else {
    throw new Error("Category is required");
  }
}

// ================== END FECTH APP INFORMATION ================== //
