
import {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { Platform } from "react-native";
import DateTimeInput_Android from "./DataTimeAndroid";
import DateTimeInput_IOS from "./DateTimeIOS";

type Props = {
  value?: Date;
  onChange?: (date: Date) => void;
  label?: string;
  required?: boolean;
  maximumDate?: Date;
  minimumDate?: Date;
};

const DateTimePickerCustom: React.FC<Props> = ({
  value,
  onChange,
  label,
  required,
  maximumDate,
  minimumDate,
}) => {
  return (
    <>
      {Platform.OS === "ios" ? (
        <DateTimeInput_IOS
          label={label}
          onChange={(date: DateTimePickerEvent) => {
            onChange?.(date as any);
          }}
          required={required}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      ) : (
        <DateTimeInput_Android
          label={label}
          onChange={(date: DateTimePickerEvent) => {
            onChange?.(date as any);
          }}
          required={required}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </>
  );
};

export default DateTimePickerCustom;
