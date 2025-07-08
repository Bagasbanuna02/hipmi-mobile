import { BackButton } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { HeaderStyles } from "@/styles/header-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function ApplicationLayout() {
  return (
    <>
      <Stack screenOptions={HeaderStyles}>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />

        <Stack.Screen
          name="forum/index"
          options={{
            title: "Forum",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="maps/index"
          options={{
            title: "Maps",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="marketplace/index"
          options={{
            title: "Market Place",
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

        {/* Profile */}
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />

        {/* Portofolio */}
        <Stack.Screen
          name="portofolio"
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
