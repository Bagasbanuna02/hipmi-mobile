import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export default function IconArchive({ color }: { color?: string }) {
  return (
    <Ionicons
      name="archive"
      size={ICON_SIZE_SMALL}
      color={color || MainColor.white}
    />
  );
}
