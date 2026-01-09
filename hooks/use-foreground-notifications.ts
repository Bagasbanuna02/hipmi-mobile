import { useEffect } from "react";
import {
  getMessaging,
  onMessage,
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { useAuth } from "./use-auth";

// Gunakan tipe resmi dari library
type RemoteMessage = FirebaseMessagingTypes.RemoteMessage;

export function useForegroundNotifications(
  onMessageReceived: (message: RemoteMessage) => void
) {
  const { user } = useAuth();

  useEffect(() => {
    const messaging = getMessaging();

    const unsubscribe = onMessage(messaging, (remoteMessage) => {
      const data = remoteMessage.data;
      // console.log("DATA NOTIFIKASI DARI SERVER", data)
      if (data?.recipientId && data?.recipientId !== user?.id) {
        console.log("📵 Notification untuk user lain", data);
        return;
      }

      console.log(
        "🔔 Notifikasi diterima saat app aktif:",
        JSON.stringify(data, null, 2)
      );
      onMessageReceived(remoteMessage);
    });

    return unsubscribe;
  }, [user?.id, onMessageReceived]);
}
