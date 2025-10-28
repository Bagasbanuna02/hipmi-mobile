// components/Select.tsx
import { GStyles } from "@/styles/global-styles";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type SelectItem = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  data: SelectItem[];
  value?: string | number | null;
  required?: boolean; // <-- new prop
  disabled?: boolean; // <-- tambahkan prop disabled
  onChange: (value: string | number) => void;
  borderRadius?: number;
  styleContainer?: StyleProp<ViewStyle>;
  allowClear?: boolean; // <-- new prop
  clearLabel?: string; // default: "Kosongkan"
};

const SelectCustom: React.FC<SelectProps> = ({
  label,
  placeholder = "Pilih opsi",
  data,
  value,
  required = false, // <-- default false
  disabled = false, // <-- default false
  onChange,
  borderRadius = 8,
  styleContainer,
  allowClear = true, // bisa dimatikan jika tidak perlu
  clearLabel = "Hapus Pilihan",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = data.find((item) => item.value === value);
  const hasError = required && value === null; // <-- check if empty and required

  // Gabungkan opsi clear di atas daftar
  const renderData = allowClear
    ? [...data,
      //  { label: clearLabel, value: "__clear__" }
      ]
    : data;

  return (
    <View style={[GStyles.inputContainerArea, styleContainer]}>
      {label && (
        <Text style={GStyles.inputLabel}>
          {label}
          {required && <Text style={GStyles.inputRequired}> *</Text>}
        </Text>
      )}

      {/* Input Container */}
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor: "red",
            // flex: 1,
            borderRadius,
          },
          GStyles.inputContainerInput,
          hasError ? GStyles.inputErrorBorder : null,
          disabled && GStyles.disabledBox,
        ]}
      >
        <Pressable
          style={[
            {
              flex: 1,
              borderRadius,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              height: 50,
            },

            // GStyles.inputContainerInput,
            // hasError ? GStyles.inputErrorBorder : null,
            // disabled && GStyles.disabledBox,
          ]}
          onPress={() => !disabled && setModalVisible(true)}
        >
          <Text
            style={
              selectedItem
                ? disabled
                  ? GStyles.inputTextDisabled
                  : GStyles.inputText
                : disabled
                ? GStyles.inputPlaceholderDisabled
                : GStyles.inputPlaceholder
            }
          >
            {selectedItem?.label || placeholder}
          </Text>
        </Pressable>

        {/* Tombol Clear (Hanya muncul jika ada nilai terpilih & allowClear aktif) */}
        {!disabled && allowClear && value !== null && value !== undefined && (
          <TouchableOpacity
            style={{ paddingHorizontal: 10 }}
            onPress={() => onChange(null as any)} // null dikirim sebagai value
          >
            <Text style={{ fontSize: 18, color: "#999" }}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={GStyles.selectModalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={GStyles.selectModalContent}>
            <FlatList
              data={renderData}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => {
                if (item.value === "__clear__") {
                  return (
                    <TouchableOpacity
                      style={[
                        GStyles.selectOption,
                        { backgroundColor: "#fdd" },
                      ]}
                      onPress={() => {
                        onChange(null as any); // kosongkan nilai
                        setModalVisible(false);
                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    style={GStyles.selectOption}
                    onPress={() => {
                      onChange(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Optional Error Message */}
      {hasError && (
        <Text style={GStyles.inputErrorMessage}>Harap pilih salah satu</Text>
      )}
    </View>
  );
};

export default SelectCustom;
