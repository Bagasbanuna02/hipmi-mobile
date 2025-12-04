import { apiConfig } from "../api-config";

// ================== START MASTER BANK ================== //
export async function apiAdminMasterBank() {
  try {
    const response = await apiConfig.get(`/mobile/admin/master/bank`);
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

export async function apiAdminMasterBusinessField() {
  try {
    const response = await apiConfig.get(`/mobile/admin/master/business-field`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterBusinessFieldById({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/master/business-field/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterBusinessFieldUpdate({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/master/business-field/${id}`,
      {
        data: data,
      }
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
      }
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
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterTypeOfEventGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/master/type-of-event/${id}`
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
      }
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

export async function apiAdminMasterDonationCategoryById({ id }: { id: string }) {
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
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAdminMasterDonationCategoryCreate({ data }: { data: any }) {
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