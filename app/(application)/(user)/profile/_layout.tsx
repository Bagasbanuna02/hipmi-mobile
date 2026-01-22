import { BackButton } from "@/components";
import { GStyles } from "@/styles/global-styles";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: GStyles.headerStyle,
          headerTitleStyle: GStyles.headerTitleStyle,
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        {/* <Stack.Screen name="[id]/index" options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="[id]/edit"
          options={{ title: "Edit Profile", headerLeft: () => <BackButton /> }}
        />
        <Stack.Screen
          name="[id]/update-photo"
          options={{ title: "Update Foto", headerLeft: () => <BackButton /> }}
        />
        <Stack.Screen
          name="[id]/update-background"
          options={{
            title: "Update Latar Belakang",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="create"
          options={{ title: "Buat Profile", headerBackVisible: false }}
        />

        <Stack.Screen
          name="[id]/blocked-list"
          options={{ title: "Daftar Blokir", headerLeft: () => <BackButton /> }}
        />

        <Stack.Screen
          name="[id]/detail-blocked"
          options={{ title: "Detail Blokir", headerLeft: () => <BackButton /> }}
        />
      </Stack>
    </>
  );
}
