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
import messaging, {
  isSupported,
  requestPermission,
  getToken,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";

// ✅ Modular imports (sesuai v22+)

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
        // ✅ Dapatkan instance messaging
        const messagingInstance = messaging();

        // ✅ Gunakan instance sebagai argumen
        const supported = await isSupported(messagingInstance);
        if (!supported) {
          console.log("‼️ FCM tidak didukung");
          return;
        }

        const authStatus = await requestPermission(messagingInstance);
        if (authStatus !== AuthorizationStatus.AUTHORIZED) {
          console.warn("Izin telah ditolak");
          return;
        }

        const fcmToken = await getToken(messagingInstance);
        if (!fcmToken) {
          logout();
          return;
        }

        console.log("✅ FCM Token:", fcmToken);

        const platform = Platform.OS; // "ios" | "android"
        const model = Device.modelName || "unknown";
        const appVersion =
          (Application.nativeApplicationVersion || "unknown") +
          "-" +
          (Application.nativeBuildVersion || "unknown");
        const deviceId =
          Device.osInternalBuildId || Device.modelName || "unknown";

        // Kirim ke backend
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
    addNotification({ title, body, data: safeData, type: "announcement" });
    console.log("✅ Notifikasi ditambahkan ke state");
  };

  useForegroundNotifications(handleForegroundNotification);

  return null; // komponen ini tidak merender apa-apa
}
