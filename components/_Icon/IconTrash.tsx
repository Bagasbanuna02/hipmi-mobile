import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export { IconTrash };

function IconTrash({ color, size }: { color?: string; size?: number }) {
  return (
    <Ionicons
      name="trash"
      size={size || ICON_SIZE_MEDIUM}
      color={color || MainColor.white}
    />
  );
}
