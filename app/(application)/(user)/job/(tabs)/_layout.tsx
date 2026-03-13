/* eslint-disable react-hooks/exhaustive-deps */
import { BackButton } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconHome, IconStatus } from "@/components/_Icon";
import BackButtonFromNotification from "@/components/Button/BackButtonFromNotification";
import { TabsStyles } from "@/styles/tabs-styles";
import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Tabs,
  useLocalSearchParams
} from "expo-router";

export default function JobTabsLayout() {
  const { from, category } = useLocalSearchParams<{
    from?: string;
    category?: string;
  }>();

  return (
    <>
      <Tabs
        screenOptions={{
          ...TabsStyles,
          header: () => (
            <AppHeader
              title="Job Vacancy"
              left={
                <BackButtonFromNotification from={from as string} category={category as string} />
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
