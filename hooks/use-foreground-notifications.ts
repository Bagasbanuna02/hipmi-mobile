import { useEffect } from "react";
import {
  getMessaging,
  onMessage,
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";

// Gunakan tipe resmi dari library
type RemoteMessage = FirebaseMessagingTypes.RemoteMessage;

export function useForegroundNotifications(
  onMessageReceived: (message: RemoteMessage) => void
) {
  useEffect(() => {
    const messaging = getMessaging();

    const unsubscribe = onMessage(messaging, (remoteMessage) => {
      console.log(
        "🔔 Notifikasi diterima saat app aktif:",
        JSON.stringify(remoteMessage, null, 2)
      );
      onMessageReceived(remoteMessage);
    });

    return unsubscribe;
  }, [onMessageReceived]);
}