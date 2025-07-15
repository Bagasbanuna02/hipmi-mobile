import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Feather, Ionicons } from "@expo/vector-icons";

export { drawerItemsForumBeranda, drawerItemsForumComentar };

const drawerItemsForumBeranda = ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => [
  {
    icon: (
      <Ionicons name="flag" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Laporkan diskusi",
    // color: MainColor.white,
    path: `/forum/${id}/report-posting`,
  },
    
  {
    icon: (
      <Feather name="edit" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Edit posting",
    path: `/forum/${id}/edit`,
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

const drawerItemsForumComentar = ({ id }: { id: string }) => [
  {
    icon: (
      <Ionicons name="flag" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Laporkan",
    // color: MainColor.white,
    path: `/forum/${id}/report-commentar`,
  },
  {
    icon: (
      <Ionicons name="trash" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Hapus",
    color: MainColor.red,
    path: "",
  },
];
