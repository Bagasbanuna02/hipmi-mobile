import { IMenuDrawerItem } from "@/components/_Interface/types";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export const drawerItemsProfile = ({
  id,
}: {
  id: string;
}): IMenuDrawerItem[] => [
  {
    icon: (
      <Ionicons
        name="create"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Edit profile",
    path: `/(application)/profile/${id}/edit`,
  },
  {
    icon: (
      <Ionicons
        name="camera"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Ubah foto profile",
    path: `/(application)/profile/${id}/update-photo`,
  },
  {
    icon: (
      <Ionicons
        name="image"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Ubah latar belakang",
    path: `/(application)/profile/${id}/update-background`,
  },
  {
    icon: (
      <Ionicons
        name="add-circle"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Tambah portofolio",
    path: `/(application)/portofolio/${id}/create`,
  },
  {
    icon: (
      <Ionicons
        name="settings"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Dashboard Admin",
    path: `/(application)/admin/dashboard`,
  },
  {
    icon: (
      <Ionicons
        name="log-out"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Keluar",
    color: MainColor.red,
    path: "",
  },
  {
    icon: (
      <Ionicons
        name="create-outline"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Create profile",
    path: `/(application)/profile/${id}/create`,
  },
];
