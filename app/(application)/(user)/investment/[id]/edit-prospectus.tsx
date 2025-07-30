import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  CenterCustom,
  InformationBox,
  Spacing,
  StackCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

export default function InvestmentEditProspectus() {
  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom onPress={() => router.back()}>Update</ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <ViewWrapper footerComponent={buttonFooter}>
      <StackCustom gap={"xs"}>
        <InformationBox text="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepan." />
        <Spacing />

        <BaseBox>
          <CenterCustom>
            <FontAwesome5
              name="file-pdf"
              size={30}
              color={MainColor.disabled}
            />
          </CenterCustom>
        </BaseBox>
        <ButtonCenteredOnly
          icon="upload"
          onPress={() => router.push("/(application)/(image)/take-picture/123")}
        >
          Upload
        </ButtonCenteredOnly>
      </StackCustom>
    </ViewWrapper>
  );
}
