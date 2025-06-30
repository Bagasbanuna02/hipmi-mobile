import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { Styles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
} from "react-native";
import React, { useRef, useState } from "react";

export default function Profile() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Animasi menggunakan translateY (lebih kompatibel)
  const drawerAnim = useRef(new Animated.Value(200)).current; // mulai di luar bawah layar

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
      toValue: 200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy < -10; // gesek ke atas untuk tutup
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          closeDrawer(); // tutup jika gesek cukup tinggi
        } else {
          // kembali ke posisi awal
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
      <ViewWrapper >
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

      {/* Custom Bottom Drawer */}
      {isDrawerOpen && (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 200,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.2,
            elevation: 5,
            transform: [{ translateY: drawerAnim }],
          }}
          {...panResponder.panHandlers}
        >
          <View
            style={{
              width: 40,
              height: 5,
              backgroundColor: "#ccc",
              borderRadius: 5,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />

          <TouchableOpacity
            style={{ padding: 15 }}
            onPress={() => {
              alert("Pilihan 1 diklik");
              closeDrawer();
            }}
          >
            <Text>Menu Item 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 15 }}
            onPress={() => {
              alert("Pilihan 2 diklik");
              closeDrawer();
            }}
          >
            <Text>Menu Item 2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 15 }} onPress={closeDrawer}>
            <Text style={{ color: "red" }}>Tutup</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}
