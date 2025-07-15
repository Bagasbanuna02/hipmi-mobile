import {
    BoxButtonOnFooter,
    ButtonCustom,
    SelectCustom,
    StackCustom,
    TextAreaCustom,
    TextInputCustom,
    ViewWrapper
} from "@/components";
import { masterTypeEvent } from "@/lib/dummy-data/event/master-type-event";

export default function EventCreate() {
  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom title="Simpan" onPress={() => console.log("Simpan")} />
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={buttonSubmit}>
        <StackCustom gap={"xs"}>
          <TextInputCustom
            label="Nama Event"
            placeholder="Masukkan nama event"
            required
          />
          <SelectCustom
            label="Tipe Event"
            placeholder="Pilih tipe event"
            data={masterTypeEvent}
            onChange={(value) => console.log(value)}
          />
          <TextInputCustom
            label="Lokasi"
            placeholder="Masukkan lokasi event"
            required
          />

          <TextAreaCustom
            label="Deskripsi"
            placeholder="Masukkan deskripsi event"
            required
            showCount
            maxLength={100}
          />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
