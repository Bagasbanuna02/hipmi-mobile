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

export default function InvestmentAddNews() {
  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Pengunggahan foto ke aplikasi bersifat opsional dan tidak diwajibkan, Anda dapat menyimpan berita tanpa mengunggah foto." />
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
