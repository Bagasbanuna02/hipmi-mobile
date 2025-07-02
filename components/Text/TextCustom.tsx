import { MainColor } from "@/constants/color-palet";
import {
  TEXT_SIZE_LARGE,
  TEXT_SIZE_MEDIUM,
  TEXT_SIZE_SMALL,
} from "@/constants/constans-value";
import React from "react";
import { StyleProp, Text as RNText, TextStyle, StyleSheet } from "react-native";

interface TextCustomProps {
  children: string;
  style?: StyleProp<TextStyle>;
  bold?: boolean;
  semiBold?: boolean;
  size?: "default" | "large" | "small";
  color?: "default" | "primary" | "secondary";
}

const TextCustom: React.FC<TextCustomProps> = ({
  children,
  style,
  bold = false,
  semiBold = false,
  size = "default",
  color = "default",
}) => {
  const getStyle = () => {
    let selectedStyles = [];

    // Base style
    selectedStyles.push(styles.default);

    // Font weight
    if (bold) selectedStyles.push(styles.bold);
    else if (semiBold) selectedStyles.push(styles.semiBold);

    // Size
    if (size === "large") selectedStyles.push(styles.large);
    else if (size === "small") selectedStyles.push(styles.small);

    // Color
    if (color === "primary") selectedStyles.push(styles.primaryColor);
    else if (color === "secondary") selectedStyles.push(styles.secondaryColor);

    // Override with passed style
    if (style) selectedStyles.push(style);

    return selectedStyles;
  };

  return <RNText style={getStyle()}>{children}</RNText>;
};

export default TextCustom;

export const styles = StyleSheet.create({
  default: {
    // fontFamily: "Poppins-Regular", // Ganti dengan font yang kamu gunakan
    fontSize: TEXT_SIZE_MEDIUM,
    color: MainColor.white,
  },
  bold: {
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
  },
  semiBold: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "500",
  },
  large: {
    fontSize: TEXT_SIZE_LARGE,
  },
  small: {
    fontSize: TEXT_SIZE_SMALL,
  },
  primaryColor: {
    color: "#007AFF", // Warna utama aplikasi kamu
  },
  secondaryColor: {
    color: "#666",
  },
});
