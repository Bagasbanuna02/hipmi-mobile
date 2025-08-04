import {
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { router } from "expo-router";

export default function DonationAddNews() {
  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Upload gambar bersifat opsional untuk melengkapi kabar terkait donasi Anda." />
        <LandscapeFrameUploaded />
        <ButtonCenteredOnly
          onPress={() => {
            router.push("/(application)/(image)/take-picture/123");
          }}
          icon="upload"
        >
          Upload
        </ButtonCenteredOnly>
        <Spacing />
        <TextInputCustom
          label="Judul Berita"
          placeholder="Masukan judul berita"
          required
        />
        <TextAreaCustom
          label="Deskripsi Berita"
          placeholder="Masukan deskripsi berita"
          required
          showCount
          maxLength={1000}
        />
        
        <Spacing />
        <ButtonCustom
          onPress={() => {
            router.back();
          }}
        >
          Simpan
        </ButtonCustom>
      </StackCustom>
      <Spacing />
    </ViewWrapper>
  );
}
