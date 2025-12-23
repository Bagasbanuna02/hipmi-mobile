import { apiConfig } from "./api-config";

type NotificationProp = {
  title: string;
  body: string;
  userLoginId: string;
  appId?: string;
  status?: string;
  type?: "announcement" | "trigger";
  deepLink?: string;
  kategoriApp?:
    | "JOB"
    | "VOTING"
    | "EVENT"
    | "DONASI"
    | "INVESTASI"
    | "COLLABORATION"
    | "FORUM"
    | "ACCESS"; // Untuk trigger akses user;
};

export async function apiNotificationsSend({
  data,
}: {
  data: NotificationProp;
}) {
  try {
    const response = await apiConfig.post(`/mobile/notification`, {
      data: data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiGetNotificationsById({
  id,
  category,
}: {
  id: string;
  category: "count-as-unread" | "all";
}) {
  console.log("ID", id);
  console.log("Category", category);

  try {
    const response = await apiConfig.get(
      `/mobile/notification/${id}?category=${category}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiNotificationUnreadCount({ id, role }: { id: string, role: "user" | "admin" }) {
  try {
    const response = await apiConfig.get(
      `/mobile/notification/${id}/unread-count?role=${role}`
    );

    console.log("Response Unread Count", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
