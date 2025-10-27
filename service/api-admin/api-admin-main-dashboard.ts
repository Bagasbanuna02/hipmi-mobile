import { apiConfig } from "../api-config";

export const apiAdminMainDashboardGetAll = async () => {
  try {
    const response = await apiConfig.get(`/mobile/admin/main-dashboard`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
