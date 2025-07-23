import { AccentColor } from "@/constants/color-palet";
import { View } from "react-native";

export default function Divider({
    color = AccentColor.blue,
    size = 1,
    marginTop= 12,
    marginBottom= 12, 
}: {
    color?: string;
    size?: number;
    marginTop?: number;
    marginBottom?: number;
}) {
  return (
    <View
      style={{
        borderTopColor: color,
        borderTopWidth: size,
        marginTop,
        marginBottom,
      }}
    />
  );
}
