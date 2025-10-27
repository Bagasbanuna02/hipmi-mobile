import { IconHome, IconStatus } from "@/components/_Icon";
import { TabsStyles } from "@/styles/tabs-styles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function JobTabsLayout() {
  return (
    <Tabs screenOptions={TabsStyles}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => <IconHome color={color} />,
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          tabBarIcon: ({ color }) => <IconStatus color={color} />,
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: "Arsip",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="archive" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
