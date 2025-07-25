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

export default function JobCreate() {
  const buttonSubmit = () => {
    return (
      <>
        <ButtonCustom
          onPress={() =>
            router.replace("/(application)/(user)/job/(tabs)/status")
          }
        >
          Simpan
        </ButtonCustom>
        <Spacing />
      </>
    );
  };

  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Poster atau gambar lowongan kerja bersifat opsional, tidak wajib untuk dimasukkan dan upload lah gambar yang sesuai dengan deskripsi lowongan kerja." />

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
          label="Judul Lowongan"
          placeholder="Masukan Judul Lowongan Kerja"
          required
        />

        <TextAreaCustom
          label="Syarat & Kualifikasi"
          placeholder="Masukan Syarat & Kualifikasi Lowongan Kerja"
          required
          showCount
          maxLength={1000}
        />

        <TextAreaCustom
          label="Deskripsi Lowongan"
          placeholder="Masukan Deskripsi Lowongan Kerja"
          required
          showCount
          maxLength={1000}
        />

        {buttonSubmit()}
      </StackCustom>
    </ViewWrapper>
  );
}
