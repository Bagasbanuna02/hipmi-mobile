import {
  IconContribution,
  IconHistory,
  IconHome,
  IconStatus,
} from "@/components/_Icon";
import BackButtonFromNotification from "@/components/Button/BackButtonFromNotification";
import { TabsStyles } from "@/styles/tabs-styles";
import { Tabs, useLocalSearchParams, useNavigation, router } from "expo-router";
import { useLayoutEffect } from "react";

export default function VotingTabsLayout() {
  const navigation = useNavigation();

  const { from, category } = useLocalSearchParams<{
    from?: string;
    category?: string;
  }>();

  console.log("from", from);
  console.log("category", category);

  // Atur header secara dinamis
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButtonFromNotification
          from={from as string}
          category={category as string}
        />
      ),
    });
  }, [from, router, navigation]);

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
