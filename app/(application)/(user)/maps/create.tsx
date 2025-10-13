import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  Spacing,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import MapSelected from "@/components/Map/MapSelected";
import DIRECTORY_ID from "@/constants/directory-id";
import { useAuth } from "@/hooks/use-auth";
import { apiMapsCreate } from "@/service/api-client/api-maps";
import { uploadFileService } from "@/service/upload-service";
import pickFile, { IFileData } from "@/utils/pickFile";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { LatLng } from "react-native-maps";
import Toast from "react-native-toast-message";

export default function MapsCreate() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<IFileData | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let newData: any;
      newData = {
        authorId: user?.id,
        portofolioId: id,
        namePin: name,
        latitude: selectedLocation?.latitude,
        longitude: selectedLocation?.longitude,
      };

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
          authorId: user?.id,
          portofolioId: id,
          namePin: name,
          latitude: selectedLocation?.latitude,
          longitude: selectedLocation?.longitude,
          imageId: imageId,
        };
      }

      const response = await apiMapsCreate({
        data: newData,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal menambahkan map",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Map berhasil ditambahkan",
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
        isLoading={isLoading}
        disabled={!selectedLocation || name === ""}
        onPress={handleSubmit}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <ViewWrapper footerComponent={buttonFooter}>
      <InformationBox text="Tentukan lokasi pin map dengan menekan pada map." />

      <BaseBox>
        <MapSelected
          selectedLocation={selectedLocation as any}
          setSelectedLocation={setSelectedLocation}
        />
      </BaseBox>

      <TextInputCustom
        required
        label="Nama Pin"
        placeholder="Masukkan nama pin maps"
        value={name}
        onChangeText={setName}
      />

      <Spacing height={50} />

      <InformationBox text="Upload foto lokasi bisnis anda untuk ditampilkan dalam detail maps." />
      <LandscapeFrameUploaded image={image?.uri} />
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
