import { IMenuDrawerItem } from "@/components/_Interface/types";
import { AccentColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import {
  FontAwesome,
  Fontisto,
  Ionicons
} from "@expo/vector-icons";

export const drawerItemsPortofolio = ({
  id,
  maps,
}: {
  id: string;
  maps: any;
}): IMenuDrawerItem[] => [
  {
    icon: (
      <Ionicons
        name="create"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Edit portofolio",
    path: `/(application)/portofolio/${id}/edit`,
  },
  {
    icon: (
      <Ionicons
        name="camera"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Edit logo ",
    path: `/(application)/portofolio/${id}/edit-logo`,
  },
  {
    icon: (
      <FontAwesome
        name="id-card-o"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: "Edit social media ",
    path: `/(application)/portofolio/${id}/edit-social-media`,
  },
  {
    icon: (
      <Fontisto
        name="map-marker-alt"
        size={ICON_SIZE_MEDIUM}
        color={AccentColor.white}
      />
    ),
    label: `${!maps ? "Tambah" : "Edit"} Map`,
    path: !maps
      ? `/(application)/maps/create?id=${id}`
      : `/(application)/maps/${maps?.id}/edit`,
  },
  // {
  //   icon: (
  //     <FontAwesome5
  //       name="map-pin"
  //       size={ICON_SIZE_MEDIUM}
  //       color={AccentColor.white}
  //     />
  //   ),
  //   label: "Custom Pin Map",
  //   path: `/(application)/maps/${id}/custom-pin`,
  // },
];
