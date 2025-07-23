import { AccentColor, MainColor } from "@/constants/color-palet";
import { View } from "react-native";

export default function TabBarBackground() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: MainColor.darkblue,
        borderTopWidth: 1,
        borderTopColor: AccentColor.blue,
      }}
    />
  );
}