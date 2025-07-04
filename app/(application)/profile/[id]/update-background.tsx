/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseBox, ButtonCustom } from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonUpload from "@/components/Button/ButtonUpload";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

export default function UpdateBackgroundProfile() {
  const { id } = useLocalSearchParams();
  return (
    <ViewWrapper
      bottomBarComponent={
        <ButtonCustom
          onPress={() => {
            console.log("Simpan foto");
            router.back();
          }}
        >
          Simpan
        </ButtonCustom>
      }
    >
      <BaseBox
        style={{ alignItems: "center", justifyContent: "center", height: 250 }}
      >
        <Image
          source={DUMMY_IMAGE.background}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </BaseBox>

      <ButtonUpload
        onPress={() =>
          router.navigate("/(application)/profile/[id]/take-picture")
        }
      />
    </ViewWrapper>
  );
}
