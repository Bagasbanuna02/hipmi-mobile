import { apiAdminEventUpdateStatus } from "@/service/api-admin/api-admin-event";

export const funUpdateStatusEvent = async ({
  id,
  changeStatus,
  data,
}: {
  id: string;
  changeStatus: "publish" | "review" | "reject";
  data?: string;
}) => {
  try {
    const response = await apiAdminEventUpdateStatus({
      id: id,
      changeStatus: changeStatus as any,
      data: data,
    });
    return response;
  } catch (error) {
    console.log("[ERROR]", error);
    throw error;
  }
};