// src/components/BackgroundNotificationHandler.tsx
import { useNotificationStore } from "@/hooks/use-notification-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FirebaseMessagingTypes,
  getInitialNotification,
  getMessaging,
  onNotificationOpenedApp,
} from "@react-native-firebase/messaging";
import { router } from "expo-router";
import { useEffect, useRef } from "react";

const HANDLED_NOTIFICATIONS_KEY = "handled_notifications";

export default function BackgroundNotificationHandler() {
  const { addNotification, markAsRead } = useNotificationStore();
  const messaging = getMessaging();
  const unsubscribeRef = useRef<(() => void) | null>(null); // 🔑 cegah duplikasi

  useEffect(() => {
    const init = async () => {
      // 1. Handle (cold start)
      const initialNotification = await getInitialNotification(messaging);
      if (initialNotification) {
        handleNotification(initialNotification);
        return;
      }

      // 2. Handle background
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }

      const unsubscribe = onNotificationOpenedApp(
        messaging,
        (remoteMessage) => {
          handleNotification(remoteMessage);
        }
      );

      unsubscribeRef.current = unsubscribe;
    };

    init();

    // Cleanup saat komponen unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [addNotification, messaging]);

  const isNotificationHandled = async (
    notificationId: string
  ): Promise<boolean> => {
    const handled = await AsyncStorage.getItem(HANDLED_NOTIFICATIONS_KEY);
    const ids = handled ? JSON.parse(handled) : [];
    return ids.includes(notificationId);
  };

  const markNotificationAsHandled = async (notificationId: string) => {
    const handled = await AsyncStorage.getItem(HANDLED_NOTIFICATIONS_KEY);
    const ids = handled ? JSON.parse(handled) : [];
    if (!ids.includes(notificationId)) {
      ids.push(notificationId);
      // Simpan maksimal 50 ID terakhir untuk hindari memori bocor
      await AsyncStorage.setItem(
        HANDLED_NOTIFICATIONS_KEY,
        JSON.stringify(ids.slice(-50))
      );
    }
  };

  const handleNotification = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage
  ) => {
    const { notification, data } = remoteMessage;
    if (!notification?.title) return;

    console.log(
      "🚀 Notification received:",
      JSON.stringify(remoteMessage, null, 2)
    );

    const notificationId = data?.id;
    if (!notificationId || typeof notificationId !== "string") {
      console.warn("Notification missing notificationId, skipping navigation");
      return;
    }

    // ✅ Cek apakah sudah pernah ditangani
    if (await isNotificationHandled(notificationId)) {
      console.log("Notification already handled, skipping:", notificationId);
      return;
    }

    // ✅ Tandai sebagai ditangani
    await markNotificationAsHandled(notificationId);

    // ✅ Normalisasi deepLink: pastikan string
    let deepLink: string | undefined;
    if (data?.deepLink) {
      if (typeof data.deepLink === "string") {
        deepLink = data.deepLink;
      } else {
        // Jika object (jarang), coba string-kan
        deepLink = JSON.stringify(data.deepLink);
      }
    }

    // Tambahkan ke UI state (agar muncul di daftar notifikasi & badge)
    addNotification({
      title: notification.title,
      body: notification.body || "",
      type: "announcement",
      data: data as Record<string, string>, // aman karena di-normalisasi di useNotificationStore
    });

    markAsRead(data?.id as any);

    // Navigasi
    if (
      data?.deepLink &&
      typeof data.deepLink === "string" &&
      data.deepLink.startsWith("/")
    ) {
      setTimeout(() => {
        try {
          router.push(data.deepLink as any);
        } catch (error) {
          console.warn("Navigation failed:", error);
        }
      }, 100);
    }
  };

  return null;
}
