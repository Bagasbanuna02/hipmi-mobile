import { MainColor } from "@/constants/color-palet";
import {
  TEXT_SIZE_LARGE,
  TEXT_SIZE_MEDIUM,
  TEXT_SIZE_SMALL,
  TEXT_SIZE_XLARGE,
} from "@/constants/constans-value";
import React from "react";
import {
  Text as RNText,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from "react-native";

// Tambahkan type TextAlignProps agar lebih type-safe
type TextAlign = "left" | "center" | "right";

interface TextCustomProps {
  children: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
  bold?: boolean;
  semiBold?: boolean;
  size?: "default" | "large" | "small" | "xlarge" | number
  color?: "default" | "yellow" | "red" | "gray" | "green" | "black" | "orange"
  align?: TextAlign; // Prop untuk alignment
  truncate?: boolean | number;
  onPress?: () => void;
}

const TextCustom: React.FC<TextCustomProps> = ({
  children,
  style,
  bold = false,
  semiBold = false,
  size = "default",
  color = "default",
  align = "left", // Default alignment
  truncate = false,
  onPress,
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
    else if (size === "xlarge") selectedStyles.push(styles.xlarge);
    else if (size === "small") selectedStyles.push(styles.small);
    else if (typeof size === "number") selectedStyles.push({ fontSize: size });

    // Color
    if (color === "yellow") selectedStyles.push(styles.yellow);
    else if (color === "red") selectedStyles.push(styles.red);
    else if (color === "gray") selectedStyles.push(styles.gray);
    else if (color === "green") selectedStyles.push(styles.green);
    else if (color === "black") selectedStyles.push(styles.black);
    else if (color === "orange") selectedStyles.push(styles.orange);

    // Alignment
    if (align) {
      selectedStyles.push({ textAlign: align });
    }

    // Override with passed style
    if (style) selectedStyles.push(style);

    return selectedStyles;
  };

  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <RNText
        numberOfLines={
          typeof truncate === "number" ? truncate : truncate ? 1 : undefined
        }
        ellipsizeMode="tail"
        style={getStyle()}
      >
        {children}
      </RNText>
    </TouchableOpacity>
  ) : (
    <RNText
      numberOfLines={
        typeof truncate === "number" ? truncate : truncate ? 1 : undefined
      }
      ellipsizeMode="tail"
      style={getStyle()}
    >
      {children}
    </RNText>
  );
};

export default TextCustom;

export const styles = StyleSheet.create({
  default: {
    fontSize: TEXT_SIZE_MEDIUM,
    color: MainColor.white,
    fontFamily: "Poppins-Regular",
    // lineHeight: 20,
  },
  bold: {
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
  },
  semiBold: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "500",
  },
  small: {
    fontSize: TEXT_SIZE_SMALL,
  },
  large: {
    fontSize: TEXT_SIZE_LARGE,
  },
  xlarge: {
    fontSize: TEXT_SIZE_XLARGE,
  },
  yellow: {
    color: MainColor.yellow,
  },
  red: {
    color: MainColor.red,
  },
  gray: {
    color: MainColor.placeholder,
  },
  green: {
    color: MainColor.green,
  },
  black: {
    color: MainColor.black,
  },
  orange: {
    color: MainColor.orange,
  },
});
