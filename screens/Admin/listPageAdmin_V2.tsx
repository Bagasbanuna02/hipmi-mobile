import { NavbarItem_V2 } from "@/components/Drawer/NavbarMenu_V2";


export { adminListMenu_V2, superAdminListMenu_V2 }

const adminListMenu_V2: NavbarItem_V2[] = [
  {
    label: "Main Dashboard",
    icon: "home",
    link: "/admin/dashboard",
  },
  {
    label: "Investasi",
    icon: "wallet",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/investment",
        // Dashboard tidak perlu detailPattern, akan auto-match dengan /admin/investment/123/...
      },
      { 
        label: "Publish", 
        link: "/admin/investment/publish/status",
        detailPattern: "/admin/investment/*/publish", // Match: /admin/investment/123/publish
      },
      { 
        label: "Review", 
        link: "/admin/investment/review/status",
        detailPattern: "/admin/investment/*/review", // Match: /admin/investment/123/review
      },
      { 
        label: "Reject", 
        link: "/admin/investment/reject/status",
        detailPattern: "/admin/investment/*/reject", // Match: /admin/investment/123/reject
      },
    ],
  },
  {
    label: "Donasi",
    icon: "hand-right",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/donation",
      },
      { 
        label: "Publish", 
        link: "/admin/donation/publish/status",
        detailPattern: "/admin/donation/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/donation/review/status",
        detailPattern: "/admin/donation/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/donation/reject/status",
        detailPattern: "/admin/donation/*/reject",
      },
      { 
        label: "Kategori", 
        link: "/admin/donation/category",
      },
    ],
  },
  {
    label: "Event",
    icon: "calendar-clear",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/event",
      },
      { 
        label: "Publish", 
        link: "/admin/event/publish/status",
        detailPattern: "/admin/event/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/event/review/status",
        detailPattern: "/admin/event/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/event/reject/status",
        detailPattern: "/admin/event/*/reject",
      },
      { 
        label: "Tipe Acara", 
        link: "/admin/event/type-of-event",
      },
      { 
        label: "Riwayat", 
        link: "/admin/event/history/status",
        detailPattern: "/admin/event/*/history",
      },
    ],
  },
  {
    label: "Voting",
    icon: "accessibility-outline",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/voting",
      },
      { 
        label: "Publish", 
        link: "/admin/voting/publish/status",
        detailPattern: "/admin/voting/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/voting/review/status",
        detailPattern: "/admin/voting/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/voting/reject/status",
        detailPattern: "/admin/voting/*/reject",
      },
      { 
        label: "Riwayat", 
        link: "/admin/voting/history",
        detailPattern: "/admin/voting/*/history",
      },
    ],
  },
  {
    label: "Job",
    icon: "desktop-outline",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/job",
      },
      { 
        label: "Publish", 
        link: "/admin/job/publish/status",
        detailPattern: "/admin/job/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/job/review/status",
        detailPattern: "/admin/job/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/job/reject/status",
        detailPattern: "/admin/job/*/reject",
      },
    ],
  },
  {
    label: "Forum",
    icon: "chatbubble-ellipses-outline",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/forum",
      },
      { 
        label: "Posting", 
        link: "/admin/forum/posting",
      },
      { 
        label: "Report Posting", 
        link: "/admin/forum/report-posting",
      },
      { 
        label: "Report Komentar", 
        link: "/admin/forum/report-comment",
      },
    ],
  },
  {
    label: "Collaboration",
    icon: "people",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/collaboration",
      },
      { 
        label: "Publish", 
        link: "/admin/collaboration/publish",
      },
      { 
        label: "Group", 
        link: "/admin/collaboration/group",
      },
      { 
        label: "Reject", 
        link: "/admin/collaboration/reject",
      },
    ],
  },
  { 
    label: "Maps", 
    icon: "map", 
    link: "/admin/maps",
  },
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

const superAdminListMenu_V2: NavbarItem_V2[] = [
  {
    label: "Main Dashboard",
    icon: "home",
    link: "/admin/dashboard",
  },
  {
    label: "Investasi",
    icon: "wallet",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/investment",
      },
      { 
        label: "Publish", 
        link: "/admin/investment/publish/status",
        detailPattern: "/admin/investment/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/investment/review/status",
        detailPattern: "/admin/investment/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/investment/reject/status",
        detailPattern: "/admin/investment/*/reject",
      },
    ],
  },
  {
    label: "Donasi",
    icon: "hand-right",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/donation",
      },
      { 
        label: "Publish", 
        link: "/admin/donation/publish/status",
        detailPattern: "/admin/donation/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/donation/review/status",
        detailPattern: "/admin/donation/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/donation/reject/status",
        detailPattern: "/admin/donation/*/reject",
      },
      { 
        label: "Kategori", 
        link: "/admin/donation/category",
      },
    ],
  },
  {
    label: "Event",
    icon: "calendar-clear",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/event",
      },
      { 
        label: "Publish", 
        link: "/admin/event/publish/status",
        detailPattern: "/admin/event/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/event/review/status",
        detailPattern: "/admin/event/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/event/reject/status",
        detailPattern: "/admin/event/*/reject",
      },
      { 
        label: "Tipe Acara", 
        link: "/admin/event/type-of-event",
      },
      { 
        label: "Riwayat", 
        link: "/admin/event/history/status",
        detailPattern: "/admin/event/*/history",
      },
    ],
  },
  {
    label: "Voting",
    icon: "accessibility-outline",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/voting",
      },
      { 
        label: "Publish", 
        link: "/admin/voting/publish/status",
        detailPattern: "/admin/voting/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/voting/review/status",
        detailPattern: "/admin/voting/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/voting/reject/status",
        detailPattern: "/admin/voting/*/reject",
      },
      { 
        label: "Riwayat", 
        link: "/admin/voting/history",
        detailPattern: "/admin/voting/*/history",
      },
    ],
  },
  {
    label: "Job",
    icon: "desktop-outline",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/job",
      },
      { 
        label: "Publish", 
        link: "/admin/job/publish/status",
        detailPattern: "/admin/job/*/publish",
      },
      { 
        label: "Review", 
        link: "/admin/job/review/status",
        detailPattern: "/admin/job/*/review",
      },
      { 
        label: "Reject", 
        link: "/admin/job/reject/status",
        detailPattern: "/admin/job/*/reject",
      },
    ],
  },
  {
    label: "Forum",
    icon: "chatbubble-ellipses-outline",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/forum",
      },
      { 
        label: "Posting", 
        link: "/admin/forum/posting",
      },
      { 
        label: "Report Posting", 
        link: "/admin/forum/report-posting",
      },
      { 
        label: "Report Komentar", 
        link: "/admin/forum/report-comment",
      },
    ],
  },
  {
    label: "Collaboration",
    icon: "people",
    links: [
      { 
        label: "Dashboard", 
        link: "/admin/collaboration",
      },
      { 
        label: "Publish", 
        link: "/admin/collaboration/publish",
      },
      { 
        label: "Group", 
        link: "/admin/collaboration/group",
      },
      { 
        label: "Reject", 
        link: "/admin/collaboration/reject",
      },
    ],
  },
  { 
    label: "Maps", 
    icon: "map", 
    link: "/admin/maps",
  },
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

/* 
=================================================================================
PENJELASAN detailPattern:
=================================================================================

detailPattern digunakan untuk match dengan URL detail page yang strukturnya:
/admin/{module}/[id]/[status]

Contoh untuk Job Review:
- Link: /admin/job/review/status (halaman list review)
- detailPattern: /admin/job/* /review (detail dari review)
- Match dengan: /admin/job/123/review, /admin/job/456/review, dll

Wildcard "*" akan match dengan ID apapun (angka, UUID, alphanumeric).

Modul yang PERLU detailPattern:
✅ Investasi - Publish, Review, Reject (ada [id]/[status])
✅ Donasi - Publish, Review, Reject (ada [id]/[status])
✅ Event - Publish, Review, Reject, Riwayat (ada [id]/[status])
✅ Voting - Publish, Review, Reject, Riwayat (ada [id]/[status])
✅ Job - Publish, Review, Reject (ada [id]/[status])

Modul yang TIDAK PERLU detailPattern:
❌ Forum - posting, report-posting, report-comment (struktur berbeda)
❌ Collaboration - struktur berbeda
❌ Maps, App Information, User Access - single page
❌ Dashboard submenu - auto-match dengan parent path

=================================================================================
*/