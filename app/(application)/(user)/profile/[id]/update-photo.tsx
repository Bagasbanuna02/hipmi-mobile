import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DIRECTORY_ID from "@/constants/directory-id";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { apiProfile, apiUpdateProfile } from "@/service/api-client/api-profile";
import { uploadImageService } from "@/service/upload-service";
import { IProfile } from "@/types/Type-Profile";
import pickImage from "@/utils/pickImage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Image } from "react-native";

export default function UpdatePhotoProfile() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<IProfile>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
    }, [id])
  );

  async function onLoadData(id: string) {
    try {
      const response = await apiProfile({ id });
      console.log(
        "response image id >>",
        JSON.stringify(response.data.imageId, null, 2)
      );
      setData(response.data);
    } catch (error) {
      console.log("error get profile >>", error);
    }
  }

  async function onUpload() {
    try {
      setIsLoading(true);

      const response = await uploadImageService({
        imageUri,
        dirId: DIRECTORY_ID.profile_foto,
      });

      console.log("Upload res >>", JSON.stringify(response, null, 2));
      if (response.success) {
        const imageId = response.data.id;
        await apiUpdateProfile({
          id: id as string,
          data: { imageId },
          category: "photo",
        });
        router.back();
      }
    } catch (error) {
      console.log("error upload >>", error);
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
          // console.log("Simpan foto profile >>", id);
          // router.back();
        }}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  const image = imageUri ? (
    <Image source={{ uri: imageUri }} style={{ width: "100%", height: "100%" }} />
  ) : (
    <Image
      source={
        data?.imageId
          ? { uri: API_STRORAGE.GET({ fileId: data.imageId }) }
          : DUMMY_IMAGE.avatar
      }
      style={{ width: "100%", height: "100%" }}
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
