// src/components/NotificationInitializer.tsx
import { useEffect } from "react";
import { useForegroundNotifications } from "@/hooks/use-foreground-notifications";
import { useNotificationStore } from "@/hooks/use-notification-store";
import type { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { useAuth } from "@/hooks/use-auth";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Application from "expo-application";
import { apiDeviceRegisterToken } from "@/service/api-device-token";
import messaging from "@react-native-firebase/messaging";

export default function NotificationInitializer() {
  // Setup handler notifikasi
  const { user, logout } = useAuth(); // dari AuthContext
  const { addNotification } = useNotificationStore();

  // Ambil token FCM (opsional, hanya untuk log)
  useEffect(() => {
    if (!user) {
      console.log("User not available, skipping token sync");
      return;
    }

    const registerDeviceToken = async () => {
      try {
        // 1. Minta izin & ambil FCM token
        if (!messaging().isSupported()) return;
        const authStatus = await messaging().requestPermission();
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          const token = await messaging().getToken();
          console.log("✅ FCM Token:", token);
          if (!token) {
            logout();
            return;
          }
        } else {
          console.warn("Izin notifikasi ditolak");
          return;
        }
        const fcmToken = await messaging().getToken();
        if (!fcmToken) {
          console.warn("Gagal mendapatkan FCM token");
          return;
        }

        // 2. Ambil info device
        const platform = Platform.OS; // "ios" | "android"
        const model = Device.modelName || "unknown";
        const appVersion = (Application.nativeApplicationVersion || "unknown") + "-" + (Application.nativeBuildVersion || "unknown");
        const deviceId = Device.osInternalBuildId || Device.modelName + "-" + Date.now();

        // console.log(
        //   "📱 Device info:",
        //   JSON.stringify(
        //     {
        //       fcmToken,
        //       platform,
        //       deviceId,
        //       model,
        //       appVersion,
        //     },
        //     null,
        //     2
        //   )
        // );

        // 3. Kirim ke backend
        await apiDeviceRegisterToken({
          data: {
            fcmToken,
            platform,
            deviceId,
            model,
            appVersion,
            userId: user?.id || "",
          },
        });

        console.log("✅ Device token berhasil didaftarkan ke backend");
      } catch (error) {
        console.error("❌ Gagal mendaftarkan device token:", error);
      }
    };

    registerDeviceToken();
  }, [user?.id]);

  const handleForegroundNotification = (
    message: FirebaseMessagingTypes.RemoteMessage
  ) => {
    const title = message.notification?.title || "Notifikasi";
    const body = message.notification?.body || "";
    const rawData = message.data || {};

    const safeData: Record<string, string> = {};
    for (const key in rawData) {
      safeData[key] =
        typeof rawData[key] === "string"
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
