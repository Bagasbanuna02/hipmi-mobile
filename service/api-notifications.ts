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
    const response = await apiConfig.post(`/mobile/notifications`, {
      data: data,
    });

    console.log("Fecth Notif", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}
