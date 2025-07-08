import { MainColor } from "@/constants/color-palet";
import { HeaderStyles } from "@/styles/header-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function ApplicationLayout() {
  return (
    <>
      <Stack screenOptions={HeaderStyles}>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />

        {/* Profile */}
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />

        

        {/* Take Picture */}
        <Stack.Screen
          name="take-picture/[id]/index"
          options={{
            title: "Ambil Gambar",
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.back()}
              />
            ),
          }}
        />
      </Stack>
    </>
  );
}
