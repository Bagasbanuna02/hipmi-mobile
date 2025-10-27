import { MainColor } from "@/constants/color-palet";
import { ActivityIndicator } from "react-native";

export default function LoaderCustom({ size }: { size?: "small" | "large" }) {
  return (
    <ActivityIndicator size={size ? size : "small"} color={MainColor.yellow} />
  );
}
