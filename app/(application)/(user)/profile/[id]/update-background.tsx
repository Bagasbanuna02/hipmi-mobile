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

export default function UpdateBackgroundProfile() {
  const { id } = useLocalSearchParams();
  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          console.log("Simpan foto background >>", id);
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
          source={DUMMY_IMAGE.background}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </BaseBox>

      <ButtonCenteredOnly
        icon="upload"
        onPress={() => router.navigate(`/(application)/take-picture/${id}`)}
      >
        Update
      </ButtonCenteredOnly>
    </ViewWrapper>
  );
}
