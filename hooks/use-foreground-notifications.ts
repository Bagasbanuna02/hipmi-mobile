import { useEffect } from "react";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";

// Gunakan tipe resmi dari library
type RemoteMessage = FirebaseMessagingTypes.RemoteMessage;

export function useForegroundNotifications(
  onMessageReceived: (message: RemoteMessage) => void
) {
  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      console.log(
        "🔔 Notifikasi diterima saat app aktif:",
        JSON.stringify(remoteMessage, null, 2)
      );
      onMessageReceived(remoteMessage);
    });

    return unsubscribe;
  }, [onMessageReceived]);
}
