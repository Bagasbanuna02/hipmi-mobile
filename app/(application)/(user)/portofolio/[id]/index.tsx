/* eslint-disable react-hooks/exhaustive-deps */
import {
  ButtonCustom,
  DrawerCustom,
  DummyLandscapeImage,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import LeftButtonCustom from "@/components/Button/BackButton";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
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
import { openInDeviceMaps } from "@/utils/openInDeviceMaps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Portofolio() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [data, setData] = useState<any>();
  const [profileId, setProfileId] = useState<any>();
  const [openDrawerLocation, setOpenDrawerLocation] = useState(false);

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
    }, [id]),
  );

  async function onLoadData(id: string) {
    const response = await apiGetOnePortofolio({ id: id });

    setData(response.data);
  }

  const onLoadUserByToken = async () => {
    const response = await apiUser(user?.id as string);

    setProfileId(response?.data?.Profile?.id);
  };



  return (
    <>
      {/* Header */}
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Portofolio"
              left={<LeftButtonCustom />}
              right={
                data?.Profile?.id !== profileId ? null : (
                  <TouchableOpacity onPress={openDrawer}>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={20}
                      color={MainColor.yellow}
                    />
                  </TouchableOpacity>
                )
              }
            />
          ),
        }}
      />
      <ViewWrapper>
        {!data || !profileId ? (
            <StackCustom>
            <CustomSkeleton height={400} />
            <CustomSkeleton height={300} />
          </StackCustom>
        ) : (
          <StackCustom>
            <Portofolio_Data
              data={data}
              listSubBidang={data?.Portofolio_BidangDanSubBidangBisnis as any[]}
            />
            {data?.BusinessMaps && (
              <Portofolio_BusinessLocation
                data={data?.BusinessMaps}
                imageId={data?.logoId}
                setOpenDrawerLocation={setOpenDrawerLocation}
              />
            )}

            <Portofolio_SocialMediaSection
              data={data?.Portofolio_MediaSosial}
            />
            {data?.Profile?.id !== profileId ? null : (
              <Portofolio_ButtonDelete
                id={id as string}
                isLoadingDelete={isLoadingDelete}
                setIsLoadingDelete={setIsLoadingDelete}
              />
            )}
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
          drawerItems={drawerItemsPortofolio({
            id: id as string,
            maps: data?.BusinessMaps,
          })}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </DrawerCustom>

      {/* Drawer Lokasi */}
      <DrawerCustom
        isVisible={openDrawerLocation}
        closeDrawer={() => setOpenDrawerLocation(false)}
        height={"auto"}
      >
        {data?.BusinessMaps?.imageId && (
          <DummyLandscapeImage
            height={200}
            imageId={data?.BusinessMaps?.imageId}
          />
        )}
        <Spacing />
        <StackCustom gap={"xs"}>
          <GridTwoView
            spanLeft={2}
            spanRight={10}
            leftItem={
              <FontAwesome
                name="building-o"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightItem={<TextCustom>{data?.BusinessMaps?.namePin}</TextCustom>}
          />

          <GridTwoView
            spanLeft={2}
            spanRight={10}
            leftItem={
              <Ionicons
                name="list-outline"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightItem={
              <TextCustom>{data?.MasterBidangBisnis?.name}</TextCustom>
            }
          />

          <GridTwoView
            spanLeft={2}
            spanRight={10}
            leftItem={
              <Ionicons
                name="call-outline"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightItem={<TextCustom>{data?.tlpn}</TextCustom>}
          />
          <GridTwoView
            spanLeft={2}
            spanRight={10}
            leftItem={
              <Ionicons
                name="location-outline"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightItem={<TextCustom>{data?.alamatKantor}</TextCustom>}
          />

          <Spacing />
          <ButtonCustom
            onPress={() => {
              openInDeviceMaps({
                latitude: data?.BusinessMaps?.latitude,
                longitude: data?.BusinessMaps?.longitude,
                title: data?.BusinessMaps?.namePin,
              });
            }}
          >
            Buka Maps
          </ButtonCustom>
        </StackCustom>
      </DrawerCustom>
    </>
  );
}
