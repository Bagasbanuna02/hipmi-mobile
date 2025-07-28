import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

type BadgeVariant = "filled" | "light" | "outline" | "dot";
type BadgeColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "gray"
  | "dark";
type BadgeSize = "xs" | "sm" | "md" | "lg";

interface BadgeProps extends ViewProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  radius?: number;
  fullWidth?: boolean;
  textColor?: string;
}

const BadgeCustom: React.FC<BadgeProps> = ({
  children,
  variant = "filled",
  color = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  radius = 50,
  fullWidth = false,
  textColor = "#fff",
  style,
  ...props
}) => {
  const colors = {
    primary: "#339AF0",
    success: "#40C057",
    warning: "#FAB005",
    danger: "#FA5252",
    gray: "#868E96",
    dark: "#212529",
  };

  const themeColor = colors[color];

  // Ganti bagian sizeStyles dan styles.container
  const sizeStyles = {
    xs: {
      fontSize: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      height: 18, // Dinaikkan dari 16 → 18 agar teks tidak terpotong
      lineHeight: 10, // 👈 Penting: match fontSize agar kontrol vertikal lebih baik
    },
    sm: {
      fontSize: 11,
      paddingHorizontal: 8,
      paddingVertical: 3,
      height: 20,
      lineHeight: 11,
    },
    md: {
      fontSize: 12,
      paddingHorizontal: 10,
      paddingVertical: 4,
      height: 24,
      lineHeight: 12,
    },
    lg: {
      fontSize: 14,
      paddingHorizontal: 12,
      paddingVertical: 6,
      height: 30,
      lineHeight: 14,
    },
  };

  const currentSize = sizeStyles[size];

  let variantStyles: ViewStyle & { text: TextStyle } = {
    backgroundColor: themeColor,
    borderColor: themeColor,
    borderWidth: 1,
    borderRadius: radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    text: { color: textColor, fontWeight: "600" },
  };

  switch (variant) {
    case "light":
      variantStyles.backgroundColor = `${themeColor}20`;
      variantStyles.text.color = themeColor;
      break;
    case "outline":
      variantStyles.backgroundColor = "transparent";
      variantStyles.text.color = themeColor;
      break;
    case "dot":
      variantStyles.backgroundColor = themeColor;
      variantStyles.paddingHorizontal = 0;
      variantStyles.paddingVertical = 0;
      variantStyles.height = currentSize.fontSize * 2;
      variantStyles.width = currentSize.fontSize * 2;
      variantStyles.borderRadius = currentSize.fontSize;
      break;
    default:
      break;
  }

  if (variant === "dot") {
    return (
      <View
        style={[variantStyles, fullWidth && styles.fullWidth, style]}
        {...props}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        variantStyles,
        currentSize,
        { borderRadius: radius },
        fullWidth && styles.fullWidth,
        style,
      ]}
      {...props}
    >
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <Text
        style={[
          styles.text,
          variantStyles.text,
          { fontSize: currentSize.fontSize },
        ]}
      >
        {children}
      </Text>
      {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center", // Vertikal center anak-anak (termasuk teks)
    justifyContent: "center", // Horizontal center
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 20,
    borderRadius: 6,
    // ❌ Jangan gunakan `height` fix di sini — kita override per size
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
    // ❌ Hapus marginHorizontal jika mengganggu alignment
    // marginHorizontal: 2, // Opsional, bisa dihapus atau dikurangi
    includeFontPadding: false, // 👈 Ini penting untuk Android!
    padding: 0, // Bersihkan padding tambahan dari font
  },
  iconContainer: {
    marginHorizontal: 2, // Lebih kecil dari sebelumnya agar tidak ganggu ukuran kecil
  },
  fullWidth: {
    width: "100%",
    alignSelf: "stretch",
    justifyContent: "center",
  },
});

export default BadgeCustom;
