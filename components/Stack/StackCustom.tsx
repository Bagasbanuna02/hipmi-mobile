// components/Stack.tsx

import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

import { AlignType, GapSizeType, JustifyType } from "@/components/Stack/stack-types";

interface StackProps {
  children: React.ReactNode;
  align?: AlignType;
  justify?: JustifyType;
  gap?: GapSizeType;
  direction?: "row" | "column";
  style?: ViewStyle | ViewStyle[];
}

const StackCustom: React.FC<StackProps> = ({
  children,
  align = "stretch",
  justify = "flex-start",
  gap = "md",
  direction = "column",
  style,
}) => {
  const spacing = convertToSpacing(gap);

  return (
    <View
      style={[
        // styles.stack,
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          gap: spacing,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

// Fungsi untuk mengubah nilai gap ke dalam ukuran pixel
const convertToSpacing = (value: GapSizeType): number => {
  if (typeof value === "number") return value;

  const sizes: Record<string, number> = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };

  return sizes[value] || 16; // default md
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
  },
});

export default StackCustom;
