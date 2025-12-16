import { apiConfig } from "./api-config";

type NotificationProp = {
  fcmToken: string;
  title: string;
  body: Object;
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

type DeviceTokenData = {
  fcmToken: string;
  platform: string;
  deviceId: string;
  model: string;
  appVersion: string;
  userId: string;
};

export async function apiDeviceRegisterToken({
  data,
}: {
  data: DeviceTokenData;
}) {
  try {
    const response = await apiConfig.post(`/mobile/auth/device-tokens`, {
      data: data,
    });
    console.log("Device token registered:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to register device token:", error);
    throw error;
  }
}
