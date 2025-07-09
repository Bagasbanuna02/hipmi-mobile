// components/Select.tsx
import { GStyles } from "@/styles/global-styles";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View
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
  onChange: (value: string | number) => void;
  borderRadius?: number;
};

const SelectCustom: React.FC<SelectProps> = ({
  label,
  placeholder = "Pilih opsi",
  data,
  value,
  required = false, // <-- default false
  onChange,
  borderRadius = 8,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = data.find((item) => item.value === value);

  const hasError = required && value === null; // <-- check if empty and required

  return (
    <View style={GStyles.inputContainerArea}>
      {label && (
        <Text style={GStyles.inputLabel}>
          {label}
          {required && <Text style={GStyles.inputRequired}> *</Text>}
        </Text>
      )}
      <Pressable
        style={[
          { borderRadius },
          GStyles.inputContainerInput,
          hasError ? GStyles.inputErrorBorder : null,
        ]} // <-- add error style
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={selectedItem ? GStyles.inputText : GStyles.inputPlaceholder}
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
