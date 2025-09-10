/* eslint-disable react-hooks/exhaustive-deps */
import { DrawerCustom, LoaderCustom, Spacing, StackCustom } from "@/components";
import LeftButtonCustom from "@/components/Button/BackButton";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import Portofolio_BusinessLocation from "@/screens/Portofolio/BusinessLocationSection";
import Portofolio_ButtonDelete from "@/screens/Portofolio/ButtonDelete";
import Portofolio_Data from "@/screens/Portofolio/DataPortofolio";
import { drawerItemsPortofolio } from "@/screens/Portofolio/ListPage";
import Portofolio_MenuDrawerSection from "@/screens/Portofolio/MenuDrawer";
import Portofolio_SocialMediaSection from "@/screens/Portofolio/SocialMediaSection";
import { apiGetOnePortofolio } from "@/service/api-client/api-portofolio";
import { apiUser } from "@/service/api-client/api-user";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Portofolio() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [data, setData] = useState<any>();
  const [profileId, setProfileId] = useState<any>();

  const { user } = useAuth();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
      onLoadUserByToken();
    }, [id])
  );

  async function onLoadData(id: string) {
    const response = await apiGetOnePortofolio({ id: id });
    console.log(
      "[PROFILE ID]>>",
      JSON.stringify(response.data.Profile.id, null, 2)
    );
    setData(response.data);
  }

  const onLoadUserByToken = async () => {
    const response = await apiUser(user?.id as string);
    console.log(
      "[PROFILE LOGIN]>>",
      JSON.stringify(response.data?.Profile.id, null, 2)
    );
    setProfileId(response?.data?.Profile?.id);
  };

  return (
    <>
      {/* Header */}
      <Stack.Screen
        options={{
          title: "Portofolio",
          headerLeft: () => <LeftButtonCustom />,
          headerRight: () =>
            data?.Profile?.id !== profileId ? null : (
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
        {!data || !profileId ? (
          <LoaderCustom />
        ) : (
          <StackCustom>
            <Portofolio_Data
              data={data}
              listSubBidang={data?.Portofolio_BidangDanSubBidangBisnis as any[]}
            />
            <Portofolio_BusinessLocation />
            <Portofolio_SocialMediaSection
              data={data?.Portofolio_MediaSosial}
            />
            <Portofolio_ButtonDelete
              id={id as string}
              isLoadingDelete={isLoadingDelete}
              setIsLoadingDelete={setIsLoadingDelete}
            />
            <Spacing />
          </StackCustom>
        )}
      </ViewWrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        isVisible={isDrawerOpen}
        closeDrawer={closeDrawer}
        height={"auto"}
      >
        <Portofolio_MenuDrawerSection
          drawerItems={drawerItemsPortofolio({ id: id as string })}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </DrawerCustom>
    </>
  );
}
