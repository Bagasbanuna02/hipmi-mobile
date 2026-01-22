import BackButtonFromNotification from "@/components/Button/BackButtonFromNotification";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { TabsStyles } from "@/styles/tabs-styles";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router, Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function InvestmentTabsLayout() {
  // const navigation = useNavigation();

  // const { from, category } = useLocalSearchParams<{
  //   from?: string;
  //   category?: string;
  // }>();

  // console.log("from", from);
  // console.log("category", category);

  // // Atur header secara dinamis
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <BackButtonFromNotification
  //         from={from as string}
  //         category={category as string}
  //       />
  //     ),
  //   });
  // }, [from, router, navigation]);

  return (
    <Tabs screenOptions={TabsStyles}>
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
  );
}
