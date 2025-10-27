import { apiConfig } from "../api-config";

export const apiAdminUserAccessGetAll = async ({
  search,
  category,
}: {
  search?: string;
  category: "only-user" | "only-admin" | "all-role";
}) => {
  try {
    const response = await apiConfig.get(`/mobile/admin/user?category=${category}&search=${search}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiAdminUserAccessGetById = async ({ id }: { id: string }) => {
  try {
    const response = await apiConfig.get(`/mobile/admin/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiAdminUserAccessUpdateStatus = async ({
  id,
  active,
  role,
}: {
  id: string;
  active?: boolean;
  role?: "user" | "admin" | "super_admin";
}) => {
  try {
    const response = await apiConfig.put(`/mobile/admin/user/${id}`, {
      data: {
        active,
        role,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
