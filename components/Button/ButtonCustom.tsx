// components/Button/Button.tsx

import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { radiusMap } from "@/constants/radius-value";
import { MainColor } from "@/constants/color-palet";
import { stylesButton } from "./buttonCustomStyles";
import { Href, router } from "expo-router";
import { ActivityIndicator } from "react-native-paper";

// Import radiusMap

// Definisi type untuk radius
type RadiusType = keyof typeof radiusMap | number;

interface ButtonProps {
  children?: React.ReactNode;
  href?: Href;
  onPress?: () => void;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  radius?: RadiusType; // ← bisa string enum atau number
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const ButtonCustom: React.FC<ButtonProps> = ({
  children,
  href,
  onPress,
  title = "Button",
  backgroundColor = MainColor.yellow,
  textColor = MainColor.black,
  radius = 50, // default md
  disabled = false,
  iconLeft,
  style,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        stylesButton.button,
        { borderRadius: radius },
        disabled
          ? [stylesButton.disabled, { backgroundColor: MainColor.disabled }]
          : { backgroundColor },
        style,
      ]}
      onPress={() => {
        if (href) {
          router.push(href);
        } else {
          onPress?.();
        }
      }}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {/* Render icon jika tersedia */}
      {iconLeft && iconLeft}
      {isLoading ? (
        <ActivityIndicator size={18} color={MainColor.darkblue} />
      ) : (
        <Text style={[stylesButton.buttonText, { color: textColor }]}>
          {children || title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonCustom;
