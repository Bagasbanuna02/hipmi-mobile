import {
    ButtonCustom,
    SelectCustom,
    StackCustom,
    TextAreaCustom,
    TextInputCustom,
    ViewWrapper
} from "@/components";
import { router } from "expo-router";

export default function CollaborationCreate() {
  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <TextInputCustom label="Judul" placeholder="Masukan judul" required />
        <TextInputCustom label="Lokasi" placeholder="Masukan lokasi" required />
        <SelectCustom
          label="Pilih Industri"
          data={[
            { label: "Industri 1", value: "industri-1" },
            { label: "Industri 2", value: "industri-2" },
            { label: "Industri 3", value: "industri-3" },
          ]}
          onChange={(value) => console.log(value)}
        />

        <TextAreaCustom
          required
          label="Tujuan Proyek"
          placeholder="Masukan tujuan proyek"
          showCount
          maxLength={1000}
        />

        <TextAreaCustom
          required
          label="Keuntungan Proyek"
          placeholder="Masukan keuntungan proyek"
          showCount
          maxLength={1000}
        />

        <ButtonCustom
          title="Simpan"
          onPress={() => {
            console.log("Simpan proyek");
            router.back();
          }}
        />
      </StackCustom>
    </ViewWrapper>
  );
}
