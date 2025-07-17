/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BoxButtonOnFooter,
  ButtonCustom,
  SelectCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import DateTimeInput from "@/components/DateInput/DateTimeIOS";
import DateTimePickerCustom from "@/components/DateInput/DateTimePickerCustom";
import { masterTypeEvent } from "@/lib/dummy-data/event/master-type-event";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";

export default function EventCreate() {
  const [selectedDateIOS, setSelectedDateIOS] = useState<DateTimePickerEvent>();
  const [selectDateAndroid, setSelectDateAndroid] = useState<Date>(new Date());
  const [selectedTimeAndroid, setSelectedTimeAndroid] = useState<Date>(
    new Date()
  );

  const handlerSubmit = () => {
    console.log("Simpan");
    const combined = new Date(selectDateAndroid);
    combined.setHours(selectedTimeAndroid.getHours());
    combined.setMinutes(selectedTimeAndroid.getMinutes());
    combined.setSeconds(selectedTimeAndroid.getSeconds());
    combined.setMilliseconds(selectedTimeAndroid.getMilliseconds());

    const newDate = Platform.OS === "ios" ? selectedDateIOS : combined;
    console.log(`newDate ${Platform.OS} > `, newDate);
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom title="Simpan" onPress={handlerSubmit} />
    </BoxButtonOnFooter>
  );

  const time = () => {
    return (
      <>
        {Platform.OS === "ios" ? (
          <DateTimeInput
            label="Tanggal Event"
            value={selectedDateIOS}
            onChange={(date: DateTimePickerEvent) => {
              setSelectedDateIOS(date);
            }}
            required
          />
        ) : (
          <DateTimePickerCustom
            dateValue={selectDateAndroid}
            timeValue={selectedTimeAndroid}
            onChangeDate={(date: Date) => {
              setSelectDateAndroid(date);
            }}
            onChangeTime={(time: Date) => {
              setSelectedTimeAndroid(time);
            }}
          />
        )}
      </>
    );
  };

  return (
    <>
      <ViewWrapper footerComponent={buttonSubmit}>
        <TextCustom>Test Datetime</TextCustom>

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

          {time()}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // padding: 20,
  },
});
