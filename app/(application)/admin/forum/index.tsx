import { Spacing, StackCustom, ViewWrapper } from "@/components";
import {
    IconPublish,
    IconReport,
} from "@/components/_Icon/IconComponent";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { MainColor } from "@/constants/color-palet";

export default function AdminForum() {
  return (
    <>
      <ViewWrapper>
        <AdminTitlePage title="Forum" />
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
    label: "Posting",
    value: 4,
    icon: <IconPublish size={25} color={MainColor.green} />,
  },
  {
    label: "Report Posting",
    value: 7,
    icon: <IconReport size={25} color={MainColor.orange} />,
  },
  {
    label: "Report Comment",
    value: 5,
    icon: <IconReport size={25} color={MainColor.red} />,
  },
];
