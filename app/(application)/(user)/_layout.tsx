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

        {/* ========== Profile Section ========= */}
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />

        {/* ========== Portofolio Section ========= */}
        <Stack.Screen
          name="portofolio"
          options={{
            headerShown: false,
          }}
        />

        {/* ========== User Search Section ========= */}
        <Stack.Screen
          name="user-search/index"
          options={{
            title: "Pencarian Pengguna",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Notification Section ========= */}
        <Stack.Screen
          name="notifications/index"
          options={{
            title: "Notifikasi",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Event Section ========= */}
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
          name="event/create"
          options={{
            title: "Tambah Event",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="event/detail/[id]"
          options={{
            title: "Event Detail",
            headerLeft: () => <LeftButtonCustom />,
          }}
        />

        <Stack.Screen
          name="event/[id]/edit"
          options={{
            title: "Edit Event",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="event/[id]/list-of-participants"
          options={{
            title: "Daftar peserta",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Forum Section ========= */}
        <Stack.Screen
          name="forum/create"
          options={{
            title: "Tambah Diskusi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/edit"
          options={{
            title: "Edit Diskusi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/forumku"
          options={{
            title: "Forumku",
            headerLeft: () => <BackButton icon={'close'} />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/index"
          options={{
            title: "Detail",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/report-commentar"
          options={{
            title: "Laporkan Komentar",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/other-report-commentar"
          options={{
            title: "Laporkan Komentar",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/report-posting"
          options={{
            title: "Laporkan Diskusi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/other-report-posting"
          options={{
            title: "Laporkan Diskusi",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Maps Section ========= */}
        <Stack.Screen
          name="maps/index"
          options={{
            title: "Maps",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="maps/create"
          options={{
            title: "Tambah Maps",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="maps/[id]/edit"
          options={{
            title: "Edit Maps",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="maps/[id]/custom-pin"
          options={{
            title: "Custom Pin Maps",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Marketplace Section ========= */}
        <Stack.Screen
          name="marketplace/index"
          options={{
            title: "Market Place",
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack>
    </>
  );
}
