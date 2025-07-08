import { BackButton } from "@/components";
import LeftButtonCustom from "@/components/Button/BackButton";
import { MainColor } from "@/constants/color-palet";
import { HeaderStyles } from "@/styles/header-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function UserLayout() {
  return (
    <>
      <Stack screenOptions={HeaderStyles}>
        <Stack.Screen
          name="home"
          options={{
            title: "HIPMI",
            headerLeft: () => (
              <Ionicons
                name="search"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.push("/user-search")}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="notifications"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.push("/notifications")}
              />
            ),
          }}
        />

        {/* User Search */}
        <Stack.Screen
          name="user-search/index"
          options={{
            title: "Pencarian Pengguna",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* Notification */}
        <Stack.Screen
          name="notifications/index"
          options={{
            title: "Notifikasi",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* Event */}
        <Stack.Screen
          name="event/(tabs)"
          options={{
            title: "Event",
            headerLeft: () => (
              <LeftButtonCustom path="/(application)/(user)/home" />
            ),
          }}
        />

        <Stack.Screen
          name="event/detail/[id]"
          options={{
            title: "Event Detail",
            headerLeft: () => <LeftButtonCustom />,
          }}
        />

        {/* Forum */}
        <Stack.Screen
          name="forum/index"
          options={{
            title: "Forum",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* Maps */}
        <Stack.Screen
          name="maps/index"
          options={{
            title: "Maps",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* Marketplace */}
        <Stack.Screen
          name="marketplace/index"
          options={{
            title: "Market Place",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* Portofolio */}
        <Stack.Screen
          name="portofolio"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
