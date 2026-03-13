import { BackButton } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import BackgroundNotificationHandler from "@/components/Notification/BackgroundNotificationHandler";
import NotificationInitializer from "@/components/Notification/NotificationInitializer";
import { NotificationProvider } from "@/hooks/use-notification-store";
import { Stack } from "expo-router";

export default function ApplicationLayout() {
  return (
    <>
      <NotificationProvider>
        <NotificationInitializer />
        <BackgroundNotificationHandler />
        <ApplicationStack />
      </NotificationProvider>
    </>
  );
}

function ApplicationStack() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />

        {/* Take Picture */}
        <Stack.Screen
          name="(image)/take-picture/[id]/index"
          options={{
            header: () => <AppHeader title="Ambil Gambar" />,
          }}
        />

        {/* Preview Image */}
        <Stack.Screen
          name="(image)/preview-image/[id]/index"
          options={{
            header: () => <AppHeader title="Preview Gambar" />,
          }}
        />
      </Stack>
    </>
  );
}
