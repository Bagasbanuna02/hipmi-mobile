/* eslint-disable react-hooks/exhaustive-deps */
import { BackButton } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconHome, IconStatus } from "@/components/_Icon";
import BackButtonFromNotification from "@/components/Button/BackButtonFromNotification";
import { TabsStyles } from "@/styles/tabs-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { MainColor } from "@/constants/color-palet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import {
  OS_ANDROID_HEIGHT,
  OS_ANDROID_PADDING_TOP,
  OS_IOS_HEIGHT,
  OS_IOS_PADDING_TOP,
} from "@/constants/constans-value";

function JobTabsWrapper() {
  const insets = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;
  const { from, category } = useLocalSearchParams<{
    from?: string;
    category?: string;
  }>();

  return (
    <View style={{ flex: 1, backgroundColor: MainColor.darkblue }}>
      <Tabs
        screenOptions={{
          ...TabsStyles,
          tabBarStyle: Platform.select({
            ios: {
              borderTopWidth: 0,
              paddingTop: OS_IOS_PADDING_TOP,
              height: OS_IOS_HEIGHT,
            },
            android: {
              borderTopWidth: 0,
              paddingTop: OS_ANDROID_PADDING_TOP,
              height: OS_ANDROID_HEIGHT + paddingBottom,
            },
          }),
          header: () => (
            <AppHeader
              title="Job Vacancy"
              left={
                <BackButtonFromNotification
                  from={from || ""}
                  category={category}
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
          name="archive"
          options={{
            title: "Arsip",
            tabBarIcon: ({ color }) => (
              <Ionicons size={20} name="archive" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

export default function JobTabsLayout() {
  return <JobTabsWrapper />;
}
