import {
  BoxButtonOnFooter,
  ButtonCustom,
  InformationBox,
  BaseBox,
  Spacing,
  TextInputCustom,
  LandscapeFrameUploaded,
  ButtonCenteredOnly,
  OS_Wrapper,
} from "@/components";
import { MapSelectedPlatform } from "@/components/Map/MapSelectedPlatform";
import DIRECTORY_ID from "@/constants/directory-id";
import { useAuth } from "@/hooks/use-auth";
import { apiMapsCreate } from "@/service/api-client/api-maps";
import { uploadFileService } from "@/service/upload-service";
import { IFileData } from "@/utils/pickFile";
import pickFile from "@/utils/pickFile";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { LatLng } from "react-native-maps";
import Toast from "react-native-toast-message";

/**
 * Screen untuk create maps
 *
 * Fitur:
 * - Pilih lokasi dari map
 * - Input nama pin
 * - Upload foto lokasi
 * - Submit data maps
 */
export function Maps_ScreenMapsCreate() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();

  // State management
  // Format: LatLng { latitude, longitude } untuk konsistensi
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<IFileData | null>(null);
  const [isLoading, setLoading] = useState(false);

  /**
   * Handle submit form
   * Upload image (jika ada) dan submit data maps ke API
   */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Prepare data tanpa image dulu
      let newData: any = {
        authorId: user?.id,
        portofolioId: id,
        namePin: name,
        latitude: selectedLocation?.latitude,
        longitude: selectedLocation?.longitude,
      };

      // Upload image jika ada
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

      // Submit ke API
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

  /**
   * Handle image upload
   */
  const handleImageUpload = async () => {
    try {
      await pickFile({
        allowedType: "image",
        setImageUri: (file) => {
          setImage(file);
        },
      });
    } catch (error) {
      console.log("[MapsCreate] Image upload error:", error);
    }
  };

  /**
   * Footer component dengan button submit
   */
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

  /**
   * Render screen dengan OS_Wrapper
   */
  return (
    <OS_Wrapper
      enableKeyboardHandling
      contentPaddingBottom={250}
      footerComponent={buttonFooter}
    >
      <InformationBox text="Tentukan lokasi pin map dengan menekan pada map." />

      <BaseBox>
        <MapSelectedPlatform
          selectedLocation={selectedLocation}
          onLocationSelect={(location) => {
            setSelectedLocation(location as LatLng);
          }}
          height={300}
          showUserLocation={true}
          showsMyLocationButton={true}
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

      <ButtonCenteredOnly icon="upload" onPress={handleImageUpload}>
        Upload
      </ButtonCenteredOnly>

      <Spacing height={50} />
    </OS_Wrapper>
  );
}

export default Maps_ScreenMapsCreate;
