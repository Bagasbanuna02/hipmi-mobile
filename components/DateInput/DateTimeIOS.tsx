// DateTimeInput.tsx
import { AccentColor, MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState, useRef } from "react";
import {
  Button,
  StyleProp,
  Text,
  View,
  ViewStyle,
  Keyboard,
  TouchableOpacity,
  Modal,
} from "react-native";
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
    value as any,
  );
  // State sementara untuk menyimpan nilai yang dipilih
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>(
    value as any,
  );

  const handleConfirm = (event: any, date?: Date) => {
    if (event.type === "set" && date !== undefined) {
      // Hanya perbarui state sementara, bukan state utama
      setTempSelectedDate(date);
    }
  };

  const handlePress = () => {
    // Sembunyikan keyboard sebelum menampilkan date picker
    Keyboard.dismiss();
    // Set state sementara ke nilai saat ini
    setTempSelectedDate(selectedDate);
    setShow(!show);
  };

  // Fungsi untuk menangani klik di luar area picker
  const handleOutsidePress = () => {
    if (show) {
      setShow(false);
    }
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Efek blur dengan background semi-transparan
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            activeOpacity={1}
            onPress={handleOutsidePress}
          >
            <View style={{ flex: 1 }} />
          </TouchableOpacity>

          <View
            style={{
              zIndex: 15,
              backgroundColor: MainColor.white_gray,
              borderRadius: 16,
              padding: 20,
              marginHorizontal: 20,
              width: "95%",
              maxWidth: 400,
              borderColor: MainColor.placeholder,
              borderWidth: 1,
            }}
            onStartShouldSetResponder={() => true} // Mencegah event bubbling ke TouchableOpacity induk
            onResponderRelease={() => {}} // Handler kosong untuk mencegah event bubbling
          >
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: MainColor.black,
                }}
              >
                Pilih Tanggal & Waktu
              </Text>
              <TouchableOpacity onPress={() => setShow(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={AccentColor.blackgray}
                />
              </TouchableOpacity>
            </View> */}

            <DateTimePicker
              value={tempSelectedDate || new Date()}
              mode={"datetime"}
              display="inline"
              onChange={handleConfirm}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              themeVariant="light"
            />
            <View style={{ flexDirection: "row", gap: 10, marginTop: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  setShow(false);
                  // Kembalikan ke nilai sebelumnya jika batal
                  setTempSelectedDate(selectedDate);
                }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: MainColor.placeholder,
                }}
              >
                <TextCustom color="black">Batal</TextCustom>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // Simpan nilai yang dipilih ke state utama hanya saat OK ditekan
                  setSelectedDate(tempSelectedDate);
                  onChange(tempSelectedDate as any);
                  setShow(false);
                }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: MainColor.darkblue,
                }}
              >
                <TextCustom>OK</TextCustom>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateTimeInput_IOS;
