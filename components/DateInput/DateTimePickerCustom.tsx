/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { GStyles } from "@/styles/global-styles";
import { TEXT_SIZE_MEDIUM } from "@/constants/constans-value";
import { MainColor } from "@/constants/color-palet";
import Grid from "../Grid/GridCustom";
import TextCustom from "../Text/TextCustom";

type Props = {
  dateValue?: Date;
  timeValue?: Date;
  onChangeDate: (date: Date) => void;
  onChangeTime: (time: Date) => void;
};

const DateTimePickerCustom: React.FC<Props> = ({
  dateValue,
  timeValue,
  onChangeDate,
  onChangeTime,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const toggleDatePicker = () => {
    setShowDate(!showDate);
  };

  const toggleTimePicker = () => {
    setShowTime(!showTime);
  };

  const handleConfirmDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (event.type === "set" && selectedDate !== undefined) {
      onChangeDate(selectedDate);
    }
    setShowDate(false);
  };

  const handleConfirmTime = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    if (event.type === "set" && selectedTime !== undefined) {
      onChangeTime(selectedTime);
    }
    setShowTime(false);
  };

  return (
    <>
      {/* <Pressable onPress={toggleDatePicker} style={[GStyles.inputContainerInput, {borderRadius: 8} ]}>
        <Text style={styles.buttonText}>
          {value ? value.toLocaleDateString() : "Pilih tanggal"}
        </Text>
      </Pressable> */}

      <View
        style={{
          paddingBlock: 6,
          paddingInline: 12,
          borderRadius: 8,
          backgroundColor: MainColor.white,
        }}
      >
        <Grid
          containerStyle={{
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid.Col span={6} style={{}}>
            <Pressable onPress={toggleDatePicker}>
              <Text style={styles.buttonText}>
                {dateValue ? dateValue.toLocaleDateString() : "Pilih tanggal"}
              </Text>
            </Pressable>
          </Grid.Col>
          <Grid.Col span={1} style={{ alignItems: "center" }}>
            <TextCustom>|</TextCustom>
          </Grid.Col>

          <Grid.Col span={5} style={{}}>
            <Pressable onPress={toggleTimePicker}>
              <Text style={styles.buttonText}>
                {timeValue ? timeValue.toLocaleTimeString("id-ID", { minute: "2-digit", hour: "2-digit" }) : "Pilih waktu"}
              </Text>
            </Pressable>
          </Grid.Col>
        </Grid>
      </View>

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateValue || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleConfirmDate}
        />
      )}

      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={timeValue || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleConfirmTime}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: MainColor.black,
    fontSize: TEXT_SIZE_MEDIUM,
    // fontWeight: "bold",
  },
});

export default DateTimePickerCustom;
