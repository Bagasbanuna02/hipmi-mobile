import { apiAdminVotingUpdateStatus } from "@/service/api-admin/api-admin-voting";

const funUpdateStatusVoting = async ({
  id,
  changeStatus,
  data,
}: {
  id: string;
  changeStatus: "publish" | "review" | "reject";
  data?: string;
}) => {
  try {
    const response = await apiAdminVotingUpdateStatus({
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

export default funUpdateStatusVoting;
