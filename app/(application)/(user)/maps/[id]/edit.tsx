/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  Spacing,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import API_IMAGE from "@/constants/api-storage";
import DIRECTORY_ID from "@/constants/directory-id";
import { apiMapsGetOne, apiMapsUpdate } from "@/service/api-client/api-maps";
import { uploadFileService } from "@/service/upload-service";
import pickFile, { IFileData } from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import Toast from "react-native-toast-message";

const defaultRegion = {
  latitude: -8.737109,
  longitude: 115.1756897,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
export default function MapsEdit() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>({
    id: "",
    namePin: "",
    latitude: "",
    longitude: "",
    imageId: "",
  });
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [image, setImage] = useState<IFileData | null>(null);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiMapsGetOne({ id: id as string });

      if (response.success) {
        setData({
          id: response.data.id,
          namePin: response.data.namePin,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          imageId: response.data.imageId,
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const location = { latitude, longitude };
    setSelectedLocation(location);
  };

  const handleSubmit = async () => {
    let newData: any;
    if (!data.namePin) {
      Toast.show({
        type: "error",
        text1: "Nama pin harus diisi",
      });
      return;
    }

    newData = {
      namePin: data?.namePin,
      latitude: selectedLocation?.latitude || data?.latitude,
      longitude: selectedLocation?.longitude || data?.longitude,
    };

    try {
      setLoading(true);
      if (image) {
        const responseUpload = await uploadFileService({
          dirId: DIRECTORY_ID.map_image,
          imageUri: image?.uri,
        });

        if (!responseUpload?.data?.id) {
          Toast.show({
            type: "error",
            text1: "Gagal mengunggah gambar",
          });
          return;
        }

        const imageId = responseUpload?.data?.id;

        newData = {
          namePin: data?.namePin,
          latitude: selectedLocation?.latitude,
          longitude: selectedLocation?.longitude,
          newImageId: imageId,
        };
      }

      const responseUpdate = await apiMapsUpdate({
        id: data?.id,
        data: newData,
      });

      if (!responseUpdate.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mengupdate map",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Map berhasil diupdate",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        disabled={!data.namePin}
        onPress={handleSubmit}
        isLoading={isLoading}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <ViewWrapper footerComponent={buttonFooter}>
      <InformationBox text="Tentukan lokasi pin map dengan menekan pada map." />

      <View style={[styles.container, { height: 400 }]}>
        <MapView
          style={styles.map}
          initialRegion={
            data?.latitude && data?.longitude
              ? {
                  latitude: data?.latitude,
                  longitude: data?.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }
              : defaultRegion
          }
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          loadingIndicatorColor="#666"
          loadingBackgroundColor="#f0f0f0"
        >
          {selectedLocation ? (
            <Marker
              coordinate={selectedLocation}
              title="Lokasi Dipilih"
              description={`Lat: ${selectedLocation.latitude.toFixed(
                6
              )}, Lng: ${selectedLocation.longitude.toFixed(6)}`}
              pinColor="red"
            />
          ) : (
            <Marker
              coordinate={defaultRegion}
              title="Lokasi Dipilih"
              description={`Lat: ${defaultRegion.latitude.toFixed(
                6
              )}, Lng: ${defaultRegion.longitude.toFixed(6)}`}
              pinColor="red"
            />
          )}
        </MapView>
      </View>

      <TextInputCustom
        required
        label="Nama Pin"
        placeholder="Masukkan nama pin maps"
        value={data?.namePin}
        onChangeText={(value) => setData({ ...data, namePin: value })}
      />

      <Spacing />

      <InformationBox text="Upload foto lokasi bisnis anda untuk ditampilkan dalam detail maps." />
      <LandscapeFrameUploaded
        image={
          image
            ? image?.uri
            : API_IMAGE.GET({ fileId: data?.imageId as string })
        }
      />
      <ButtonCenteredOnly
        icon="upload"
        onPress={() => {
          pickFile({
            allowedType: "image",
            setImageUri(file) {
              setImage(file);
            },
          });
        }}
      >
        Upload
      </ButtonCenteredOnly>
      <Spacing height={50} />
    </ViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
    borderRadius: 8,
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
});
