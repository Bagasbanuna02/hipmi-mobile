import { AuthProvider } from "@/context/AuthContext";
import AppRoot from "@/screens/RootLayout/AppRoot";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <SafeAreaProvider>
          <AppRoot />
        {/* <AuthProvider>
        </AuthProvider> */}
      </SafeAreaProvider>
      <Toast />
    </>
  );
}
