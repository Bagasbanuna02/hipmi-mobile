import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import LeftButtonCustom from "@/components/Button/BackButton";
import DrawerCustom from "@/components/Drawer/DrawerCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { drawerItemsProfile } from "@/screens/Profile/ListPage";
import Profile_MenuDrawerSection from "@/screens/Profile/menuDrawerSection";
import ProfileSection from "@/screens/Profile/ProfileSection";
import { apiProfile } from "@/service/api-client/api-profile";
import { GStyles } from "@/styles/global-styles";
import { IProfile } from "@/types/Type-Profile";
import { Ionicons } from "@expo/vector-icons";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams
} from "expo-router";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Profile() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState<IProfile>();

  const { logout, isAdmin } = useAuth();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
    }, [id])
  );

  async function onLoadData(id: string) {
    const response = await apiProfile({ id: id });
    setData(response.data);
  }

  return (
    <>
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
      <ViewWrapper>
        {/* Header */}
        <ProfileSection data={data as any} />
      </ViewWrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        height={"auto"}
        isVisible={isDrawerOpen}
        closeDrawer={closeDrawer}
      >
        <Profile_MenuDrawerSection
          drawerItems={drawerItemsProfile({ id: id as string, isAdmin })}
          setIsDrawerOpen={setIsDrawerOpen}
          logout={logout}
        />
      </DrawerCustom>
    </>
  );
}
