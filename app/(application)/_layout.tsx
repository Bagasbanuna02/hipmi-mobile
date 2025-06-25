/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccentColor, MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function ApplicationLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: MainColor.darkblue },
          headerTitleStyle: { color: MainColor.yellow, fontWeight: "bold" },
          headerTitleAlign: "center",
          contentStyle: {
            borderBottomColor: AccentColor.blue,
            borderBottomWidth: 2,
          },
          headerLargeStyle: {
            backgroundColor: MainColor.darkblue,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown:  false,
            // title: "iii",
            // headerLeft: () => (
            //   <Ionicons name="search" size={20} color={MainColor.white} />
            // ),
            // headerRight: () => (
            //   <Ionicons name="notifications" size={20} color={MainColor.white} />
            // ),
          }}
        />
        {/* <Stack.Screen name="forum/index"  options={{ title: "Forum",  }} /> */}
      </Stack>
    </>
  );
}
