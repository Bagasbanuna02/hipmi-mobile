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
import { View } from "react-native";
import { MainColor } from "@/constants/color-palet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

function VotingTabsWrapper() {
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
              paddingTop: 12,
              height: 80,
            },
            android: {
              borderTopWidth: 0,
              paddingTop: 5,
              height: 70 + paddingBottom,
            },
          }),
          header: () => (
            <AppHeader
              title="Voting"
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
    </View>
  );
}

export default function VotingTabsLayout() {
  return <VotingTabsWrapper />;
}
