// components/Button/Button.tsx

import React from "react";
import { Text, TouchableOpacity } from "react-native";
import buttonStyles from "./buttonCustomStyles";

// Definisi props dengan TypeScript

interface ButtonProps {
  onPress: () => void;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  radius?: number;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
}

/**
 * Props untuk ButtonCustom
 * @param onPress: () => void
 * @param title?: string
 * @param backgroundColor?: string
 * @param textColor?: string
 * @param radius?: number
 * @param disabled?: boolean
 * @param iconLeft?: React.ReactNode
 * @example iconLeft={<Icon name="arrow-right" size={20} color={MainColor.black}/>
 */
const ButtonCustom: React.FC<ButtonProps> = ({
  onPress,
  title = "Button",
  backgroundColor = "#007AFF",
  textColor = "#FFFFFF",
  radius = 8,
  disabled = false,
  iconLeft,
}) => {
  const styles = buttonStyles({
    backgroundColor,
    textColor,
    borderRadius: radius,
  });

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {/* Render icon jika tersedia */}
      {iconLeft && iconLeft}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
