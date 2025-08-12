import { Spacing, StackCustom, ViewWrapper } from "@/components";
import {
    IconList,
    IconPublish,
    IconReject,
    IconReview,
} from "@/components/_Icon/IconComponent";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { MainColor } from "@/constants/color-palet";

export default function AdminDonation() {
  return (
    <>
      <ViewWrapper>
        <AdminTitlePage title="Donasi" />
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
    value: 4,
    icon: <IconPublish size={25} color={MainColor.green} />,
  },
  {
    label: "Review",
    value: 7,
    icon: <IconReview size={25} color={MainColor.orange} />,
  },
  {
    label: "Reject",
    value: 5,
    icon: <IconReject size={25} color={MainColor.red} />,
  },
  {
    label: "Kategori",
    value: 4,
    icon: <IconList size={25} color={MainColor.white_gray} />,
  },
];
