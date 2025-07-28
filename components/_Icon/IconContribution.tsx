import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export default function IconContribution({ color }: { color?: string }) {
  return (
    <>
      <Ionicons
        size={ICON_SIZE_SMALL}
        name="people"
        color={color || "white"}
      />
    </>
  );
}
