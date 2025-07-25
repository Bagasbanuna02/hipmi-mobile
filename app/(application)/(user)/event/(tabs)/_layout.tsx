import { IconHome, IconStatus } from "@/components/_Icon";
import { TabsStyles } from "@/styles/tabs-styles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function EventTabsLayout() {
  return (
    <Tabs
      screenOptions={TabsStyles}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => (
            <IconHome color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          tabBarIcon: ({ color }) => (
            <IconStatus color={color}/>
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

