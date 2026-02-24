import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

// Cek versi >= 10.x gunakan ini
import {
  MapView,
  Camera,
  PointAnnotation,
  Images,
  ShapeSource,
  SymbolLayer,
} from "@maplibre/maplibre-react-native";
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
import { apiMapsGetAll } from "@/service/api-client/api-maps";
import { router, useFocusEffect } from "expo-router";
import { Image } from "expo-image";
import API_IMAGE from "@/constants/api-storage";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { openInDeviceMaps } from "@/utils/openInDeviceMaps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const defaultRegion = {
  latitude: -8.737109,
  longitude: 115.1756897,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
  height: 300,
};

export default function MapsView2() {
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
    }, []),
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

  // Data GeoJSON untuk marker
  const markerData: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [115.1756897, -8.737109],
        },
        properties: { id: "1", title: "Lokasi A" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [106.83, -6.18],
        },
        properties: { id: "2", title: "Lokasi B" },
      },
    ],
  };

  return (
    <>
      <View style={styles.container}>
        <MapView style={styles.map} mapStyle={MAP_STYLE}>
          <Camera
            zoomLevel={14}
            centerCoordinate={[defaultRegion.longitude, defaultRegion.latitude]}
          />

          <Images
            images={{
              customMarker: API_IMAGE.GET({
                fileId: "cmcvppftd00t7bpnnnma0hfei",
              }),
            }}
            onImageMissing={(imageKey) => console.log("Missing:", imageKey)}
          />
          <ShapeSource id="markers-source" shape={markerData}>
            <SymbolLayer
              id="markers-layer"
              style={{
                iconImage: "customMarker", // Nama alias dari Images
                iconSize: 0.05, // Skala ukuran
                iconAnchor: "bottom", // Titik anchor marker
                iconAllowOverlap: true, // Marker tidak saling menyembunyikan
              }}
            />
          </ShapeSource>
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
  marker: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "red",
  },
});
