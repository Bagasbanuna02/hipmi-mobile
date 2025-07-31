import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { TabsStyles } from "@/styles/tabs-styles";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function InvestmentTabsLayout() {
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
