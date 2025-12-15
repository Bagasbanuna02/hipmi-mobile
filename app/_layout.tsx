import NotificationInitializer from "@/components/_ShareComponent/NotificationInitializer";
import { AuthProvider } from "@/context/AuthContext";
import { useForegroundNotifications } from "@/hooks/use-foreground-notifications";
import {
  NotificationProvider,
  useNotificationStore,
} from "@/hooks/use-notification-store";
import AppRoot from "@/screens/RootLayout/AppRoot";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <NotificationProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <NotificationInitializer />
            <AppRoot />
          </AuthProvider>
        </SafeAreaProvider>
        <Toast />
      </NotificationProvider>
    </>
  );
}
