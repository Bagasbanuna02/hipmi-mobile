import { ITabs } from "@/components/_Interface/types";
import { Platform } from "react-native";

export const tabsHome: any = ({
  acceptedForumTermsAt,
  profileId,
}: {
  acceptedForumTermsAt: Date;
  profileId: string;
}) => [
  {
    id: "forum",
    icon: "chatbubble-ellipses-outline",
    activeIcon: "chatbubble-ellipses",
    label: "Forum",
    // path: acceptedForumTermsAt ? "/forum" : "/forum/terms",
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
    isActive: Platform.OS === "ios" ? true : false,
    disabled: Platform.OS === "ios" ? false : true,
  },
  {
    id: "profile",
    icon: "person-outline",
    activeIcon: "person",
    label: "Profile",
    path: `/profile/${profileId}`,
    isActive: true,
    disabled: false,
  },
];
