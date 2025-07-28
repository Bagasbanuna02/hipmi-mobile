import { MainColor } from "@/constants/color-palet";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface CircularInputProps {
  value: string | number;
  onChange?: (value: string) => void;
}

const CircularInput: React.FC<CircularInputProps> = ({ value, onChange }) => {
  return (
    <View style={styles.circleContainer}>
      <TextInput
        value={String(value)}
        onChangeText={onChange}
        style={styles.input}
        keyboardType="numeric"
        maxLength={2} // Batasan maksimal karakter
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    width: 60,
    height: 60,
    borderRadius: 40, // Setiap setengah dari lebar/tinggi
    borderWidth: 2,
    borderColor: MainColor.yellow, // Warna kuning
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: MainColor.yellow, // Warna kuning
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 0,
    backgroundColor: "transparent",
  },
});

export default CircularInput;
