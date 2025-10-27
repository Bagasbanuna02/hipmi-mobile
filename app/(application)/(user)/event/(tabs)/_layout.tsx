import {
  IconContribution,
  IconHistory,
  IconHome,
  IconStatus,
} from "@/components/_Icon";
import { TabsStyles } from "@/styles/tabs-styles";
import { Tabs } from "expo-router";

export default function EventTabsLayout() {
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
        name="contribution"
        options={{
          title: "Kontribusi",
          tabBarIcon: ({ color }) => <IconContribution color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          tabBarIcon: ({ color }) => <IconHistory color={color} />,
        }}
      />
    </Tabs>
  );
}
