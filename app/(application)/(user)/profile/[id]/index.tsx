import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import AlertCustom from "@/components/Alert/AlertCustom";
import LeftButtonCustom from "@/components/Button/BackButton";
import DrawerCustom from "@/components/Drawer/DrawerCustom";
import { MainColor } from "@/constants/color-palet";
import { DRAWER_HEIGHT } from "@/constants/constans-value";
import { drawerItems } from "@/screens/Profile/ListPage";
import Profile_MenuDrawerSection from "@/screens/Profile/MenuDrawerSection";
import ProfilSection from "@/screens/Profile/ProfilSection";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, InteractionManager, TouchableOpacity } from "react-native";

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
      InteractionManager.runAfterInteractions(() => {
        setIsDrawerOpen(false); // baru ganti state setelah animasi selesai
      });
    });
  };

  const handleLogout = () => {
    console.log("User logout");
    router.replace("/");
    setShowLogoutAlert(false);
  };

  return (
    <>
      <ViewWrapper>
        {/* Header */}
        <Stack.Screen
          options={{
            title: "Profile",
            headerLeft: () => <LeftButtonCustom />,
            headerRight: () => (
              <TouchableOpacity onPress={openDrawer}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={MainColor.yellow}
                />
              </TouchableOpacity>
            ),
            headerStyle: GStyles.headerStyle,
            headerTitleStyle: GStyles.headerTitleStyle,
          }}
        />
        <ProfilSection />
      </ViewWrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        height={350}
        isVisible={isDrawerOpen}
        drawerAnim={drawerAnim}
        closeDrawer={closeDrawer}
      >
        <Profile_MenuDrawerSection
          drawerItems={drawerItems({ id: id as string })}
          setShowLogoutAlert={setShowLogoutAlert}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </DrawerCustom>

      {/* Alert Komponen Eksternal */}
      <AlertCustom
        isVisible={showLogoutAlert}
        onLeftPress={() => setShowLogoutAlert(false)}
        onRightPress={handleLogout}
        title="Apakah anda yakin ingin keluar?"
        textLeft="Batal"
        textRight="Keluar"
        colorRight={MainColor.red}
      />
    </>
  );
}
