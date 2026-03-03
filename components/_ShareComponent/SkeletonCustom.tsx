// components/CustomSkeleton.tsx
import React from "react";
import { View, StyleProp, ViewStyle, DimensionValue } from "react-native";
import { MotiView } from "moti";
import { AccentColor, MainColor } from "@/constants/color-palet";

interface CustomSkeletonProps {
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
  isLoading = true,
  style,
  width = "100%",
  height = 16,
  radius = 8,
}) => {
  if (!isLoading) return null;

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor:  AccentColor.darkblue,
          overflow: "hidden",
          position: "relative",
        },
        style,
      ]}
    >
      <MotiView
        from={{ translateY: -100 }}
        animate={{ translateY: 100 }}
        transition={{
          duration: 1200,
          repeat: Infinity,
          type: "timing",
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: MainColor.soft_darkblue,
          borderRadius: 1,
        }}
      />
    </View>
  );
};

export default CustomSkeleton;
