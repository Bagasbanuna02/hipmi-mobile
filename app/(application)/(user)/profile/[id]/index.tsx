import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import AlertCustom from "@/components/Alert/AlertCustom";
import LeftButtonCustom from "@/components/Button/BackButton";
import DrawerCustom from "@/components/Drawer/DrawerCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { drawerItemsProfile } from "@/screens/Profile/ListPage";
import Profile_MenuDrawerSection from "@/screens/Profile/menuDrawerSection";
import ProfileSection from "@/screens/Profile/ProfileSection";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Profile() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const { logout } = useAuth();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
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
        <ProfileSection />
      </ViewWrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        height={350}
        isVisible={isDrawerOpen}
        closeDrawer={closeDrawer}
      >
        <Profile_MenuDrawerSection
          drawerItems={drawerItemsProfile({ id: id as string })}
          setShowLogoutAlert={setShowLogoutAlert}
          setIsDrawerOpen={setIsDrawerOpen}
          logout={logout}
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
