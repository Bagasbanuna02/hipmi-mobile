import { apiConfig } from "./api-config";

type NotificationProp = {
  fcmToken: string;
  title: string;
  body: Object;
  userLoginId?: string;
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

export async function apiNotificationUnreadCount({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(
      `/mobile/notification/${id}/unread-count`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
