import { NavbarItem } from "@/components/Drawer/NavbarMenu";

export { adminListMenu }

const adminListMenu: NavbarItem[] = [
  {
    label: "Main Dashboard",
    icon: "home",
    link: "/admin/dashboard",
  },
  {
    label: "Investasi",
    icon: "wallet",
    links: [
      { label: "Dashboard", link: "/admin/investment" },
      { label: "Publish", link: "/admin/investment/publish" },
      { label: "Review", link: "/admin/investment/review" },
      { label: "Reject", link: "/admin/investment/reject" },
    ],
  },
  {
    label: "Donasi",
    icon: "hand-right",
    links: [
      { label: "Dashboard", link: "/admin/donasi" },
      { label: "Publish", link: "/admin/donasi/publish" },
      { label: "Review", link: "/admin/donasi/review" },
      { label: "Reject", link: "/admin/donasi/reject" },
      { label: "Kategori", link: "/admin/donasi/kategori" },
    ],
  },
  {
    label: "Event",
    icon: "calendar-clear",
    links: [
      { label: "Dashboard", link: "/admin/event" },
      { label: "Publish", link: "/admin/event/publish" },
      { label: "Review", link: "/admin/event/review" },
      { label: "Reject", link: "/admin/event/reject" },
      { label: "Tipe Acara", link: "/admin/event/tipe-acara" },
      { label: "Riwayat", link: "/admin/event/riwayat" },
    ],
  },
  {
    label: "Voting",
    icon: "accessibility-outline",
    links: [
      { label: "Dashboard", link: "/admin/voting" },
      { label: "Publish", link: "/admin/voting/publish" },
      { label: "Review", link: "/admin/voting/review" },
      { label: "Reject", link: "/admin/voting/reject" },
      { label: "Riwayat", link: "/admin/voting/riwayat" },
    ],
  },
  {
    label: "Job",
    icon: "desktop-outline",
    links: [
      { label: "Dashboard", link: "/admin/job" },
      { label: "Publish", link: "/admin/job/publish/status" },
      { label: "Review", link: "/admin/job/review/status" },
      { label: "Reject", link: "/admin/job/reject/status" },
    ],
  },
  {
    label: "Forum",
    icon: "chatbubble-ellipses-outline",
    links: [
      { label: "Dashboard", link: "/admin/forum" },
      { label: "Posting", link: "/admin/forum/publish" },
      { label: "Report Posting", link: "/admin/forum/review" },
      { label: "Report Comment", link: "/admin/forum/reject" },
    ],
  },
  {
    label: "Collaboration",
    icon: "people",
    links: [
      { label: "Dashboard", link: "/admin/collaboration" },
      { label: "Publish", link: "/admin/collaboration/publish" },
      { label: "Group", link: "/admin/collaboration/group" },
      { label: "Reject", link: "/admin/collaboration/reject" },
    ],
  },
  { label: "Maps", icon: "map", link: "/admin/maps" },
  {
    label: "App Information",
    icon: "information-circle",
    link: "/admin/app-information",
  },
  {
    label: "User Access",
    icon: "people",
    link: "/admin/user-access",
  },
];