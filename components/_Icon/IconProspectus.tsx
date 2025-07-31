import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

export { IconProspectus , IconProspectusEdit};

function IconProspectus({ color, size }: { color?: string; size?: number }) {
  return (
      <FontAwesome6 name="file-contract" size={size || ICON_SIZE_MEDIUM} color={color || MainColor.white} />
    );
}

function IconProspectusEdit({ color, size }: { color?: string; size?: number }) {
  return (
    <MaterialIcons
      name="edit-note"
      size={size || ICON_SIZE_MEDIUM}
      color={color || MainColor.white}
    />
  );
}
