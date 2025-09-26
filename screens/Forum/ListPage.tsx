import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Feather, Ionicons } from "@expo/vector-icons";

export {
  drawerItemsForumBerandaForAuthor,
  drawerItemsForumComentarForAuthor,
  drawerItemsForumBerandaForNonAuthor,
  drawerItemsForumComentarForNonAuthor,
};

const drawerItemsForumBerandaForAuthor = ({
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
    path: `/forum/${id}/edit`,
  },
  {
    icon:
      status === "Open" ? (
        <Ionicons name="close" size={ICON_SIZE_SMALL} color={MainColor.white} />
      ) : (
        <Ionicons name="open" size={ICON_SIZE_SMALL} color={MainColor.white} />
      ),

    label: status === "Open" ? "Tutup forum" : "Buka forum",
    path: "",
    color: status === "Open" ? MainColor.orange : MainColor.green,
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

const drawerItemsForumBerandaForNonAuthor = ({ id }: { id: string }) => [
  {
    icon: (
      <Ionicons name="flag" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Laporkan diskusi",
    // color: MainColor.white,
    path: `/forum/${id}/report-posting`,
  },
];

const drawerItemsForumComentarForAuthor = ({ id }: { id: string }) => [
  {
    icon: (
      <Ionicons name="trash" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Hapus",
    color: MainColor.red,
    path: "",
  },
];

const drawerItemsForumComentarForNonAuthor = ({ id }: { id: string }) => [
  {
    icon: (
      <Ionicons name="flag" size={ICON_SIZE_SMALL} color={MainColor.white} />
    ),
    label: "Laporkan",
    // color: MainColor.white,
    path: `/forum/${id}/report-commentar`,
  },
];
