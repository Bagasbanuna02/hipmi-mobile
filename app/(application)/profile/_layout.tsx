import { MainColor } from "@/constants/color-palet";
import { Styles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: Styles.headerStyle,
          headerTitleStyle: Styles.headerTitleStyle,
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={20}
              color={MainColor.yellow}
              onPress={() => router.back()}
            />
          ),
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
      </Stack>
    </>
  );
}
