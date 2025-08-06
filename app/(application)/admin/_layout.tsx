import { StackCustom } from "@/components";
import DrawerAdmin from "@/components/Drawer/DrawerAdmin";
import NavbarMenu, { NavbarItem } from "@/components/Drawer/NavbarMenu";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { GStyles } from "@/styles/global-styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";

export default function AdminLayout() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: GStyles.headerStyle,
          headerTitleStyle: GStyles.headerTitleStyle,
          headerTitleAlign: "center",
          contentStyle: {
            borderBottomColor: AccentColor.blue,
          },
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={ICON_SIZE_SMALL}
              color={MainColor.white}
              onPress={() => setOpenDrawer(true)}
            />
          ),
          headerRight: () => (
            <FontAwesome6
              name="circle-user"
              size={ICON_SIZE_SMALL}
              color={MainColor.white}
            />
          ),
        }}
      >
        <Stack.Screen name="dashboard" options={{ title: "Main Dashboard" }} />
        <Stack.Screen name="investment/index" options={{ title: "Dashboard Investasi" }} />
        <Stack.Screen name="investment/publish" options={{ title: "Investasi Publish" }} />
        <Stack.Screen name="investment/review" options={{ title: "Investasi Review" }} />
        <Stack.Screen name="investment/reject" options={{ title: "Investasi Reject" }} />
        <Stack.Screen name="maps" options={{ title: "Maps" }} />
        <Stack.Screen name="information" options={{ title: "Information" }} />
        <Stack.Screen name="job/index" options={{ title: "Dashboard Job" }} />
        <Stack.Screen name="job/publish" options={{ title: "Job Publish" }} />
        <Stack.Screen name="job/review" options={{ title: "Job Review" }} />
        <Stack.Screen name="job/reject" options={{ title: "Job Reject" }} />
        <Stack.Screen
          name="collaboration/index"
          options={{ title: "Dashboard Collaboration" }}
        />
        <Stack.Screen
          name="collaboration/publish"
          options={{ title: "Collaboration Publish" }}
        />
        <Stack.Screen
          name="collaboration/group"
          options={{ title: "Collaboration Group" }}
        />
        <Stack.Screen
          name="collaboration/reject"
          options={{ title: "Collaboration Reject" }}
        />
      </Stack>

      <DrawerAdmin isVisible={openDrawer} onClose={() => setOpenDrawer(false)}>
        <StackCustom gap={"xs"}>
          <Ionicons
            name="close"
            size={ICON_SIZE_SMALL}
            color={MainColor.white}
            onPress={() => setOpenDrawer(false)}
            style={{ alignSelf: "flex-end" }}
          />

          <NavbarMenu items={listItem} onClose={() => setOpenDrawer(false)} />
        </StackCustom>
      </DrawerAdmin>
    </>
  );
}

const listItem: NavbarItem[] = [
  {
    label: "Main Dashboard",
    icon: "home",
    link: "/admin/dashboard",
  },
  {
    label: "Investasi",
    icon: "wallet",
    links: [
      { label: "Dashboard", link: "/admin/investment" },
      { label: "Publish", link: "/admin/investment/publish" },
      { label: "Review", link: "/admin/investment/review" },
      { label: "Reject", link: "/admin/investment/reject" },
    ],
  },
  {
    label: "Donasi",
    icon: "hand-right",
    links: [
      { label: "Dashboard", link: "/admin/donasi" },
      { label: "Publish", link: "/admin/donasi/publish" },
      { label: "Review", link: "/admin/donasi/review" },
      { label: "Reject", link: "/admin/donasi/reject" },
      { label: "Kategori", link: "/admin/donasi/kategori" },
    ],
  },
  {
    label: "Event",
    icon: "calendar-clear",
    links: [
      { label: "Dashboard", link: "/admin/event" },
      { label: "Publish", link: "/admin/event/publish" },
      { label: "Review", link: "/admin/event/review" },
      { label: "Reject", link: "/admin/event/reject" },
      { label: "Tipe Acara", link: "/admin/event/tipe-acara" },
      { label: "Riwayat", link: "/admin/event/riwayat" },
    ],
  },
  {
    label: "Voting",
    icon: "accessibility-outline",
    links: [
      { label: "Dashboard", link: "/admin/voting" },
      { label: "Publish", link: "/admin/voting/publish" },
      { label: "Review", link: "/admin/voting/review" },
      { label: "Reject", link: "/admin/voting/reject" },
      { label: "Riwayat", link: "/admin/voting/riwayat" },
    ],
  },
  {
    label: "Job",
    icon: "desktop-outline",
    links: [
      { label: "Dashboard", link: "/admin/job" },
      { label: "Publish", link: "/admin/job/publish" },
      { label: "Review", link: "/admin/job/review" },
      { label: "Reject", link: "/admin/job/reject" },
    ],
  },
  {
    label: "Forum",
    icon: "chatbubble-ellipses-outline",
    links: [
      { label: "Dashboard", link: "/admin/forum" },
      { label: "Posting", link: "/admin/forum/publish" },
      { label: "Report Posting", link: "/admin/forum/review" },
      { label: "Report Comment", link: "/admin/forum/reject" },
    ],
  },
  {
    label: "Collaboration",
    icon: "people",
    links: [
      { label: "Dashboard", link: "/admin/collaboration" },
      { label: "Publish", link: "/admin/collaboration/publish" },
      { label: "Group", link: "/admin/collaboration/group" },
      { label: "Reject", link: "/admin/collaboration/reject" },
    ],
  },
  { label: "Maps", icon: "map", link: "/admin/maps" },
  {
    label: "App Information",
    icon: "information-circle",
    link: "/admin/information",
  },
  {
    label: "User Access",
    icon: "people",
    link: "/admin/user-access",
  },
];
