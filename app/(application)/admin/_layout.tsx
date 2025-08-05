/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ClickableCustom,
  DrawerCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import DrawerAdmin from "@/components/Drawer/DrawerAdmin";
import NavbarMenu from "@/components/Drawer/NavbarMenu";
import SidebarMenu from "@/components/Drawer/SidebarMenu";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { GStyles } from "@/styles/global-styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

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
        <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
        <Stack.Screen name="maps" options={{ title: "Maps" }} />
        <Stack.Screen name="information" options={{ title: "Information" }} />
        <Stack.Screen name="job/index" options={{ title: "Job" }} />
        <Stack.Screen name="job/publish" options={{ title: "Job Publish" }} />
        <Stack.Screen name="job/review" options={{ title: "Job Review" }} />
        <Stack.Screen name="job/reject" options={{ title: "Job Reject" }} />
      </Stack>

      <DrawerAdmin isVisible={openDrawer} onClose={() => setOpenDrawer(false)}>
        <StackCustom gap={"lg"}>
          <Ionicons
            name="close"
            size={ICON_SIZE_SMALL}
            color={MainColor.white}
            onPress={() => setOpenDrawer(false)}
            style={{ alignSelf: "flex-end" }}
          />

          <NavbarMenu
            items={[
              { label: "Dashboard", icon: "home", link: "/admin/dashboard" },
              { label: "Maps", icon: "map", link: "/admin/maps" },
              {
                label: "Information",
                icon: "information-circle",
                link: "/admin/information",
              },
              {
                label: "Job",
                icon: "calendar",
                links: [
                  { label: "Summary", link: "/admin/job" },
                  { label: "Publish", link: "/admin/job/publish" },
                  { label: "Review", link: "/admin/job/review" },
                  { label: "Reject", link: "/admin/job/reject" },
                ],
              },
            ]}
            onClose={() => setOpenDrawer(false)}
          />
        </StackCustom>
      </DrawerAdmin>
    </>
  );
}

