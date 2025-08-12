import { Spacing, StackCustom, ViewWrapper } from "@/components";
import { IconArchive } from "@/components/_Icon";
import {
  IconList,
  IconPublish,
  IconReject,
  IconReview,
} from "@/components/_Icon/IconComponent";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { MainColor } from "@/constants/color-palet";

export default function AdminVoting() {
  return (
    <>
      <ViewWrapper>
        <AdminTitlePage title="Event" />
        <Spacing />
        <StackCustom gap={"xs"}>
          {listData.map((item, i) => (
            <AdminComp_BoxDashboard key={i} item={item} />
          ))}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

const listData = [
  {
    label: "Publish",
    value: 3,
    icon: <IconPublish size={25} color={MainColor.green} />,
  },
  {
    label: "Review",
    value: 8,
    icon: <IconReview size={25} color={MainColor.orange} />,
  },
  {
    label: "Reject",
    value: 4,
    icon: <IconReject size={25} color={MainColor.red} />,
  },
  {
    label: "Riwayat",
    value: 6,
    icon: <IconArchive size={25} color={MainColor.placeholder} />,
  },
  {
    label: "Tipe Acara",
    value: 7,
    icon: <IconList size={25} color={MainColor.placeholder} />,
  },
];
