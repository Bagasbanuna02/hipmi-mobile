import { BackButton, TextCustom, ViewWrapper } from "@/components";
import { Stack } from "expo-router";

export default function AdminNotification() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Admin Notifikasi",
          headerLeft: () => <BackButton />,
          headerRight: () => <></>,
        }}
      />

      <ViewWrapper>
        <TextCustom>Notification</TextCustom>
      </ViewWrapper>
    </>
  );
}
