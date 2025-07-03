import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  InteractionManager,
} from "react-native";

import { AccentColor, MainColor } from "@/constants/color-palet";
import { DRAWER_HEIGHT } from "@/constants/constans-value";

interface DrawerCustomProps {
  children?: React.ReactNode;
  height?: number;
  isVisible: boolean;
  drawerAnim: Animated.Value;
  closeDrawer: () => void;
  //   openLogoutAlert: () => void;
}


/**
 * 
 * @param drawerAnim 
 * @example   const drawerAnim = useRef(new Animated.Value(DRAWER_HEIGHT)).current; // mulai di luar bawah layar
 */
export default function DrawerCustom({
  children,
  height,
  isVisible,
  drawerAnim,
  closeDrawer,
}: //   openLogoutAlert,
DrawerCustomProps) {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 10; // gesek ke bawah
      },
      onPanResponderMove: (_, gestureState) => {
        const offset = gestureState.dy;
        if (offset >= 0 && offset <= DRAWER_HEIGHT) {
          drawerAnim.setValue(offset);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 200) {
          InteractionManager.runAfterInteractions(() => {
            closeDrawer();
          });
        } else {
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
      <View
        style={styles.overlay}
        pointerEvents="auto"
        onTouchStart={() => {
          InteractionManager.runAfterInteractions(() => {
            closeDrawer();
          });
        }}
      />

      {/* Custom Bottom Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            height: height || DRAWER_HEIGHT,
            transform: [{ translateY: drawerAnim }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View
          style={[styles.headerBar, { backgroundColor: MainColor.white }]}
        />

        {children}

        {/* <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            alert("Pilihan 1 diklik");
            closeDrawer();
          }}
        >
          <Text>Menu Item 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            alert("Pilihan 2 diklik");
            closeDrawer();
          }}
        >
          <Text>Menu Item 2</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => alert("Logout via Alert bawaan")}
        >
          <Text style={{ color: "red" }}>Keluar</Text>
        </TouchableOpacity> */}
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
    opacity: 0.6,
    zIndex: 998,
  },
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: AccentColor.darkblue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    elevation: 5,
    zIndex: 999,
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
