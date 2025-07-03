// components/Button/Button.tsx

import React from "react";
import { Text, TouchableOpacity } from "react-native";
import buttonStyles from "./buttonCustomStyles";
import { RADIUS_BUTTON } from "@/constants/constans-value";

// Definisi props dengan TypeScript

interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
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
  children,
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
    borderRadius: RADIUS_BUTTON || radius,
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
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
