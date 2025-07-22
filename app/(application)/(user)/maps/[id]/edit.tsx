import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  MapCustom,
  Spacing,
  TextInputCustom,
  ViewWrapper
} from "@/components";
import { router, useLocalSearchParams } from "expo-router";

export default function MapsEdit() {
  const { id } = useLocalSearchParams();
  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          console.log(`Simpan maps ${id}`);
          router.back()
        }}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <ViewWrapper footerComponent={buttonFooter}>
      <InformationBox text="Tentukan lokasi pin map dengan menekan pada map." />

      <BaseBox>
        <MapCustom />
      </BaseBox>

      <TextInputCustom
        required
        label="Nama Pin"
        placeholder="Masukkan nama pin maps"
      />

      <Spacing />

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
