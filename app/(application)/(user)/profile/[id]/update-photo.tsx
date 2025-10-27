import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DIRECTORY_ID from "@/constants/directory-id";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { useAuth } from "@/hooks/use-auth";
import { apiFileDelete } from "@/service/api-client/api-file";
import { apiProfile, apiUpdateProfile } from "@/service/api-client/api-profile";
import { uploadFileService } from "@/service/upload-service";
import { IProfile } from "@/types/Type-Profile";
import pickImage from "@/utils/pickImage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";

export default function UpdatePhotoProfile() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<IProfile>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
    }, [id])
  );

  async function onLoadData(id: string) {
    try {
      const response = await apiProfile({ id });

      setData(response.data);
    } catch (error) {
      console.log("error get profile >>", error);
    }
  }

  async function onUpload() {
    try {
      setIsLoading(true);

      const response = await uploadFileService({
        imageUri,
        dirId: DIRECTORY_ID.profile_foto,
      });

      if (response.success) {
        const fileId = response.data.id;
        const responseUpdate = await apiUpdateProfile({
          id: id as string,
          data: { fileId },
          category: "photo",
        });

        if (!responseUpdate.success) {
          Toast.show({
            type: "error",
            text1: "Info",
            text2: responseUpdate.message,
          });
          return;
        }

        if (data?.imageId) {
          const deletePrevFile = await apiFileDelete({
            token: token as string,
            id: data?.imageId as string,
          });

          if (!deletePrevFile.success) {
            console.log("error delete prev file >>", deletePrevFile.message);
          }
        }

        Toast.show({
          type: "success",
          text1: "Sukses",
          text2: "Photo berhasil diupdate",
        });

        router.back();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error as string,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoading}
        onPress={() => {
          onUpload();
        }}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  const image = imageUri ? (
    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
  ) : (
    <Image
      source={
        data?.imageId
          ? { uri: API_STRORAGE.GET({ fileId: data.imageId }) }
          : DUMMY_IMAGE.avatar
      }
      style={{ width: 200, height: 200 }}
    />
  );

  return (
    <ViewWrapper footerComponent={buttonFooter}>
      <BaseBox
        style={{ alignItems: "center", justifyContent: "center", height: 250 }}
      >
        {image}
      </BaseBox>

      {/* Upload Image */}
      <ButtonCenteredOnly
        icon="upload"
        onPress={() => {
          pickImage({
            setImageUri,
          });
        }}
      >
        Upload
      </ButtonCenteredOnly>
    </ViewWrapper>
  );
}
