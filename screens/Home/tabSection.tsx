import { ICustomTab, ITabs } from "@/components/_Interface/types";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";


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
        size={20}
        color={isActive ? "#fff" : "#666"}
      />
    </View>
    <Text style={[GStyles.tabLabel, isActive && GStyles.activeTabLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function TabSection({ tabs }: { tabs: ITabs[] }) {
  return (
    <>
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
    </>
  );
}
