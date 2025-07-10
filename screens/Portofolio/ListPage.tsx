import { IMenuDrawerItem } from "@/components/_Interface/types";

export const drawerItemsPortofolio = ({
  id,
}: {
  id: string;
}): IMenuDrawerItem[] => [
  {
    icon: "create",
    label: "Edit portofolio",
    path: `/(application)/portofolio/${id}/edit`,
  },
  {
    icon: "camera",
    label: "Edit logo ",
    path: `/(application)/portofolio/${id}/edit-logo`,
  },
  {
    icon: "image",
    label: "Edit social media ",
    path: `/(application)/portofolio/${id}/edit-social-media`,
  },
  {
    icon: "add-circle",
    label: "Edit Map",
    path: `/(application)/maps/${id}/edit`,
  },
  {
    icon: "create-outline",
    label: "Custom Pin Map",
    path: `/(application)/maps/${id}/custom-pin`,
  },
];
