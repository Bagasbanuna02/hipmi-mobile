/* eslint-disable @typescript-eslint/no-unused-vars */
//app/(application)/(tabs)/_layout.tsx
import { MainColor } from "@/constants/color-palet";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";

export default function TabsLayout() {

  return (
    <>
      <Tabs
        screenOptions={{
          headerTitleAlign: "center",
          tabBarStyle: {
            backgroundColor: MainColor.darkblue,
          },
          tabBarActiveTintColor: MainColor.white,
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="forum"
          options={{
            title: "Forum",
            tabBarIcon: () => (
              <Entypo name="chat" size={20} color={MainColor.white} />
            ),
            headerLeft: () => (
              <Ionicons name="arrow-back" onPress={() => {router.back()}} size={20} color={MainColor.white} />
            ),
          }}
        />

        <Tabs.Screen
          name="katalog"
          options={{
            title: "Katalog",
            tabBarIcon: () => (
              <Entypo name="book" size={20} color={MainColor.white} />
            ),
          }}
        />
        <Tabs.Screen
          name="maps"
          options={{
            title: "Maps",
            tabBarIcon: () => (
              <Entypo name="map" size={20} color={MainColor.white} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
