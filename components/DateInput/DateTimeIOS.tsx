// DateTimeInput.tsx
import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import ClickableCustom from "../Clickable/ClickableCustom";
import TextCustom from "../Text/TextCustom";

interface DateTimeInputProps {
  // Main
  value?: DateTimePickerEvent | Date | null;
  mode?: "date" | "time";
  onChange: (selectedDate: DateTimePickerEvent | Date | null) => void;
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

const DateTimeInput_IOS: React.FC<DateTimeInputProps> = ({
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
        onPress={() => !disabled && handlePress()}
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
              color={disabled ? MainColor.white : MainColor.placeholder}
            />
          </View>

          <TextCustom color={disabled ? "default" : "gray"}>
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
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              themeVariant="light"
            />
          </View>
        </>
      )}
    </>
  );
};

export default DateTimeInput_IOS;
