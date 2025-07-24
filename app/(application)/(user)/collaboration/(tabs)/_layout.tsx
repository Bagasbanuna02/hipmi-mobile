import { TabsStyles } from "@/styles/tabs-styles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function CollaborationTabsLayout() {
  return (
    <Tabs screenOptions={TabsStyles}>
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
        name="participant"
        options={{
          title: "Partisipan",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="people" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "Grup",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="chatbox-ellipses" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
