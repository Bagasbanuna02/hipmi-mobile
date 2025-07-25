import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { MaterialIcons } from "@expo/vector-icons";

export default function IconStatus({ color }: { color?: string }) {
  return (
    <MaterialIcons
      size={ICON_SIZE_SMALL}
      name="checklist-rtl"
      color={color || "white"}
    />
  );
}
