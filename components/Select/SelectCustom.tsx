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
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = data.find((item) => item.value === value);

  const hasError = required && value === null; // <-- check if empty and required

  return (
    <View style={[GStyles.inputContainerArea, styleContainer]}>
      {label && (
        <Text style={GStyles.inputLabel}>
          {label}
          {required && <Text style={GStyles.inputRequired}> *</Text>}
        </Text>
      )}
      <Pressable
        style={[
          { borderRadius, },
          hasError ? GStyles.inputErrorBorder : null,
          GStyles.inputContainerInput,
          disabled && GStyles.disabledBox,
        ]} // <-- add error style
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

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={GStyles.selectModalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={GStyles.selectModalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={GStyles.selectOption}
                  onPress={() => {
                    onChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
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
