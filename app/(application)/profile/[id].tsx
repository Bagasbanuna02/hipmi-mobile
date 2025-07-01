import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { Styles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DRAWER_HEIGHT = 300; // tinggi drawer
export default function Profile() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // Animasi menggunakan translateY (lebih kompatibel)
  const drawerAnim = useRef(new Animated.Value(DRAWER_HEIGHT)).current; // mulai di luar bawah layar

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: DRAWER_HEIGHT, // sesuaikan dengan tinggi drawer Anda
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerOpen(false); // baru ganti state setelah animasi selesai
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 10; // gesek ke bawah
      },
      onPanResponderMove: (_, gestureState) => {
        const offset = gestureState.dy;
        if (offset >= 0 && offset <= DRAWER_HEIGHT) {
          drawerAnim.setValue(offset); // batasi hingga max 500
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 200) {
          // Tutup drawer sepenuhnya jika gesek lebih dari 200
          closeDrawer();
        } else {
          // Reset ke posisi awal jika gesek kurang
          Animated.spring(drawerAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <>
      <ViewWrapper>
        <Stack.Screen
          options={{
            title: "Profile",
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.back()}
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={openDrawer}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={MainColor.yellow}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Text style={Styles.textLabel}>Profile {id}</Text>
      </ViewWrapper>

      {/* Overlay Gelap */}
      {isDrawerOpen && (
        <View
          style={[
            stylesDrawer.overlay,
            { opacity: isDrawerOpen ? 0.6 : 0 }, // tampilkan overlay hanya saat drawer terbuka
          ]}
          pointerEvents={isDrawerOpen ? "auto" : "none"}
        >
          <TouchableOpacity onPress={closeDrawer} />
        </View>
      )}

      {/* Custom Bottom Drawer */}
      {isDrawerOpen && (
        <Animated.View
          style={[
            stylesDrawer.drawer,
            { transform: [{ translateY: drawerAnim }] },
          ]}
          {...panResponder.panHandlers}
        >
          <View
            style={[
              stylesDrawer.headerBar,
              { backgroundColor: MainColor.white },
            ]}
          />

          <TouchableOpacity
            style={stylesDrawer.menuItem}
            onPress={() => {
              alert("Pilihan 1 diklik");
              closeDrawer();
            }}
          >
            <Text>Menu Item 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesDrawer.menuItem}
            onPress={() => {
              alert("Pilihan 2 diklik");
              closeDrawer();
            }}
          >
            <Text>Menu Item 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesDrawer.menuItem}
            onPress={() => setShowLogoutAlert(true)}
          >
            <Text style={{ color: "red" }}>Logout Custom</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesDrawer.menuItem}
            onPress={() =>
              Alert.alert(
                "Konfirmasi Logout",
                "Apakah Anda sudah yakin?",
                [
                  {
                    text: "Batal",
                    onPress: () => console.log("Batal logout"),
                    style: "cancel",
                  },
                  {
                    text: "Ya",
                    onPress: () => {
                      console.log("Logout dipilih");
                      // Di sini Anda bisa tambahkan fungsi logout seperti clear token, redirect, dll
                      closeDrawer();
                    },
                  },
                ],
                { cancelable: true }
              )
            }
          >
            <Text style={{ color: "red" }}>Keluar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {showLogoutAlert && (
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>Konfirmasi Logout</Text>
            <Text style={styles.alertMessage}>Apakah Anda sudah yakin?</Text>
            <View style={styles.alertButtons}>
              <TouchableOpacity
                style={[styles.alertButton, styles.cancelButton]}
                onPress={() => setShowLogoutAlert(false)}
              >
                <Text style={styles.buttonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.alertButton, styles.confirmButton]}
                onPress={() => {
                  console.log("Logout dipilih");
                  setShowLogoutAlert(false);
                  closeDrawer();
                }}
              >
                <Text style={styles.buttonText}>Ya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const stylesDrawer = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.4,
  },
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: DRAWER_HEIGHT,
    backgroundColor: AccentColor.darkblue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  headerBar: {
    width: 40,
    height: 5,
    backgroundColor: MainColor.white,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  menuItem: {
    padding: 15,
  },
});

const styles = StyleSheet.create({
  alertOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  alertBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertMessage: {
    textAlign: "center",
    marginBottom: 20,
  },
  alertButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  alertButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
