// src/components/Spacing.tsx
import React from "react";
import { View } from "react-native";

interface SpacingProps {
  width?: number | string;
  height?: number | string;
}

const Spacing: React.FC<SpacingProps> = ({ width = 20, height = 20 }) => {
  return <View style={{ height: height as any, width: width as any }} />;
};

export default Spacing;
