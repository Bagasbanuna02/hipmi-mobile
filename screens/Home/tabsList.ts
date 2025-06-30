import { ITabs } from "@/components/_Interface/types";

export  const tabsHome: ITabs[] = [
  {
    id: "forum",
    icon: "chatbubble-ellipses-outline",
    activeIcon: "chatbubble-ellipses",
    label: "Forum",
    path: "/forum",
    isActive: true,
    disabled: false,
  },
  {
    id: "marketplace",
    icon: "cart-outline",
    activeIcon: "cart",
    label: "Marketplace",
    path: "/marketplace",
    isActive: false,
    disabled: true,
  },
  {
    id: "maps",
    icon: "map-outline",
    activeIcon: "map",
    label: "Maps",
    path: "/maps",
    isActive: true,
    disabled: false,
  },
  {
    id: "profile",
    icon: "person-outline",
    activeIcon: "person",
    label: "Profile",
    path: "/profile/coba-id",
    isActive: true,
    disabled: false,
  },
];