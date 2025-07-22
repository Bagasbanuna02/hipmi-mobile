import { AccentColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export const menuDrawerDraftEvent = ({ id }: { id: string }) => [
  {
    icon: (
      <Ionicons
        name="create"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Edit event",
    path: `/(application)/(user)/event/${id}/edit`,
  },
];
