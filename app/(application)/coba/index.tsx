import { Stack } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenViewImage from "./screen-view-image";

const { width } = Dimensions.get("window");

// Main Custom Tab Navigator
const CustomTabNavigator = () => {
  return (
    <>
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <Stack.Screen
          options={{
            title: "Tampilan Percobaan",
          }}
        />
        <ScreenViewImage />
        {/* <ScreenUpload/> */}
        {/* <EventDetailScreen /> */}

        {/* <CustomUploadButton
          allowedExtensions={["jpeg", "png"]}
          buttonTitle="Unggah Gambar (JPEG/PNG)"
          onFileSelected={handleImageUpload}
        /> */}

        {/* Hanya PDF atau PNG */}
        {/* <CustomUploadButton
          allowedExtensions={["pdf"]}
          buttonTitle="Unggah PDF atau PNG"
          onFileSelected={handlePdfOrPngUpload}
        /> */}
      </SafeAreaView>
    </>
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
