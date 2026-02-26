import { StyleSheet, View } from "react-native";

import { BaseBox, StackCustom, TextCustom } from "@/components";
import { MapsV2Custom } from "@/components/Map/MapsV2Custom";

export default function Portofolio_BusinessLocation({
  data,
  imageId,
  setOpenDrawerLocation,
}: {
  data: {
    id: string;
    imageId: string;
    latitude: number;
    longitude: number;
    namePin: string;
    pinId: string;
  } | null;

  imageId?: string;
  setOpenDrawerLocation: (value: boolean) => void;
}) {
  console.log("data", data);

  // Buat marker hanya jika data lengkap
  const markers =
    data?.latitude && data?.longitude
      ? [
          {
            id: data.id || "location-marker",
            coordinate: [data.longitude, data.latitude] as [number, number],
            imageId,
            onSelected: () => {
              setOpenDrawerLocation(true);
            },
          },
        ]
      : [];

  return (
    <>
      <BaseBox style={{ height: !data ? 200 : "auto" }}>
        <StackCustom>
          <TextCustom bold>Lokasi Bisnis</TextCustom>
          {!data ? (
            <TextCustom
              style={{ paddingTop: 50 }}
              align="center"
              color="gray"
              size={"small"}
              bold
            >
              Lokasi bisnis belum ditambahkan
            </TextCustom>
          ) : (
            <View style={styles.mapContainer}>
              <MapsV2Custom
                markers={markers}
                zoomLevel={15}
                showDefaultMarkers={true}
                markerSize={35}
                initialRegion={{
                  latitude: data?.latitude,
                  longitude: data?.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
              />
            </View>
          )}
        </StackCustom>
      </BaseBox>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
  },
});
