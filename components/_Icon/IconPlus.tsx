import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Octicons } from "@expo/vector-icons";

export { IconPlus };

function IconPlus({ color, size }: { color?: string; size?: number }) {
  return (
    <Octicons
      name="plus-circle"
      size={size || ICON_SIZE_MEDIUM}
      color={color || MainColor.white}
    />
  );
}
