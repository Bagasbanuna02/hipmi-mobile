import BackButtonFromNotification from "@/components/Button/BackButtonFromNotification";
import { ICON_SIZE_SMALL, OS_ANDROID_HEIGHT, OS_IOS_HEIGHT } from "@/constants/constans-value";
import { TabsStyles } from "@/styles/tabs-styles";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router, Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { MainColor } from "@/constants/color-palet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

function InvestmentTabsWrapper() {
  const insets = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;
  const navigation = useNavigation();

  const { from, category } = useLocalSearchParams<{
    from?: string;
    category?: string;
  }>();

  // Atur header secara dinamis
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButtonFromNotification
          from={from || ""}
          category={category}
        />
      ),
    });
  }, [from, category, router, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: MainColor.darkblue }}>
      <Tabs
        screenOptions={{
          ...TabsStyles,
          tabBarStyle: Platform.select({
            ios: {
              borderTopWidth: 0,
              paddingTop: 12,
              height: OS_IOS_HEIGHT,
            },
            android: {
              borderTopWidth: 0,
              paddingTop: 5,
              height: OS_ANDROID_HEIGHT + paddingBottom,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Bursa",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="bar-chart-outline"
                color={color}
                size={ICON_SIZE_SMALL}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="portofolio"
          options={{
            title: "Portofolio",
            tabBarIcon: ({ color }) => (
              <Feather name="pie-chart" color={color} size={ICON_SIZE_SMALL} />
            ),
          }}
        />
        <Tabs.Screen
          name="my-holding"
          options={{
            title: "Saham Saya",
            tabBarIcon: ({ color }) => (
              <FontAwesome6
                name="hand-holding-dollar"
                color={color}
                size={ICON_SIZE_SMALL}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="transaction"
          options={{
            title: "Transaksi",
            tabBarIcon: ({ color }) => (
              <FontAwesome6
                name="money-bill-transfer"
                color={color}
                size={ICON_SIZE_SMALL}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

export default function InvestmentTabsLayout() {
  return <InvestmentTabsWrapper />;
}
