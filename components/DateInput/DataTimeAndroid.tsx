
// DateTimeInput.tsx
import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useCallback, useState } from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import Grid from "../Grid/GridCustom";
import TextCustom from "../Text/TextCustom";

interface DateTimeInputProps {
  // Main
  value?: DateTimePickerEvent;
  mode?: "date" | "time";
  onChange: (selectedDate: DateTimePickerEvent) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  // Main
  label?: string;
  required?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  externalError?: string;
  internalError?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const DateTimeInput_Android: React.FC<DateTimeInputProps> = ({
  // Main
  value,
  mode,
  onChange,
  maximumDate,
  minimumDate,
  // Main
  label,
  required,
  disabled,
  iconLeft,
  style,
  borderRadius = 8,
  externalError,
  internalError,
  containerStyle,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value as any);
  const [selectedTime, setSelectedTime] = useState<Date>(value as any);

  // Fungsi untuk menggabungkan tanggal dan waktu
  const combineDateAndTime = useCallback((date: Date, time: Date): Date => {
    const combined = new Date(date);
    combined.setHours(
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds()
    );
    return combined;
  }, []);

  // Handler untuk tanggal
  const handleConfirmDate = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set" && date) {
      setSelectedDate(date);
      if (selectedTime) {
        const combined = combineDateAndTime(date, selectedTime);
        onChange?.(combined as any);
      }
    }
    setShowDate(false);
  };

  // Handler untuk waktu
  const handleConfirmTime = (event: DateTimePickerEvent, time?: Date) => {
    if (event.type === "set" && time) {
      setSelectedTime(time);
      if (selectedDate) {
        const combined = combineDateAndTime(selectedDate, time);
        onChange?.(combined as any);
      }
    }
    setShowTime(false);
  };

  const toggleDatePicker = () => {
    setShowDate(!showDate);
  };

  const toggleTimePicker = () => {
    setShowTime(!showTime);
  };

  return (
    <>
      <View style={[GStyles.inputContainerArea, containerStyle]}>
        {label && (
          <Text style={GStyles.inputLabel}>
            {label}
            {required && <Text style={GStyles.inputRequired}> *</Text>}
          </Text>
        )}
        <View
          style={[
            style,
            { borderRadius },
            externalError || internalError ? GStyles.inputErrorBorder : null,
            GStyles.inputContainerInput,
            disabled && GStyles.disabledBox,
          ]}
        >
          <View style={GStyles.inputIcon}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={disabled ? MainColor.white_gray : MainColor.placeholder}
            />
          </View>

          <Grid
            containerStyle={{
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid.Col span={6} style={{}}>
              <Pressable onPress={() => !disabled && toggleDatePicker()}>
                <TextCustom color={disabled ? "default" : "gray"}>
                  {selectedDate ? (
                    <TextCustom color="black">
                      {selectedDate.toLocaleDateString()}
                    </TextCustom>
                  ) : (
                    "Pilih tanggal"
                  )}
                </TextCustom>
              </Pressable>
            </Grid.Col>
            <Grid.Col span={1} style={{ alignItems: "center" }}>
              <TextCustom color="gray">|</TextCustom>
            </Grid.Col>

            <Grid.Col span={5} style={{}}>
              <Pressable onPress={() => !disabled && toggleTimePicker()}>
                <TextCustom color={disabled ? "default" : "gray"}>
                  {selectedTime ? (
                    <TextCustom color="black">
                      {selectedTime.toLocaleTimeString("id-ID", {
                        minute: "2-digit",
                        hour: "2-digit",
                      })}
                    </TextCustom>
                  ) : (
                    "Pilih waktu"
                  )}
                </TextCustom>
              </Pressable>
            </Grid.Col>
          </Grid>
        </View>
        {externalError ||
          (internalError && (
            <Text style={GStyles.inputErrorMessage}>
              {externalError || internalError}
            </Text>
          ))}
      </View>

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleConfirmDate}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedTime || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleConfirmTime}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </>
  );
};

export default DateTimeInput_Android;
