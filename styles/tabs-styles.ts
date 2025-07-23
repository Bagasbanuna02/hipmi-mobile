import { TabBarBackground } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { OS_IOS_HEIGHT, OS_ANDROID_HEIGHT } from "@/constants/constans-value";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

export const TabsStyles: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: MainColor.yellow,
  tabBarInactiveTintColor: MainColor.white_gray,
  tabBarStyle: Platform.select({
    ios: {
      borderTopWidth: 0,
      paddingTop: 5,
      height: OS_IOS_HEIGHT,
    },
    android: {
      borderTopWidth: 0,
      paddingTop: 5,
      height: OS_ANDROID_HEIGHT,
    },
    default: {},
  }),
  tabBarBackground: TabBarBackground,
};
