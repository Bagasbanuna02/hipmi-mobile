import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { MaterialIcons } from "@expo/vector-icons";

export { IconNews };

function IconNews({ color, size }: { color?: string; size?: number }) {
  return (
    <MaterialIcons
      name="newspaper"
      size={size || ICON_SIZE_MEDIUM}
      color={color || MainColor.white}
    />
  );
}
