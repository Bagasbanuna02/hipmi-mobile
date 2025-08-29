import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import LeftButtonCustom from "@/components/Button/BackButton";
import DrawerCustom from "@/components/Drawer/DrawerCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { drawerItemsProfile } from "@/screens/Profile/ListPage";
import Profile_MenuDrawerSection from "@/screens/Profile/menuDrawerSection";
import Profile_PortofolioSection from "@/screens/Profile/PortofolioSection";
import ProfileSection from "@/screens/Profile/ProfileSection";
import { apiGetPortofolio } from "@/service/api-client/api-portofolio";
import { apiProfile } from "@/service/api-client/api-profile";
import { GStyles } from "@/styles/global-styles";
import { IProfile } from "@/types/Type-Profile";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Profile() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState<IProfile>();
  const [dataPortofolio, setDataPortofolio] = useState<any[]>();

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
      onLoadPortofolio(id as string);
    }, [id])
  );

  const onLoadData = async (id: string) => {
    const response = await apiProfile({ id: id });
    setData(response.data);
  };

  const onLoadPortofolio = async (id: string) => {
    const response = await apiGetPortofolio({ id: id });
    const lastTwoByDate = response.data
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ) // urut desc
      .slice(0, 2);
    setDataPortofolio(lastTwoByDate);
  };

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
      {/* Main View */}
      <ViewWrapper>
        <ProfileSection data={data as any} />

        <Profile_PortofolioSection
          data={dataPortofolio as any}
          profileId={id as string}
        />
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
