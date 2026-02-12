import { apiConfig } from "../api-config";

export const apiAdminUserAccessGetAll = async ({
  search,
  category,
  page = "1",
}: {
  search?: string;
  category: "only-user" | "only-admin" | "all-role";
  page?: string;
}) => {
  try {
    const response = await apiConfig.get(
      `/mobile/admin/user?category=${category}&search=${search}&page=${page}`,
    );
    // Pastikan mengembalikan struktur data yang konsisten
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data || [], // Gunakan data yang sebenarnya atau array kosong
      pagination: response.data.pagination, // Jika ada info pagination
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error fetching data",
      data: [],
      pagination: null,
    };
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
  category,
}: {
  id: string;
  active?: boolean;
  role?: "user" | "admin" | "super_admin";
  category: "access" | "role";
}) => {
  try {
    const response = await apiConfig.put(
      `/mobile/admin/user/${id}?category=${category}`,
      {
        data: {
          active,
          role,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
