import {
  ButtonCustom,
  SelectCustom,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import DateTimePickerCustom from "@/components/DateInput/DateTimePickerCustom";
import { useAuth } from "@/hooks/use-auth";
import { masterTypeEvent } from "@/lib/dummy-data/event/master-type-event";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";

interface EventCreateProps {
  title?: string;
  lokasi?: string;
  deskripsi?: string;
  eventMaster_TipeAcaraId?: string;
  tanggal?: string;
  tanggalSelesai?: string;
  authorId?: string;
}

export default function EventCreate() {
  const [data, setData] = useState<EventCreateProps>();
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState<
    Date | DateTimePickerEvent | null
  >(null);

  const [selectedEndDate, setSelectedEndDate] = useState<
    Date | DateTimePickerEvent | null
  >(null);

  const handlerSubmit = () => {
    try {
      // if (selectedDate) {
      //   console.log("Tanggal yang dipilih:", selectedDate);
      //   console.log(`ISO Format ${Platform.OS}:`, selectedDate.toString());
      //   // Kirim ke API atau proses lanjutan
      // } else {
      //   console.log("Tanggal belum dipilih");
      // }

      // if (selectedEndDate) {
      //   console.log("Tanggal yang dipilih:", selectedEndDate);
      //   console.log(`ISO Format ${Platform.OS}:`, selectedEndDate.toString());
      //   // Kirim ke API atau proses lanjutan
      // } else {
      //   console.log("Tanggal berakhir belum dipilih");
      // }

      console.log("Data berhasil disimpan", JSON.stringify(data, null, 2));
      // router.navigate("/event/status");
    } catch (error) {
      console.log(error);
    }
  };

  const buttonSubmit = (
    <ButtonCustom title="Simpan" onPress={handlerSubmit} />
    // <BoxButtonOnFooter>
    // </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper>
        <StackCustom gap={"xs"}>
          <TextInputCustom
            placeholder="Masukkan nama event"
            label="Nama Event"
            required
            onChangeText={(value: any) => setData({ ...data, title: value })}
          />
          <SelectCustom
            label="Tipe Event"
            placeholder="Pilih tipe event"
            data={masterTypeEvent}
            onChange={(value: any) =>
              setData({ ...data, eventMaster_TipeAcaraId: value })
            }
          />
          <TextInputCustom
            label="Lokasi"
            placeholder="Masukkan lokasi event"
            required
            onChangeText={(value: any) => setData({ ...data, lokasi: value })}
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

          {buttonSubmit}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
