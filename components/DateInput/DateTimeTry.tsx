import React, { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

type Props = {
  value?: Date;
  mode?: "date" | "time" | "datetime";
  onChange: (date: Date) => void;
};

const DateTimePickerTry: React.FC<Props> = ({
  value = new Date(),
  mode = "date",
  onChange,
}) => {
  const [show, setShow] = useState(false);

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const handleConfirm = (event: Event, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate !== undefined) {
      onChange(selectedDate);
    }
    setShow(false);
  };

  return (
    <>
      <Pressable onPress={toggleDatePicker} style={styles.button}>
        <Text style={styles.buttonText}>
          {value ? value.toLocaleDateString() : "Pilih tanggal"}
        </Text>
      </Pressable>

      {show && (
        <DateTimePicker
        //   style={styles.button}
          textColor="white"
          testID="dateTimePicker"
          value={value}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={handleConfirm as any}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DateTimePickerTry;
