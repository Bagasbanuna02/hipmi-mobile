import { AccentColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { FontAwesome } from "@expo/vector-icons";

export const menuDrawerPublishEvent = ({ id }: { id: string }) => [
  {
    icon: (
      <FontAwesome
        name="users"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Daftar peserta",
    path: `/(application)/(user)/event/${id}/list-of-participants`,
  },
];
