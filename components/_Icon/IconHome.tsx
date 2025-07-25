import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export default function IconHome({ color }: { color?: string }) {
  return (
    <>
      <Ionicons name="home" size={ICON_SIZE_SMALL} color={color || "white"} />
    </>
  );
}
