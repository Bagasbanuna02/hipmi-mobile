import { StackCustom, ViewWrapper } from "@/components";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { MainColor } from "@/constants/color-palet";
import { Entypo, FontAwesome } from "@expo/vector-icons";

export default function AdminCollaboration() {
  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Collaboration" />}>
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
    icon: <Entypo name="publish" size={25} color={MainColor.green} />,
  },
  {
    label: "Group",
    value: 7,
    icon: <FontAwesome name="group" size={25} color={MainColor.yellow} />,
  },
  {
    label: "Reject",
    value: 7,
    icon: <FontAwesome name="warning" size={25} color={MainColor.red} />,
  },
];
