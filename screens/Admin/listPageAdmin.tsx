import { NavbarItem } from "@/components/Drawer/NavbarMenu";

export { adminListMenu, superAdminListMenu }

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
      { label: "Publish", link: "/admin/investment/publish/status" },
      { label: "Review", link: "/admin/investment/review/status" },
      { label: "Reject", link: "/admin/investment/reject/status" },
    ],
  },
  {
    label: "Donasi",
    icon: "hand-right",
    links: [
      { label: "Dashboard", link: "/admin/donation" },
      { label: "Publish", link: "/admin/donation/publish/status" },
      { label: "Review", link: "/admin/donation/review/status" },
      { label: "Reject", link: "/admin/donation/reject/status" },
      { label: "Kategori", link: "/admin/donation/category" },
    ],
  },
  {
    label: "Event",
    icon: "calendar-clear",
    links: [
      { label: "Dashboard", link: "/admin/event" },
      { label: "Publish", link: "/admin/event/publish/status" },
      { label: "Review", link: "/admin/event/review/status" },
      { label: "Reject", link: "/admin/event/reject/status" },
      { label: "Tipe Acara", link: "/admin/event/type-of-event" },
      { label: "Riwayat", link: "/admin/event/riwayat/status" },
    ],
  },
  {
    label: "Voting",
    icon: "accessibility-outline",
    links: [
      { label: "Dashboard", link: "/admin/voting" },
      { label: "Publish", link: "/admin/voting/publish/status" },
      { label: "Review", link: "/admin/voting/review/status" },
      { label: "Reject", link: "/admin/voting/reject/status" },
      { label: "Riwayat", link: "/admin/voting/riwayat/status" },
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
      { label: "Posting", link: "/admin/forum/posting" },
      { label: "Report Posting", link: "/admin/forum/report-posting" },
      { label: "Report Comment", link: "/admin/forum/report-comment" },
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

const superAdminListMenu: NavbarItem[] = [
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
      { label: "Publish", link: "/admin/investment/publish/status" },
      { label: "Review", link: "/admin/investment/review/status" },
      { label: "Reject", link: "/admin/investment/reject/status" },
    ],
  },
  {
    label: "Donasi",
    icon: "hand-right",
    links: [
      { label: "Dashboard", link: "/admin/donation" },
      { label: "Publish", link: "/admin/donation/publish/status" },
      { label: "Review", link: "/admin/donation/review/status" },
      { label: "Reject", link: "/admin/donation/reject/status" },
      { label: "Kategori", link: "/admin/donation/category" },
    ],
  },
  {
    label: "Event",
    icon: "calendar-clear",
    links: [
      { label: "Dashboard", link: "/admin/event" },
      { label: "Publish", link: "/admin/event/publish/status" },
      { label: "Review", link: "/admin/event/review/status" },
      { label: "Reject", link: "/admin/event/reject/status" },
      { label: "Tipe Acara", link: "/admin/event/type-of-event" },
      { label: "Riwayat", link: "/admin/event/riwayat/status" },
    ],
  },
  {
    label: "Voting",
    icon: "accessibility-outline",
    links: [
      { label: "Dashboard", link: "/admin/voting" },
      { label: "Publish", link: "/admin/voting/publish/status" },
      { label: "Review", link: "/admin/voting/review/status" },
      { label: "Reject", link: "/admin/voting/reject/status" },
      { label: "Riwayat", link: "/admin/voting/riwayat/status" },
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
      { label: "Posting", link: "/admin/forum/posting" },
      { label: "Report Posting", link: "/admin/forum/report-posting" },
      { label: "Report Comment", link: "/admin/forum/report-comment" },
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
  {
    label: "Super Admin",
    icon: "globe",
    link: "/admin/super-admin",
  },
];