import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Feather, Ionicons } from "@expo/vector-icons";

export { drawerItemsForumBeranda };

const drawerItemsForumBeranda = ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => [
  {
    icon: (
      <Feather name="edit" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Edit posting",
    path: `/forumku/${id}`,
  },
  {
    icon:
      status === "Open" ? (
        <Ionicons name="open" size={ICON_SIZE_SMALL} color={MainColor.white} />
      ) : (
        <Ionicons name="close" size={ICON_SIZE_SMALL} color={MainColor.white} />
      ),

    label: status === "Open" ? "Buka forum" : "Tutup forum",
    path: "",
    color: status === "Open" ? MainColor.green : MainColor.orange,
  },
  {
    icon: (
      <Ionicons name="trash" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Hapus",
    path: "",
    color: MainColor.red,
  },
];
