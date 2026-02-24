import { useCallback, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

// Cek versi >= 10.x gunakan ini
import API_IMAGE from "@/constants/api-storage";
import { MainColor } from "@/constants/color-palet";
import { apiMapsGetAll } from "@/service/api-client/api-maps";
import {
  Camera,
  MapView,
  PointAnnotation,
} from "@maplibre/maplibre-react-native";
import { router, useFocusEffect } from "expo-router";
import {
  DrawerCustom,
  DummyLandscapeImage,
  Spacing,
  StackCustom,
  TextCustom,
  Grid,
  ButtonCustom,
} from "@/components";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { openInDeviceMaps } from "@/utils/openInDeviceMaps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

interface TypeMaps {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  namePin: string;
  latitude: number;
  longitude: number;
  authorId: string;
  portofolioId: string;
  imageId: string;
  pinId: string | null;
  Portofolio: {
    id: string;
    namaBisnis: string;
    logoId: string;
    alamatKantor: string;
    tlpn: string;
    MasterBidangBisnis: {
      id: string;
      name: string;
    };
  };
}

const defaultRegion = {
  latitude: -8.737109,
  longitude: 115.1756897,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
  height: 300,
};

export default function MapsView2() {
  const [list, setList] = useState<TypeMaps[] | null>(null);
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
    }, []),
  );

  const handlerLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiMapsGetAll();

      if (response.success) {
        // console.log("[RESPONSE]", JSON.stringify(response.data, null, 2));
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
      <View style={styles.container}>
        <MapView style={styles.map} mapStyle={MAP_STYLE}>
          <Camera
            zoomLevel={12}
            centerCoordinate={[defaultRegion.longitude, defaultRegion.latitude]}
          />

          {list?.map((item: TypeMaps) => {
            const imageUrl = API_IMAGE.GET({ fileId: item.Portofolio.logoId });

            return (
              <PointAnnotation
                key={item.id}
                id={item.id}
                coordinate={[item.longitude, item.latitude] as [number, number]}
                onSelected={() => {
                  setOpenDrawer(true);
                  setSelected({
                    id: item?.id,
                    bidangBisnis: item?.Portofolio?.MasterBidangBisnis?.name,
                    nomorTelepon: item?.Portofolio?.tlpn,
                    alamatBisnis: item?.Portofolio?.alamatKantor,
                    namePin: item?.namePin,
                    imageId: item?.imageId,
                    portofolioId: item?.Portofolio?.id,
                    latitude: item?.latitude,
                    longitude: item?.longitude,
                  });
                }}
              >
                <View style={styles.markerContainer}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.markerImage}
                    resizeMode="cover"
                    onError={(e: any) =>
                      console.log("Image error:", e.nativeEvent.error)
                    } // Tangkap error image
                  />
                </View>
              </PointAnnotation>
            );
          })}
        </MapView>
      </View>

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
            leftItem={
              <FontAwesome
                name="building-o"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            }
            rightItem={<TextCustom>{selected.namePin}</TextCustom>}
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
            rightItem={<TextCustom>{selected.bidangBisnis}</TextCustom>}
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
            rightItem={<TextCustom>{selected.nomorTelepon}</TextCustom>}
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
            rightItem={<TextCustom>{selected.alamatBisnis}</TextCustom>}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  markerContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    overflow: "hidden", // Wajib agar borderRadius terapply pada Image
    borderWidth: 1,
    borderColor: MainColor.darkblue, // Opsional, biar lebih cantik
    elevation: 4, // Shadow Android
    shadowColor: "#000", // Shadow iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  markerImage: {
    width: "100%",
    height: "100%",
  },
});
