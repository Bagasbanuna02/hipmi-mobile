import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    InteractionManager,
    PanResponder,
    StyleSheet
} from "react-native";

import { AccentColor, MainColor } from "@/constants/color-palet";
import { SafeAreaView } from "react-native-safe-area-context";

// Lebar drawer (bisa di-pass sebagai prop)
const DRAWER_WIDTH = Dimensions.get("window").width * 0.8; // 80% lebar layar

interface DrawerAdminProps {
  children?: React.ReactNode;
  width?: number; // lebar drawer
  isVisible: boolean;
  onClose: () => void; // ganti nama dari closeDrawer agar lebih jelas
}

export default function DrawerAdmin({
  children,
  width = DRAWER_WIDTH,
  isVisible,
  onClose,
}: DrawerAdminProps) {
  const drawerAnim = useRef(new Animated.Value(-width)).current; // mulai dari kiri (tersembunyi)

  // Efek untuk handle animasi saat isVisible berubah
  useEffect(() => {
    if (isVisible) {
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(drawerAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, width, onClose, drawerAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10; // deteksi gesek horizontal
      },
      onPanResponderMove: (_, gestureState) => {
        let newAnim = gestureState.dx; // geser ke kanan = dx positif → drawerAnim negatif
        newAnim = Math.max(-width, Math.min(0, newAnim)); // batas antara -width dan 0
        drawerAnim.setValue(newAnim);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100) {
          // gesek kencang ke kiri → tutup
          InteractionManager.runAfterInteractions(() => {
            onClose();
          });
        } else {
          // kembali ke posisi terbuka penuh
          Animated.spring(drawerAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay Gelap */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: drawerAnim.interpolate({
              inputRange: [-width, 0],
              outputRange: [0, 0.6],
              extrapolate: "clamp",
            }),
          },
        ]}
        onTouchStart={() => {
          InteractionManager.runAfterInteractions(() => {
            onClose();
          });
        }}
      />

      {/* Left Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            width,
            transform: [{ translateX: drawerAnim }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Handle Bar (opsional) */}
        {/* <View style={styles.handleBar} /> */}

        <SafeAreaView>{children}</SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 998,
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: AccentColor.darkblue,
    // borderRadius: 20, // opsional
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 999,
    padding: 20,
  },
  handleBar: {
    width: 10,
    height: 5,
    backgroundColor: MainColor.yellow,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
});
