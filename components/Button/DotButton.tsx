import { Ionicons } from "@expo/vector-icons";
import { MainColor } from "@/constants/color-palet";

export default function DotButton({ onPress }: { onPress: () => void }) {
  return (
    <Ionicons
      onPress={onPress}
      name="ellipsis-vertical"
      size={20}
      color={MainColor.yellow}
    />
  );
}
