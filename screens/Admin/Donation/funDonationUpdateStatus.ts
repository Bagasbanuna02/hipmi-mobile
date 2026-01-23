import { apiAdminDonationUpdateStatus } from "@/service/api-admin/api-admin-donation";
import { typeRejectedData } from "@/types/type-collect-other";

export const funUpdateStatusDonation = async ({
  id,
  changeStatus,
  data,
}: {
  id: string;
  changeStatus: "publish" | "review" | "reject";
  data?: typeRejectedData;
}) => {
  try {
    const response = await apiAdminDonationUpdateStatus({
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
