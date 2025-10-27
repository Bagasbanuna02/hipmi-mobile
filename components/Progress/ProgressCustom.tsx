import { useTheme } from "@react-navigation/native";
import React from "react";
import { Animated, StyleSheet, Text, View, ViewStyle } from "react-native";

type ProgressColor =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "dark";

type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ProgressProps {
  value?: number | null;
  color?: ProgressColor;
  size?: ProgressSize;
  radius?: number;
  style?: ViewStyle;
  animated?: boolean;
  label?: React.ReactNode; // Konten label (bisa string, number, atau elemen)
  showLabel?: boolean; // Jika ingin mengontrol visibilitas
}

const getColor = (color: ProgressColor, isDark: boolean) => {
  const palette: Record<ProgressColor, string> = {
    primary: "#FFC107",
    success: "#228B22",
    warning: "#FFA500",
    error: "#DC3545",
    info: "#177DDC",
    dark: isDark ? "#DADADA" : "#212121",
  };
  return palette[color];
};

const getSize = (size: ProgressSize): number => {
  const sizes: Record<ProgressSize, number> = {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  };
  return sizes[size];
};

const ProgressCustom: React.FC<ProgressProps> = ({
  value = 0,
  color = "primary",
  size = "md",
  radius = 999,
  style,
  animated = true,
  label,
  showLabel = true,
}) => {
  const { dark } = useTheme();
  const isDark = dark ?? false;

  const barHeight = getSize(size);
  const progressColor = getColor(color, isDark);
  const displayValue =
    typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;

  // Animasi indeterminate
  const translateX = React.useRef(new Animated.Value(-1)).current;

  React.useEffect(() => {
    if (value === null && animated) {
      const animation = Animated.loop(
        Animated.timing(translateX, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        })
      );
      animation.start();
      return () => animation.stop();
    }
  }, [value, animated, translateX]);

  const isIndeterminate = value === null;

  // Tentukan teks label
  const labelText =
    label !== undefined
      ? label
      : typeof value === "number"
      ? `${Math.round(value)}%`
      : "";

  return (
    <View
      style={[
        styles.container,
        {
          height: barHeight,
          borderRadius: radius,
          backgroundColor: isDark
            ? "rgb(255, 255, 255)"
            : "rgba(255, 255, 255, 0.84)",
        },
        style,
      ]}
    >
      {/* Progress Fill */}
      {isIndeterminate ? (
        <Animated.View
          style={[
            styles.indeterminateBar,
            {
              width: "50%",
              height: barHeight,
              borderRadius: radius,
              backgroundColor: progressColor,
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-100, 100],
                  }),
                },
              ],
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.progressBar,
            {
              width: `${displayValue}%`,
              height: barHeight,
              borderRadius: radius,
              backgroundColor: progressColor,
            },
          ]}
        />
      )}

      {/* Label di tengah */}
      {showLabel && labelText ? (
        <View style={StyleSheet.absoluteFill}>
          <Text
            style={[
              styles.label,
              {
                fontSize: barHeight * 0.7,
                lineHeight: barHeight,
                color: isDark ? "black" : "black", // Warna teks, bisa disesuaikan
                fontWeight: "600",
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {labelText}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default ProgressCustom;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
    justifyContent: "center", // Pusatkan label secara vertikal
  },
  progressBar: {
    backgroundColor: "#007BFF",
  },
  indeterminateBar: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#007BFF",
  },
  label: {
    textAlign: "center",
    width: "100%",
    // Hindari overlap dengan background — bisa tambahkan shadow atau background jika perlu
    textShadowColor: "rgba(255,255,255,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
