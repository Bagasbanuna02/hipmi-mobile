/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import EventDetailScreen from "./double-scroll";
import LeftButtonCustom from "@/components/Button/BackButton";
import CustomUploadButton from "./upload-button";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Sample Screen Components
const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenTitle}>Selamat Datang!</Text>
    <Text style={styles.screenText}>
      Ini adalah halaman utama aplikasi Anda
    </Text>
  </View>
);
const SearchScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenTitle}>Search Screen</Text>
    <Text style={styles.screenText}>Cari apa yang Anda butuhkan</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenTitle}>Profile Screen</Text>
    <Text style={styles.screenText}>Informasi profil pengguna</Text>
  </View>
);

const NotificationScreen = () => (
  <View style={styles.screen}>
    {Array.from({ length: 10 }).map((_, index) => (
      <View key={index}>
        <Text style={styles.screenTitle}>Notifications</Text>
        <Text style={styles.screenText}>Notifikasi terbaru Anda</Text>
      </View>
    ))}
  </View>
);

// Custom Tab Component
const CustomTab = ({ icon, label, isActive, onPress }: any) => (
  <TouchableOpacity
    style={[styles.tabItem, isActive && styles.activeTab]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[styles.iconContainer, isActive && styles.activeIconContainer]}
    >
      <Ionicons name={icon} size={24} color={isActive ? "#fff" : "#666"} />
    </View>
    <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
      {label}
    </Text>
    {isActive && <View style={styles.activeIndicator} />}
  </TouchableOpacity>
);

// Main Custom Tab Navigator
const CustomTabNavigator = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const [showHome, setShowHome] = React.useState(true);

  const tabs = [
    {
      id: "search",
      icon: "search-outline",
      activeIcon: "search",
      label: "Event",
      component: SearchScreen,
      path: "/event",
    },
    {
      id: "notifications",
      icon: "notifications-outline",
      activeIcon: "notifications",
      label: "Forum",
      component: NotificationScreen,
      path: "/forum",
    },
    {
      id: "profile",
      icon: "person-outline",
      activeIcon: "person",
      label: "Katalog",
      component: ProfileScreen,
      path: "/profile",
    },
  ];

  // Function untuk handle tab press
  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    setShowHome(false); // Hide home when any tab is pressed
  };

  // Determine which component to show
  const getActiveComponent = () => {
    if (showHome || activeTab === "home") {
      return HomeScreen;
    }
    // const selectedTab = tabs.find((tab) => tab.id === activeTab);
    // return selectedTab ? selectedTab.component : HomeScreen;
    return HomeScreen;
  };

  const ActiveComponent = getActiveComponent();

  const handleImageUpload = (file: any) => {
    console.log("Gambar dipilih:", file);
    // Upload ke server
  };

  const handlePdfOrPngUpload = (file: any) => {
    console.log("PDF atau PNG dipilih:", file);
  };

  return (
    <>
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <Stack.Screen
          options={{
            title: "Custom Tab Navigator",
          }}
        />
        <EventDetailScreen />

        <CustomUploadButton
          allowedExtensions={["jpeg", "png"]}
          buttonTitle="Unggah Gambar (JPEG/PNG)"
          onFileSelected={handleImageUpload}
        />

        {/* Hanya PDF atau PNG */}
        <CustomUploadButton
          allowedExtensions={["pdf"]}
          buttonTitle="Unggah PDF atau PNG"
          onFileSelected={handlePdfOrPngUpload}
        />
      </SafeAreaView>
    </>
    // <View style={styles.container}>
    //   {/* Content Area */}
    //   <ScrollView>
    //     <View style={styles.content}>
    //       <ActiveComponent />
    //     </View>
    //   </ScrollView>

    //   {/* Custom Tab Bar */}
    //   <View style={styles.tabBar}>
    //     <View style={styles.tabContainer}>
    //       {tabs.map((e) => (
    //         <CustomTab
    //           key={e.id}
    //           icon={activeTab === e.id ? e.activeIcon : e.icon}
    //           label={e.label}
    //           isActive={activeTab === e.id && !showHome}
    //           onPress={() => {
    //             handleTabPress(e.id);
    //             router.push(e.path as any);
    //           }}
    //         />
    //       ))}
    //     </View>
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  screenText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  tabBar: {
    backgroundColor: "#fff",
    paddingBottom: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
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
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#007AFF",
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

export default CustomTabNavigator;
