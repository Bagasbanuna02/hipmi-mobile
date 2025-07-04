import { BaseBox, ButtonCustom } from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonUpload from "@/components/Button/ButtonUpload";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

export default function UpdatePhotoProfile() {
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
          source={DUMMY_IMAGE.avatar}
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
      </BaseBox>

      <ButtonUpload
        onPress={() => {
          console.log("ID >>", id);
          router.navigate("/(application)/profile/[id]/take-picture");
        }}
      />
    </ViewWrapper>
  );
}
