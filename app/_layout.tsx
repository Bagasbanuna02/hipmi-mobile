import { AuthProvider } from "@/context/AuthContext";
import AppRoot from "@/screens/RootLayout/AppRoot";
import { registerForPushNotificationsAsync } from "@/utils/notifications";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  useEffect(() => {
    // Jalankan sekali saat app pertama kali dibuka
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        // TODO: Kirim token ke backend kamu
        // Contoh:
        // fetch('https://api.hipmibadung.id/save-token', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token })
        // });
      }
    });
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
