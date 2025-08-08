import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export default function IconArchive({ color, size }: { color?: string; size?: number }) {
  return (
    <Ionicons
      name="archive"
      size={size || ICON_SIZE_SMALL}
      color={color || MainColor.white}
    />
  );
}
