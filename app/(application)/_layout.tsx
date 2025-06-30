import { AccentColor, MainColor } from "@/constants/color-palet";
import { Styles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function ApplicationLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: Styles.headerStyle,
          headerTitleStyle: Styles.headerTitleStyle,
          headerTitleAlign: "center",
          contentStyle: {
            borderBottomColor: AccentColor.blue,
            borderBottomWidth: 2,
          },
          // headerLargeStyle: {
          //   backgroundColor: MainColor.darkblue,
          // },
        }}
      >
        <Stack.Screen
          name="home"
          options={{
            title: "HIPMI",
            headerLeft: () => (
              <Ionicons
                name="search"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.push("/(application)/user-search")}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="notifications"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.push("/(application)/notifications")}
              />
            ),
          }}
        />

        <Stack.Screen
          name="forum/index"
          options={{
            title: "Forum",
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

        <Stack.Screen
          name="maps/index"
          options={{
            title: "Maps",
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

        <Stack.Screen
          name="profile/index"
          options={{
            title: "Profile",
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

        {/* Event */}
        <Stack.Screen
          name="event/(tabs)"
          options={{
            title: "Event",
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.push("/(application)/home")}
              />
            ),
          }}
        />

        <Stack.Screen
          name="event/detail/[id]"
          options={{
            title: "Detail",
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

        {/* User Search */}
        <Stack.Screen
          name="user-search/index"
          options={{
            title: "Pencarian Pengguna",
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

        {/* Notification */}
        <Stack.Screen
          name="notifications/index"
          options={{
            title: "Notifikasi",
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
