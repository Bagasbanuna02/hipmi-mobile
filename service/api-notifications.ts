import {
  NotificationProp,
  TypeNotificationCategoryApp,
} from "@/types/type-notification-category";
import { apiConfig } from "./api-config";

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

export async function apiNotificationsSendById({
  data,
  id,
}: {
  data: NotificationProp;
  id: string;
}) {
  try {
    const response = await apiConfig.post(`/mobile/notification/${id}`, {
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
  page = "1",
}: {
  id: string;
  category: TypeNotificationCategoryApp;
  page?: string;
}) {

  console.log("Category", category);

  try {
    const response = await apiConfig.get(
      `/mobile/notification/${id}?category=${category}&page=${page}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiNotificationUnreadCount({
  id,
  role,
}: {
  id: string;
  role: "user" | "admin";
}) {
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

/**
 * @param id | notification id atau user id
 * @param category | "all" | "one" , jika "all" id yang harus di masukan adalah user id, jika "one" id yang harus di masukan adalah notification id
 * @type {string}
 */
export async function apiNotificationMarkAsRead({
  id,
  category,
}: {
  id: string;
  category: "all" | "one";
}) {
  try {
    const response = await apiConfig.put(
      `/mobile/notification/${id}?category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
