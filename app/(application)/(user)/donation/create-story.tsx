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

export default function DonationCreateStory() {
  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Cerita Anda adalah kunci untuk menginspirasi kebaikan. Jelaskan dengan jujur dan jelas tujuan penggalangan dana ini agar calon donatur memahami dampak positif yang dapat mereka wujudkan melalui kontribusi mereka." />
        <TextAreaCustom
          label="Pembukaan Cerita"
          placeholder="Masukkan pembukaan cerita"
          required
          showCount
          maxLength={1000}
        />
        <TextAreaCustom
          label="Tujuan Donasi"
          placeholder="Masukkan tujuan donasi"
          required
          showCount
          maxLength={1000}
        />

        <LandscapeFrameUploaded />
        <ButtonCenteredOnly
          onPress={() => {
            router.push("/(application)/(image)/take-picture/123");
          }}
          icon="upload"
        >
          Upload
        </ButtonCenteredOnly>

        <Spacing height={40} />
        <InformationBox text="Pastikan Anda mengisi nama bank dan nomor rekening dengan benar. Informasi ini akan membantu admin memverifikasi dan memproses penggalangan dana Anda dengan cepat dan tepat setelah penggalangan dana dipublikasikan." />
        <TextInputCustom
          label="Nama Bank"
          placeholder="Masukkan nama bank"
          required
        />
        <TextInputCustom
          label="Nomor Rekening"
          placeholder="Masukkan nomor rekening"
          required
        />

        <Spacing />
        <ButtonCustom
          onPress={() => {
            router.replace(`/donation/(tabs)/status`);
          }}
        >
          Simpan
        </ButtonCustom>
      </StackCustom>
      <Spacing />
    </ViewWrapper>
  );
}
