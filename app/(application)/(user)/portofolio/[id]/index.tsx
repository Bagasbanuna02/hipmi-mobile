import { DrawerCustom, TextCustom } from "@/components";
import LeftButtonCustom from "@/components/Button/BackButton";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { DRAWER_HEIGHT } from "@/constants/constans-value";
import { drawerItems } from "@/screens/Profile/ListPage";
import Profile_MenuDrawerSection from "@/screens/Profile/MenuDrawerSection";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  InteractionManager,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Portofolio() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const drawerAnim = useRef(new Animated.Value(DRAWER_HEIGHT)).current;

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
    setIsDrawerOpen(false);
  };
  return (
    <>
      <ViewWrapper>
        {/* Header */}
        <Stack.Screen
          options={{
            title: "Portofolio",
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
        <Text style={GStyles.textLabel}>Portofolio {id}</Text>
      </ViewWrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        isVisible={isDrawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
        height={350}
      >
        <Profile_MenuDrawerSection
          drawerItems={drawerItems({ id: id as string })}
          setShowLogoutAlert={setShowLogoutAlert}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </DrawerCustom>
    </>
  );
}
