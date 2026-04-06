/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  Spacing,
  TextInputCustom,
  NewWrapper_V2,
} from "@/components";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { MapSelectedPlatform } from "@/components/Map/MapSelectedPlatform";
import MapSelectedV2 from "@/components/Map/MapSelectedV2";
import API_IMAGE from "@/constants/api-storage";
import DIRECTORY_ID from "@/constants/directory-id";
import { apiMapsGetOne, apiMapsUpdate } from "@/service/api-client/api-maps";
import { uploadFileService } from "@/service/upload-service";
import pickFile, { IFileData } from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { LatLng } from "react-native-maps";
import Toast from "react-native-toast-message";

const defaultRegion = {
  latitude: -8.737109,
  longitude: 115.1756897,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export function Maps_ScreenMapsEdit() {
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
    }, [id]),
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

  const handleLocationSelect = (location: LatLng | [number, number]) => {
    if (Array.isArray(location)) {
      // Android format: [longitude, latitude]
      setSelectedLocation({ latitude: location[1], longitude: location[0] });
    } else {
      // iOS format: LatLng
      setSelectedLocation(location);
    }
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

  const initialRegion =
    data?.latitude && data?.longitude
      ? {
          latitude: Number(data?.latitude),
          longitude: Number(data?.longitude),
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }
      : defaultRegion;

  return (
    <NewWrapper_V2
      enableKeyboardHandling
      keyboardScrollOffset={100}
      footerComponent={buttonFooter}
    >
      <InformationBox text="Tentukan lokasi pin map dengan menekan pada map." />

      {/* <MapSelectedPlatform
        initialRegion={initialRegion}
        selectedLocation={selectedLocation}
        onLocationSelect={handleLocationSelect}
        height={400}
      /> */}

      {!data || !data.latitude || !data.longitude ? (
        <CustomSkeleton height={200} />
      ) : (
        <MapSelectedV2
          selectedLocation={[data.longitude, data.latitude]}
          onLocationSelect={(location: [number, number]) => {
            setData({
              ...data,
              longitude: location[0],
              latitude: location[1],
            });
          }}
        />
      )}

      <View onStartShouldSetResponder={() => true}>
        <TextInputCustom
          required
          label="Nama Pin"
          placeholder="Masukkan nama pin maps"
          value={data?.namePin}
          onChangeText={(value) => setData({ ...data, namePin: value })}
        />
      </View>

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
    </NewWrapper_V2>
  );
}
