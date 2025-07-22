import {
  AvatarCustom,
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { router, useLocalSearchParams } from "expo-router";

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
        <AvatarCustom size="xl" />
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
