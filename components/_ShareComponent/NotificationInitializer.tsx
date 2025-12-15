// src/components/NotificationInitializer.tsx
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { useForegroundNotifications } from "@/hooks/use-foreground-notifications";
import {
  useNotificationStore,
} from "@/hooks/use-notification-store";
import type { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export default function NotificationInitializer() {
  // 1. Ambil token FCM (opsional, hanya untuk log)
  useEffect(() => {
    const getFCMToken = async () => {
      if (!messaging().isSupported()) return;
      const authStatus = await messaging().requestPermission();
      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        const token = await messaging().getToken();
        console.log("✅ FCM Token:", token);
      }
    };
    getFCMToken();
  }, []);

  // 2. Setup handler notifikasi
  const { addNotification } = useNotificationStore();

  const handleForegroundNotification = (
    message: FirebaseMessagingTypes.RemoteMessage
  ) => {
    const title = message.notification?.title || "Notifikasi";
    const body = message.notification?.body || "";
    const rawData = message.data || {};

    const safeData: Record<string, string> = {};
    for (const key in rawData) {
      safeData[key] = typeof rawData[key] === "string"
        ? rawData[key]
        : JSON.stringify(rawData[key]);
    }

    console.log("📥 Menambahkan ke store:", { title, body, safeData });
    addNotification({ title, body, data: safeData });
    console.log("✅ Notifikasi ditambahkan ke state");
  };

  useForegroundNotifications(handleForegroundNotification);

  return null; // komponen ini tidak merender apa-apa
}