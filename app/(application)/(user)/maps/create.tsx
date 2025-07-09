import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  Spacing,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { router, useLocalSearchParams } from "expo-router";

export default function MapsCreate() {
  const { id } = useLocalSearchParams();
  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          console.log("Simpan");
          router.replace(`/portofolio/${id}`);
        }}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <ViewWrapper footerComponent={buttonFooter}>
      <InformationBox text="Tentukan lokasi pin map dengan menekan pada map." />

      <BaseBox style={{ height: 400 }}>
        <TextCustom>Maps Her</TextCustom>
      </BaseBox>

      <TextInputCustom
        required
        label="Nama Pin"
        placeholder="Masukkan nama pin maps"
      />

      <Spacing height={50} />

      <InformationBox text="Upload foto lokasi bisnis anda untuk ditampilkan dalam detail maps." />
      <LandscapeFrameUploaded />
      <ButtonCenteredOnly
        icon="upload"
        onPress={() => {
          console.log("Upload foto ");
          router.navigate(`/take-picture/${id}`);
        }}
      >
        Upload
      </ButtonCenteredOnly>
      <Spacing height={50} />
    </ViewWrapper>
  );
}
