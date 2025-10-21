import { MainColor } from "@/constants/color-palet";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import TextCustom from "../Text/TextCustom";

interface CircularInputProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CircularInput: React.FC<CircularInputProps> = ({
  value,
  onChange,
  icon,
  style,
}) => {
  return (
    <View style={[styles.circleContainer, style]}>
      {icon ? (
        icon
      ) : (
        <TextCustom
          // text={String(value)}
          style={styles.input}
          // keyboardType="numeric"
          // maxLength={2} // Batasan maksimal karakter
        >
          {value}
        </TextCustom>
      )}
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 0,
    backgroundColor: "transparent",
  },
});

export default CircularInput;
