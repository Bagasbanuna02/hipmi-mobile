
//app/(application)/(tabs)/_layout.tsx
import { MainColor } from "@/constants/color-palet";
import { Entypo } from "@expo/vector-icons";
import { Tabs } from "expo-router";

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

        <Tabs.Screen
          name="forum/index"
          options={{
            title: "Forum",
            tabBarIcon: () => (
              <Entypo name="chat" size={20} color={MainColor.white} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
