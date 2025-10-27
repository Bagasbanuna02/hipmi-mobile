import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_XLARGE } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export { IconOpenTo };

function IconOpenTo({
  color,
  size,
  onPress,
}: {
  color?: string;
  size?: number;
  onPress?: () => void;
}) {
  return (
    <>
      <Ionicons
        onPress={onPress}
        name="open"
        size={size || ICON_SIZE_XLARGE}
        color={color || MainColor.yellow}
      />
    </>
  );
}
