import { apiConfig } from "./api-config";

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
    const response = await apiConfig.post(`/mobile/auth/device-tokens`, data);

    return response.data;
  } catch (error: any) {
    console.error("Failed to register device token:", error);
    console.error("Response data:", error?.response?.data);
    console.error("Response status:", error?.response?.status);
    console.error("Request payload:", data);
    throw error;
  }
}

export async function apiDeviceTokenDeleted({ userId, deviceId }: { userId: string, deviceId: string }) {
  try {
    const response = await apiConfig.delete(
      `/mobile/auth/device-tokens/${userId}?deviceId=${deviceId}`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to delete device token:", error);
    throw error;
  }
}

export async function apiGetAllTokenDevice() {
  try {
    const response = await apiConfig.get(`/mobile/auth/device-tokens`);

    return response.data;
  } catch (error) {
    console.error("Failed to delete device token:", error);
    throw error;
  }
}
