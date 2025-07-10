import { IMenuDrawerItem } from "@/components/_Interface/types";

export const drawerItemsProfile = ({ id }: { id: string }): IMenuDrawerItem[] => [
  {
    icon: "create",
    label: "Edit profile",
    path: `/(application)/profile/${id}/edit`,
  },
  {
    icon: "camera",
    label: "Ubah foto profile",
    path: `/(application)/profile/${id}/update-photo`,
  },
  {
    icon: "image",
    label: "Ubah latar belakang",
    path: `/(application)/profile/${id}/update-background`,
  },
  {
    icon: "add-circle",
    label: "Tambah portofolio",
    path: `/(application)/portofolio/${id}/create`,
  },
  // {
  //   icon: "settings",
  //   label: "Dashboard Admin",
  //   path: `/(application)/profile/dashboard-admin`,
  // },
  { icon: "log-out", label: "Keluar", color: "red", path: "" },
  {
    icon: "create-outline",
    label: "Create profile",
    path: `/(application)/profile/${id}/create`,
  },
];