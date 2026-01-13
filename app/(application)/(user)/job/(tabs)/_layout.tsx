/* eslint-disable react-hooks/exhaustive-deps */
import { BackButton } from "@/components";
import { IconHome, IconStatus } from "@/components/_Icon";
import BackButtonFromNotification from "@/components/Button/BackButtonFromNotification";
import { TabsStyles } from "@/styles/tabs-styles";
import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Tabs,
  useLocalSearchParams,
  useNavigation
} from "expo-router";
import { useLayoutEffect } from "react";

export default function JobTabsLayout() {
  const navigation = useNavigation();

  const { from, category } = useLocalSearchParams<{
    from?: string;
    category?: string;
  }>();

  // Atur header secara dinamis
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
       <BackButtonFromNotification from={from as string} category={category as string} />
      ),
    });
  }, [from, router, navigation]);

  return (
    <>
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
    </>
  );
}
