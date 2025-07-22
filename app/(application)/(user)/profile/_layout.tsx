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
          headerLeft: () => <BackButton />,
        }}
      >
        {/* <Stack.Screen name="[id]/index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="[id]/edit" options={{ title: "Edit Profile" }} />
        <Stack.Screen
          name="[id]/update-photo"
          options={{ title: "Update Foto" }}
        />
        <Stack.Screen
          name="[id]/update-background"
          options={{ title: "Update Latar Belakang" }}
        />
        <Stack.Screen
          name="[id]/create"
          options={{ title: "Buat Profile" }}
        />
      </Stack>
    </>
  );
}
