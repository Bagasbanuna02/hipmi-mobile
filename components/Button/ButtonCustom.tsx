// components/Button/Button.tsx

import React from "react";
import { Text, TouchableOpacity } from "react-native";
import buttonStyles from "./buttonCustomStyles";
import { radiusMap } from "@/constants/radius-value";
import { MainColor } from "@/constants/color-palet";

// Import radiusMap


// Definisi type untuk radius
type RadiusType = keyof typeof radiusMap | number;

interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  radius?: RadiusType; // ← bisa string enum atau number
  disabled?: boolean;
  iconLeft?: React.ReactNode;
}

const ButtonCustom: React.FC<ButtonProps> = ({
  children,
  onPress,
  title = "Button",
  backgroundColor = MainColor.yellow,
  textColor = MainColor.black,
  radius = "full", // default md
  disabled = false,
  iconLeft,
}) => {
  const borderRadius =
    typeof radius === "number" ? radius : radiusMap[radius ?? "md"]; // fallback ke 'md'

  const styles = buttonStyles({
    backgroundColor,
    textColor,
    borderRadius,
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
      <Text style={styles.buttonText}>{children || title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
