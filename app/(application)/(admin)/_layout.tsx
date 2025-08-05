/* eslint-disable @typescript-eslint/no-unused-vars */
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
      </Stack>
    </>
  );
}
