import { MainColor } from "@/constants/color-palet";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function EventLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: MainColor.yellow,
        tabBarInactiveTintColor: MainColor.white_gray,
        tabBarStyle: {
          backgroundColor: MainColor.darkblue,
        },
        //   tabBarButton: HapticTab,
        //   tabBarBackground: BlurTabBarBackground,
        //   tabBarStyle: Platform.select({
        //     ios: {
        //       // Use a transparent background on iOS to show the blur effect
        //       position: "absolute",
        //     },
        //     default: {},
        //   }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="kontribusi"
        options={{
          title: "Kontribusi",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="extension-puzzle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="riwayat"
        options={{
          title: "Riwayat",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={20} name="history" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
