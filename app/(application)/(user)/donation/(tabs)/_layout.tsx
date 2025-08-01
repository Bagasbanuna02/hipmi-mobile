import { IconHome, IconStatus } from "@/components/_Icon";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { TabsStyles } from "@/styles/tabs-styles";
import {
    FontAwesome5
} from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function InvestmentTabsLayout() {
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
          title: "Galang Dana",
          tabBarIcon: ({ color }) => <IconStatus color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-donation"
        options={{
          title: "Donasi Saya",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="donate" color={color} size={ICON_SIZE_SMALL} />
          ),
        }}
      />
    </Tabs>
  );
}
