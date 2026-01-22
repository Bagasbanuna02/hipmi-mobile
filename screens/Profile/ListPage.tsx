import { IMenuDrawerItem } from "@/components/_Interface/types";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import { Ionicons } from "@expo/vector-icons";

export const drawerItemsProfile = ({
  id,
  isAdmin,
}: {
  id: string;
  isAdmin: boolean;
}) => {
  const { user } = useAuth();

  const adminItems: IMenuDrawerItem[] = [
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
      value: "edit-profile",
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
      value: "update-photo",
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
      value: "update-background",
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
      value: "create-portofolio",
    },
    {
      icon: (
        <Ionicons
          name="list-circle"
          size={ICON_SIZE_MEDIUM}
          color={AccentColor.white}
        />
      ),
      label: "Daftar Blokir",
      path: `/(application)/profile/${id}/blocked-list`,
      value: "blocked-list",
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
      value: "dashboard-admin",
    },
    {
      icon: (
        <Ionicons
          name="trash"
          size={ICON_SIZE_MEDIUM}
          color={AccentColor.white}
        />
      ),
      label: "Hapus Akun",
      color: MainColor.red,
      path: `/(application)/(user)/delete-account?phone=${user?.nomor}`,
      value: "delete-account",
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
      value: "logout",
    },
  ];

  const userItems: IMenuDrawerItem[] = [
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
      value: "edit-profile",
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
      value: "update-photo",
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
      value: "update-background",
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
      value: "create-portofolio",
    },
     {
      icon: (
        <Ionicons
          name="list-circle"
          size={ICON_SIZE_MEDIUM}
          color={AccentColor.white}
        />
      ),
      label: "Blocked List",
      path: `/(application)/profile/${id}/blocked-list`,
      value: "blocked-list",
    },
    {
      icon: (
        <Ionicons
          name="trash"
          size={ICON_SIZE_MEDIUM}
          color={AccentColor.white}
        />
      ),
      label: "Hapus Akun",
      color: MainColor.red,
      path: `/(application)/(user)/delete-account?phone=${user?.nomor}`,
      value: "delete-account",
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
      value: "logout",
    },
  ];

  return isAdmin ? adminItems : userItems;
};
