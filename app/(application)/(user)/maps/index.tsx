import {
  ButtonCustom,
  DrawerCustom,
  DummyLandscapeImage,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import API_IMAGE from "@/constants/api-storage";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { apiMapsGetAll } from "@/service/api-client/api-maps";
import { openInDeviceMaps } from "@/utils/openInDeviceMaps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const defaultRegion = {
  latitude: -8.737109,
  longitude: 115.1756897,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
  height: 300,
};

export interface LocationItem {
  id: string | number;
  latitude: number;
  longitude: number;
  name: string;
  imageId?: string;
}

export default function Maps() {
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, setSelected] = useState({
    id: "",
    bidangBisnis: "",
    nomorTelepon: "",
    alamatBisnis: "",
    namePin: "",
    imageId: "",
    portofolioId: "",
    latitude: 0,
    longitude: 0,
  });

  useFocusEffect(
    useCallback(() => {
      handlerLoadList();
    }, [])
  );

  const handlerLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiMapsGetAll();

      if (response.success) {
        setList(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <>
      <ViewWrapper style={{ paddingInline: 0, paddingBlock: 0 }}>
        {/* <MapCustom height={"100%"} /> */}
        <View style={{ flex: 1 }}>
          {loadList ? (
            <MapView
              initialRegion={defaultRegion}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <MapView
              initialRegion={defaultRegion}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {list?.map((item: any, index: number) => {
                return (
                  <Marker
                    key={item?.id}
                    coordinate={{
                      latitude: item?.latitude,
                      longitude: item?.longitude,
                    }}
                    title={item?.namePin}
                    onPress={() => {
                      setOpenDrawer(true);
                      setSelected({
                        id: item?.id,
                        bidangBisnis:
                          item?.Portofolio?.MasterBidangBisnis?.name,
                        nomorTelepon: item?.Portofolio?.tlpn,
                        alamatBisnis: item?.Portofolio?.alamatKantor,
                        namePin: item?.namePin,
                        imageId: item?.imageId,
                        portofolioId: item?.Portofolio?.id,
                        latitude: item?.latitude,
                        longitude: item?.longitude,
                      });
                    }}
                    // Gunakan gambar kustom jika tersedia
                  >
                    <View style={{}}>
                      <Image
                        source={{
                          uri: API_IMAGE.GET({
                            fileId: item?.Portofolio?.logoId,
                          }),
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 100,
                          borderWidth: 1,
                        }}
                      />
                    </View>
                  </Marker>
                );
              })}
            </MapView>
          )}
        </View>
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <DummyLandscapeImage height={200} imageId={selected.imageId} />
        <Spacing />
        <StackCustom gap={"xs"}>
          <GridTwoView
            spanLeft={2}
            spanRight={10}
            leftIcon={
              <FontAwesome
                name="building-o"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightIcon={<TextCustom>{selected.namePin}</TextCustom>}
          />

          <GridTwoView
            spanLeft={2}
            spanRight={10}
            leftIcon={
              <Ionicons
                name="list-outline"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightIcon={<TextCustom>{selected.bidangBisnis}</TextCustom>}
          />

          <GridTwoView
            spanLeft={2}
            spanRight={10}
            leftIcon={
              <Ionicons
                name="call-outline"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightIcon={<TextCustom>{selected.nomorTelepon}</TextCustom>}
          />
          <GridTwoView
            spanLeft={2}
            spanRight={10}
            leftIcon={
              <Ionicons
                name="location-outline"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightIcon={<TextCustom>{selected.alamatBisnis}</TextCustom>}
          />

          <Grid>
            <Grid.Col span={6} style={{ paddingRight: 10 }}>
              <ButtonCustom
                onPress={() => {
                  setOpenDrawer(false);
                  router.push(`/portofolio/${selected.portofolioId}`);
                }}
              >
                Detail
              </ButtonCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ paddingLeft: 10 }}>
              <ButtonCustom
                onPress={() => {
                  openInDeviceMaps({
                    latitude: selected.latitude,
                    longitude: selected.longitude,
                    title: selected.namePin,
                  });
                }}
              >
                Buka Maps
              </ButtonCustom>
            </Grid.Col>
          </Grid>
        </StackCustom>
      </DrawerCustom>
    </>
  );
}
