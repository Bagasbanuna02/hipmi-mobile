import { IMenuDrawerItem } from "@/components/_Interface/types";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import AlertCustom from "@/components/Alert/AlertCustom";
import BackButton from "@/components/Button/BackButton";
import DrawerCustom from "@/components/Drawer/DrawerCustom";
import { MainColor } from "@/constants/color-palet";
import { DRAWER_HEIGHT } from "@/constants/constans-value";
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

  const drawerItems: IMenuDrawerItem[] = [
    {
      icon: "create",
      label: "Edit profile",
      path: `/(application)/profile/${id}/edit`,
    },
    {
      icon: "camera",
      label: "Ubah foto profile",
      path: `/(application)/profile/${id}/update-photo`,
    },
    {
      icon: "image",
      label: "Ubah latar belakang",
      path: `/(application)/profile/${id}/update-background`,
    },
    {
      icon: "add-circle",
      label: "Tambah portofolio",
      path: `/(application)/portofolio/${id}/create`,
    },
    // {
    //   icon: "settings",
    //   label: "Dashboard Admin",
    //   path: `/(application)/profile/dashboard-admin`,
    // },
    { icon: "log-out", label: "Keluar", color: "red", path: "" },
  ];

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
            headerLeft: () => <BackButton />,
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
          drawerItems={drawerItems}
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
