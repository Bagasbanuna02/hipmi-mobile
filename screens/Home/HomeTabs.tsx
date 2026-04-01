import { ICustomTab, ITabs } from "@/components/_Interface/types";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainColor } from "@/constants/color-palet";

interface HomeTabsProps {
  tabs: ITabs[];
}

const CustomTab = ({ icon, label, isActive, onPress }: ICustomTab) => (
  <TouchableOpacity
    style={[GStyles.tabItem, isActive && GStyles.activeTab]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[GStyles.iconContainer, isActive && GStyles.activeIconContainer]}
    >
      <Ionicons
        name={icon as any}
        size={18}
        color={isActive ? "#fff" : "#666"}
      />
    </View>
    <Text style={[GStyles.tabLabel, isActive && GStyles.activeTabLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

/**
 * Home Tabs Component dengan Safe Area handling
 * 
 * Component ini menggunakan pattern yang sama dengan Expo Router Tabs
 * untuk konsistensi safe area di Android
 */
export default function HomeTabs({ tabs }: HomeTabsProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;

  return (
    <View style={{ backgroundColor: MainColor.darkblue }}>
      {/* Tabs content */}
      <View style={GStyles.tabBar}>
        <View style={GStyles.tabContainer}>
          {tabs.map((e) => (
            <CustomTab
              key={e.id}
              icon={e.icon}
              label={e.label}
              isActive={e.isActive}
              onPress={() => {
                // eslint-disable-next-line no-unused-expressions
                e.disabled ? console.log("disabled") : router.push(e.path);
              }}
            />
          ))}
        </View>
      </View>
      
      {/* Safe area padding untuk Android */}
      {Platform.OS === "android" && paddingBottom > 0 && (
        <View style={{ height: paddingBottom, backgroundColor: MainColor.darkblue }} />
      )}
    </View>
  );
}
