import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Octicons } from "@expo/vector-icons";

export { IconPlus };

function IconPlus({
  color,
  size,
  onPress,
}: {
  color?: string;
  size?: number;
  onPress?: () => void;
}) {
  return (
    <Octicons
      name="plus-circle"
      size={size || ICON_SIZE_MEDIUM}
      color={color || MainColor.white}
      onPress={onPress}
    />
  );
}
