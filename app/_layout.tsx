import { AuthProvider } from "@/context/AuthContext";
import AppRoot from "@/screens/RootLayout/AppRoot";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { useForegroundNotifications } from "@/hooks/use-foreground-notifications";
import {
  NotificationProvider,
  useNotificationStore,
} from "@/hooks/use-notification-store";

export default function RootLayout() {
  useEffect(() => {
    const testFCM = async () => {
      if (!messaging().isSupported()) {
        console.warn("Firebase Messaging not supported (e.g. Expo Go)");
        return;
      }

      const authStatus = await messaging().requestPermission();
      if (authStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
        console.warn("Permission not granted");
        return;
      }

      const token = await messaging().getToken();
      console.log("✅ FCM Token:", token);
    };

    testFCM();
  }, []);

  const { addNotification } = useNotificationStore();

  const handleForegroundNotification = (
    message: FirebaseMessagingTypes.RemoteMessage
  ) => {
    const title = message.notification?.title || "Notifikasi";
    const body = message.notification?.body || "";
    const rawData = message.data || {};

    const safeData: Record<string, string> = {};
    for (const key in rawData) {
      if (typeof rawData[key] === "string") {
        safeData[key] = rawData[key] as string;
      } else {
        // Jika object/array/number → ubah ke JSON string
        safeData[key] = JSON.stringify(rawData[key]);
      }
    }

    // ✅ Simpan ke state → akan trigger update UI (termasuk icon bell)
    addNotification({ body, title, data: safeData });
  };

  useForegroundNotifications(handleForegroundNotification);

  return (
    <>
      <NotificationProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <AppRoot />
          </AuthProvider>
        </SafeAreaProvider>
        <Toast />
      </NotificationProvider>
    </>
  );
}
