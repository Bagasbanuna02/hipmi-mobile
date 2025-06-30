import { ITabs } from "@/components/_Interface/types";
import { Styles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ICustomTab {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}
const CustomTab = ({ icon, label, isActive, onPress }: ICustomTab) => (
  <TouchableOpacity
    style={[Styles.tabItem, isActive && Styles.activeTab]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[Styles.iconContainer, isActive && Styles.activeIconContainer]}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={isActive ? "#fff" : "#666"}
      />
    </View>
    <Text style={[Styles.tabLabel, isActive && Styles.activeTabLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function TabSection({ tabs }: { tabs: ITabs[] }) {
  return (
    <>
      <View style={Styles.tabBar}>
        <View style={Styles.tabContainer}>
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
