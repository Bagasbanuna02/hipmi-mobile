// components/Button/Button.tsx

import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { radiusMap } from "@/constants/radius-value";
import { MainColor } from "@/constants/color-palet";
import { stylesButton } from "./buttonCustomStyles";

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
  style?: StyleProp<ViewStyle>;
}

const ButtonCustom: React.FC<ButtonProps> = ({
  children,
  onPress,
  title = "Button",
  backgroundColor = MainColor.yellow,
  textColor = MainColor.black,
  radius = 50, // default md
  disabled = false,
  iconLeft,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        stylesButton.button,
        disabled && stylesButton.disabled,
        style,
        { borderRadius: radius },
        { backgroundColor },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {/* Render icon jika tersedia */}
      {iconLeft && iconLeft}
      <Text style={[stylesButton.buttonText, { color: textColor }]}>
        {children || title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
