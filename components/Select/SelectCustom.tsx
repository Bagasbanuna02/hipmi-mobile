// components/Select.tsx
import { MainColor } from "@/constants/color-palet";
import { TEXT_SIZE_MEDIUM } from "@/constants/constans-value";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
  onChange: (value: string | number) => void;
};

const SelectCustom: React.FC<SelectProps> = ({
  label,
  placeholder = "Pilih opsi",
  data,
  value,
  onChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = data.find((item) => item.value === value);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable style={styles.input} onPress={() => setModalVisible(true)}>
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
    color: MainColor.white,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: "center",
    backgroundColor: MainColor.white,
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
});
