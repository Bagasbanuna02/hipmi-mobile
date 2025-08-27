import {
  AvatarCustom,
  BoxButtonOnFooter,
  ButtonCustom,
  StackCustom,
  ViewWrapper,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { uploadImageService } from "@/service/upload-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import ButtonUpload from "./button-upload";

export default function ScreenUpload() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onUpload() {
    setIsLoading(true);
    try {
      const response = await uploadImageService({
        imageUri,
        dirId: DIRECTORY_ID.profile_foto,
      });

      if (response.success) {
        await AsyncStorage.setItem("idImage", response.data.id);
        router.back();
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function buttonUpload() {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom isLoading={isLoading} onPress={() => onUpload()}>
            Simpan
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  }

  return (
    <>
      <ViewWrapper footerComponent={buttonUpload()}>
        <StackCustom>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AvatarCustom
              source={imageUri ? { uri: imageUri } : DUMMY_IMAGE.avatar}
              size="xl"
            />
          </View>

          <ButtonUpload setImageUri={setImageUri} />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
