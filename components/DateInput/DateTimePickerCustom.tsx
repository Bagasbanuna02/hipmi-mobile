import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React from "react";
import { Platform } from "react-native";
import DateTimeInput_Android from "./DataTimeAndroid";
import DateTimeInput_IOS from "./DateTimeIOS";

type Props = {
  value?: Date | DateTimePickerEvent | null;
  onChange?: (date: Date) => void;
  label?: string;
  required?: boolean;
  maximumDate?: Date;
  minimumDate?: Date;
  disabled?: boolean;
};

const DateTimePickerCustom: React.FC<Props> = ({
  value,
  onChange,
  label,
  required,
  maximumDate,
  minimumDate,
  disabled = false,
}) => {

  return (
    <>
      {Platform.OS === "ios" ? (
        <DateTimeInput_IOS
          label={label}
          onChange={(date: DateTimePickerEvent | Date | null) => {
            onChange?.(date as any);
          }}
          required={required}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          disabled={disabled}
          value={value as DateTimePickerEvent | Date | null}
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
          disabled={disabled}
          value={value as DateTimePickerEvent | Date | null | any}


        />
      )}
    </>
  );
};

export default DateTimePickerCustom;
