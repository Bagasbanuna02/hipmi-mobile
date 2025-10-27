import { MainColor } from "@/constants/color-palet";
import { Href, router } from "expo-router";
import { DimensionValue, StyleProp, TouchableOpacity, ViewStyle } from "react-native";

type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | number | string | undefined;

export default function ActionIcon({
  href,
  onPress,
  icon,
  size = "md",
  disabled = false,
  style,
}: {
  href?: Href;
  onPress?: () => void;
  icon: React.ReactNode;
  size?: SizeType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const sizeMap = {
    xs: 22,
    sm: 26,
    md: 30,
    lg: 34,
    xl: 38,
  };

  const getSize = (size: SizeType): DimensionValue => {
    if (!size) return sizeMap.md; // Default to 'md' if size is undefined
    if (typeof size === "string" && size in sizeMap) {
      return sizeMap[size as keyof typeof sizeMap];
    }
    return size as DimensionValue;
  };

  const iconSize = getSize(size);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[{
        backgroundColor: disabled ? MainColor.disabled : MainColor.yellow,
        padding: 5,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: iconSize,
        height: iconSize,
      }, style]}
      onPress={() => {
        if (disabled) return;
        if (href) {
          router.push(href);
        } else {
          onPress?.();
        }
      }}
    >
      {icon}
    </TouchableOpacity>
  );
}
