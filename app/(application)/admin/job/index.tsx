import { Spacing, StackCustom, ViewWrapper } from "@/components";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { MainColor } from "@/constants/color-palet";
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

export default function AdminJob() {
  return (
    <>
      <ViewWrapper>
        <AdminTitlePage title="Job Vacancy" />
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
    icon: <Entypo name="publish" size={25} color={MainColor.green} />,
  },
  {
    label: "Review",
    value: 7,
    icon: (
      <FontAwesome6
        name="person-circle-check"
        size={25}
        color={MainColor.orange}
      />
    ),
  },
  {
    label: "Reject",
    value: 5,
    icon: <FontAwesome name="warning" size={25} color={MainColor.red} />,
  },
];
