import { AuthProvider } from "@/context/AuthContext";
import AppRoot from "@/screens/RootLayout/AppRoot";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";

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

  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>
          <AppRoot />
        </AuthProvider>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}
