import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { FontAwesome5 } from "@expo/vector-icons";

export default function IconEdit({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <>
      <FontAwesome5
        name="edit"
        size={size || ICON_SIZE_SMALL}
        color={color || MainColor.white}
      />
    </>
  );
}
