// components/Select.tsx
import { MainColor } from "@/constants/color-palet";
import { TEXT_SIZE_MEDIUM } from "@/constants/constans-value";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
};

const SelectCustom: React.FC<SelectProps> = ({
  label,
  placeholder = "Pilih opsi",
  data,
  value,
  required = false, // <-- default false
  onChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = data.find((item) => item.value === value);

  const hasError = required && value === null; // <-- check if empty and required

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.requiredIndicator}> *</Text>}
        </Text>
      )}
      <Pressable
        style={[styles.input, hasError ? styles.inputError : null]} // <-- add error style
        onPress={() => setModalVisible(true)}
      >
        <Text style={selectedItem ? styles.text : styles.placeholder}>
          {selectedItem?.label || placeholder}
        </Text>
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
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
        <Text style={styles.errorMessage}>Harap pilih salah satu</Text>
      )}
    </View>
  );
};

export default SelectCustom;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: TEXT_SIZE_MEDIUM,
    marginBottom: 4,
    color: MainColor.white_gray,
    fontWeight: "500",
  },
  requiredIndicator: {
    color: "red",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: MainColor.white_gray,
    padding: 12,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: "center",
    backgroundColor: MainColor.white,
  },
  inputError: {
    borderColor: "red",
  },
  text: {
    fontSize: TEXT_SIZE_MEDIUM,
  },
  placeholder: {
    fontSize: TEXT_SIZE_MEDIUM,
    color: MainColor.placeholder,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: 300,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  errorMessage: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
});
