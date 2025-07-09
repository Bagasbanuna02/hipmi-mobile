import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

export default function UpdatePhotoProfile() {
  const { id } = useLocalSearchParams();
  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          console.log("Simpan foto profile >>", id);
          router.back();
        }}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <ViewWrapper footerComponent={buttonFooter}>
      <BaseBox
        style={{ alignItems: "center", justifyContent: "center", height: 250 }}
      >
        <Image
          source={DUMMY_IMAGE.avatar}
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
      </BaseBox>

      <ButtonCenteredOnly
        icon="upload"
        onPress={() => {
          console.log("Update photo >>", id);
          router.navigate(`/(application)/take-picture/${id}`);
        }}
      >
        Update
      </ButtonCenteredOnly>

      {/* <Spacing />
      <ButtonCustom>Test</ButtonCustom> */}
    </ViewWrapper>
  );
}
