import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { MainColor } from "@/constants/color-palet";

export { IconDocument, IconDocumentEdit };

function IconDocument({ color, size }: { color?: string; size?: number }) {
  return (
    <FontAwesome6
      name="file-lines"
      size={size || ICON_SIZE_MEDIUM}
      color={color || MainColor.white}
    />
  );
}

function IconDocumentEdit({ color, size }: { color?: string; size?: number }) {
  return (
    <MaterialIcons
      name="edit-document"
      size={size || ICON_SIZE_MEDIUM}
      color={color || MainColor.white}
    />
  );
}