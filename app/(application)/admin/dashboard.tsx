import {
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import { MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";

export default function AdminDashboard() {
  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <TextCustom bold size={30}>
            Main Dashboard
          </TextCustom>
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
    label: "User",
    value: 4,
    icon: <Ionicons name="people" size={30} color={MainColor.yellow} />,
  },
  {
    label: "Portofolio",
    value: 7,
    icon: (
      <Ionicons name="id-card-outline" size={30} color={MainColor.yellow} />
    ),
  },
];
