import {
  IconContribution,
  IconHistory,
  IconHome,
  IconStatus,
} from "@/components/_Icon";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import BackButtonFromNotification from "@/components/Button/BackButtonFromNotification";
import { TabsStyles } from "@/styles/tabs-styles";
import { router, Tabs, useLocalSearchParams } from "expo-router";

export default function EventTabsLayout() {
  const { from, category } = useLocalSearchParams<{
    from?: string;
    category?: string;
  }>();

  return (
    <Tabs
      screenOptions={{
        ...TabsStyles,
        header: () => (
          <AppHeader
            title="Event"
            left={
              <BackButtonFromNotification
                from={from as string}
                category={category as string}
              />
            }
          />
        ),
      }}
    >
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
