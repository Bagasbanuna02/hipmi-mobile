/* eslint-disable @typescript-eslint/no-unused-vars */
// DateTimeInput.tsx
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Button,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import ButtonCustom from "../Button/ButtonCustom";
import TextCustom from "../Text/TextCustom";
import dayjs from "dayjs";
import TextInputCustom from "../TextInput/TextInputCustom";
import { GStyles } from "@/styles/global-styles";
import ButtonCenteredOnly from "../Button/ButtonCenteredOnly";
import Spacing from "../_ShareComponent/Spacing";
import Grid from "../Grid/GridCustom";
import { Ionicons } from "@expo/vector-icons";
import ClickableCustom from "../Clickable/ClickableCustom";
import { AccentColor, MainColor } from "@/constants/color-palet";

interface DateTimeInputProps {
  // Main
  value?: DateTimePickerEvent;
  mode?: "date" | "time";
  onChange: (selectedDate: DateTimePickerEvent) => void;
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

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  // Main
  value,
  mode,
  onChange,
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
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value as any
  );

  const handleConfirm = (event: any, date?: Date) => {
    if (event.type === "set" && date !== undefined) {
      setSelectedDate(date);
      onChange(date as any);
    }
  };

  const handlePress = () => {
    setShow(!show);
  };

  return (
    <>
      <ClickableCustom
        activeOpacity={0.8}
        style={[GStyles.inputContainerArea, containerStyle]}
        onPress={handlePress}
      >
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
              color={MainColor.placeholder}
            />
          </View>

          <TextCustom color="gray">
            {selectedDate ? (
              <TextCustom color="black">
                {dayjs(selectedDate).format("DD-MM-YYYY HH:mm")}
              </TextCustom>
            ) : (
              "Pilih tanggal"
            )}
          </TextCustom>
        </View>
        {externalError ||
          (internalError && (
            <Text style={GStyles.inputErrorMessage}>
              {externalError || internalError}
            </Text>
          ))}
      </ClickableCustom>

      {show && (
        <>
          <View
            style={{
              position: "absolute",
              zIndex: 15,
              backgroundColor: "white",
              borderRadius: 8,
              padding: 10,
              // top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderColor: "#ccc",
              borderWidth: 1,
            }}
          >
            <View style={{ alignItems: "flex-end" }}>
              <Ionicons
                name="close"
                size={20}
                color="black"
                onPress={() => setShow(false)}
              />
            </View>

            <DateTimePicker
              value={selectedDate || new Date()}
              mode={"datetime"}
              display="inline"
              onChange={handleConfirm}
              minimumDate={new Date(Date.now())} // 30 days from now
            />
          </View>
        </>
      )}
    </>
  );
};

export default DateTimeInput;
