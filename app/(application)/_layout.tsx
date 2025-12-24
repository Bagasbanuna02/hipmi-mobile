import { BackButton } from "@/components";
import BackgroundNotificationHandler from "@/components/Notification/BackgroundNotificationHandler";
import NotificationInitializer from "@/components/Notification/NotificationInitializer";
import { NotificationProvider } from "@/hooks/use-notification-store";
import { HeaderStyles } from "@/styles/header-styles";
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
      <Stack screenOptions={HeaderStyles}>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />

        {/* Take Picture */}
        <Stack.Screen
          name="(image)/take-picture/[id]/index"
          options={{
            title: "Ambil Gambar",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* Preview Image */}
        <Stack.Screen
          name="(image)/preview-image/[id]/index"
          options={{
            title: "Preview Gambar",
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack>
    </>
  );
}
