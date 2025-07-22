import { AccentColor, MainColor } from "@/constants/color-palet";
import { OS_IOS_HEIGHT, OS_ANDROID_HEIGHT } from "@/constants/constans-value";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

export default function EventTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: MainColor.yellow,
        tabBarInactiveTintColor: MainColor.white_gray,
        tabBarBackground: CustomTabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            borderTopWidth: 0,
            paddingTop: 5,
            height: OS_IOS_HEIGHT,
          },
          android: {
            borderTopWidth: 0,
            paddingTop: 5,
            height: OS_ANDROID_HEIGHT,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
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
        name="contribution"
        options={{
          title: "Kontribusi",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="extension-puzzle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
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

function CustomTabBarBackground() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: MainColor.darkblue,
        borderTopWidth: 1,
        borderTopColor: AccentColor.blue,
      }}
    />
  );
}
