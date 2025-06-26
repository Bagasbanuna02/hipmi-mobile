/* eslint-disable no-unused-expressions */
import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Home_BottomFeatureSection from "./bottomFeatureSection";
import Home_ImageSection from "./imageSection";
import Home_FeatureSection from "./topFeatureSection";

interface Tabs {
  id: string;
  icon: string;
  activeIcon: string;
  label: string;
  path: Href;
  isActive: boolean;
  disabled: boolean;
}

const { width } = Dimensions.get("window");

export default function NewHomeView() {
  const tabs: Tabs[] = [
    {
      id: "forum",
      icon: "chatbubble-ellipses-outline",
      activeIcon: "chatbubble-ellipses",
      label: "Forum",
      path: "/forum",
      isActive: true,
      disabled: false,
    },
    {
      id: "marketplace",
      icon: "cart-outline",
      activeIcon: "cart",
      label: "Marketplace",
      path: "/market-place",
      isActive: false,
      disabled: true,
    },
    {
      id: "maps",
      icon: "map-outline",
      activeIcon: "map",
      label: "Maps",
      path: "/maps",
      isActive: true,
      disabled: false,
    },
    {
      id: "profile",
      icon: "person-outline",
      activeIcon: "person",
      label: "Profile",
      path: "/profile",
      isActive: true,
      disabled: false,
    },
  ];

  const CustomTab = ({ icon, label, isActive, onPress, disabled }: any) => (
    <TouchableOpacity
      style={[styles.tabItem, isActive && styles.activeTab]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconContainer, isActive && styles.activeIconContainer]}
      >
        <Ionicons name={icon} size={20} color={isActive ? "#fff" : "#666"} />
      </View>
      <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
        {label}
      </Text>
      {isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );

  return (
    <>
      <ViewWrapper
        tabBarComponent={
          <View style={styles.tabBar}>
            <View style={styles.tabContainer}>
              {tabs.map((e) => (
                <CustomTab
                  key={e.id}
                  icon={e.icon}
                  label={e.label}
                  isActive={e.isActive}
                  onPress={() => {
                    e.disabled ? console.log("disabled") : router.push(e.path);
                  }}
                />
              ))}
            </View>
          </View>
        }
      >
        <Home_ImageSection />
        <Spacing height={10} />

        {/* Grid Section */}
        <Home_FeatureSection />
        <Spacing height={10} />

        {/* Job Vacancy Section */}
        <Home_BottomFeatureSection />
        <Spacing height={20} />
      </ViewWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: MainColor.darkblue,
    borderTopColor: AccentColor.blue,
    borderTopWidth: 1,
    // borderTopEndRadius: 10,
    // borderTopStartRadius: 10,
    // tintColor: MainColor.yellow
    // paddingBottom: 20,
    // paddingTop: 10,
    // shadowColor: AccentColor.blue,
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.9,
    // shadowRadius: 3,
    // elevation: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: width / 5,
    position: "relative",
  },
  activeTab: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    // marginBottom: 4,
  },
  activeIconContainer: {
    // backgroundColor: "#007AFF",
    // shadowColor: "#007AFF",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 4,
  },
  tabLabel: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: MainColor.white,
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#007AFF",
  },
});
