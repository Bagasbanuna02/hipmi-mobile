import { IconHome, IconStatus } from "@/components/_Icon";
import { ICON_SIZE_SMALL, OS_ANDROID_HEIGHT, OS_IOS_HEIGHT } from "@/constants/constans-value";
import { TabsStyles } from "@/styles/tabs-styles";
import {
    FontAwesome5
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { MainColor } from "@/constants/color-palet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

function DonationTabsWrapper() {
  const insets = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;

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
    </View>
  );
}

export default function DonationTabsLayout() {
  return <DonationTabsWrapper />;
}
