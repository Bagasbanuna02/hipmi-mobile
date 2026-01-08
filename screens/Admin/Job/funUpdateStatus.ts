import { apiAdminJobUpdate } from "@/service/api-admin/api-admin-job";

const funUpdateStatusJob = async ({
  id,
  changeStatus,
  data,
}: {
  id: string;
  changeStatus: "publish" | "review" | "reject";
  data?: any;
}) => {
  try {
    const response = await apiAdminJobUpdate({
      id: id,
      status: changeStatus as any,
      data: data,
    });

    return response;
  } catch (error) {
    console.log("[ERROR]", error);
    throw error;
  }
};

export default funUpdateStatusJob;
