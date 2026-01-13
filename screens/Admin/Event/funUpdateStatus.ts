import { apiAdminEventUpdateStatus } from "@/service/api-admin/api-admin-event";
import { RejectedData } from "@/types/type-collect-other";

export const funUpdateStatusEvent = async ({
  id,
  changeStatus,
  data,
}: {
  id: string;
  changeStatus: "publish" | "review" | "reject";
  data?: RejectedData;
}) => {
  try {
    console.log("[DATA]", data);
    const response = await apiAdminEventUpdateStatus({
      id: id,
      changeStatus: changeStatus as any,
      data: data as any,
    });
    return response;

  } catch (error) {
    console.log("[ERROR]", error);
    throw error;
  }
};
