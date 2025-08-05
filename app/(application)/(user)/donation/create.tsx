import {
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  SelectCustom,
  Spacing,
  StackCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { dummyDonasiDurasi } from "@/lib/dummy-data/donasi/durasi";
import { dummyDonasiKategori } from "@/lib/dummy-data/donasi/kategori";
import { router } from "expo-router";

export default function DonationCreate() {
  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Lengkapi semua data di bawah untuk selanjutnya mengisi cerita penggalangan dana." />

        <TextInputCustom
          label="Judul Donasi"
          placeholder="Masukkan Judul Donasi"
          required
        />
        <TextInputCustom
          label="Target Donasi"
          placeholder="Masukkan Target Donasi"
          required
          keyboardType="numeric"
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
        <Spacing />

        <SelectCustom
          data={dummyDonasiKategori.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          onChange={(value) => console.log(value)}
          label="Pilih Kategori Donasi"
          placeholder="Pilih Kategori Donasi"
          required
        />

        <SelectCustom
          data={dummyDonasiDurasi.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          onChange={(value) => console.log(value)}
          label="Pilih Durasi Donasi"
          placeholder="Pilih Durasi Donasi"
          required
        />
        <Spacing />
        <ButtonCustom
          onPress={() => {
            router.replace("/donation/create-story");
          }}
        >
          Selanjutnya
        </ButtonCustom>
        <Spacing />
      </StackCustom>
      <Spacing />
    </ViewWrapper>
  );
}
