import {
    BoxButtonOnFooter,
    ButtonCustom,
    SelectCustom,
    StackCustom,
    TextAreaCustom,
    TextInputCustom,
    ViewWrapper,
} from "@/components";
import DateTimePickerCustom from "@/components/DateInput/DateTimePickerCustom";
import { masterTypeEvent } from "@/lib/dummy-data/event/master-type-event";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform } from "react-native";

export default function EventCreate() {
  const [selectedDate, setSelectedDate] = useState<
    Date | DateTimePickerEvent | null
  >(null);

  const [selectedEndDate, setSelectedEndDate] = useState<
    Date | DateTimePickerEvent | null
  >(null);

  const handlerSubmit = () => {
    if (selectedDate) {
      console.log("Tanggal yang dipilih:", selectedDate);
      console.log(`ISO Format ${Platform.OS}:`, selectedDate.toString());
      // Kirim ke API atau proses lanjutan
    } else {
      console.warn("Tanggal belum dipilih");
    }

    if (selectedEndDate) {
      console.log("Tanggal yang dipilih:", selectedEndDate);
      console.log(`ISO Format ${Platform.OS}:`, selectedEndDate.toString());
      // Kirim ke API atau proses lanjutan
    } else {
      console.warn("Tanggal belum dipilih");
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom title="Simpan" onPress={handlerSubmit} />
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper footerComponent={buttonSubmit}>
        <StackCustom gap={"xs"}>
          <TextInputCustom
            placeholder="Masukkan nama event"
            label="Nama Event"
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

          <DateTimePickerCustom
            label="Tanggal & Waktu Mulai"
            required
            onChange={(date: Date) => {
              setSelectedDate(date as any);
            }}
            value={selectedDate as any}
            minimumDate={new Date(Date.now())}
          />

          <DateTimePickerCustom
            label="Tanggal & Waktu Berakhir"
            required
            onChange={(date: Date) => {
              setSelectedEndDate(date as any);
            }}
            value={selectedEndDate as any}
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
