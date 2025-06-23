// src/components/Spacing.tsx
import React from "react";
import { View } from "react-native";

interface SpacingProps {
  width?: number;
  height?: number;
}

const Spacing: React.FC<SpacingProps> = ({ width = 20, height = 20 }) => {
  return <View style={{ height, width }} />;
};

export default Spacing;
