import { StackCustom, TextCustom, ViewWrapper } from "@/components";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import { MainColor } from "@/constants/color-palet";
import { apiAdminMainDashboardGetAll } from "@/service/api-admin/api-admin-main-dashboard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [countUser, setCountUser] = useState(0);
  const [countPortofolio, setCountPortofolio] = useState(0);

  useEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = async () => {
    try {
      const response = await apiAdminMainDashboardGetAll();

      if (response.success) {
        setCountUser(response.data.user);
        setCountPortofolio(response.data.portofolio);
      }
    } catch (error) {
      console.log("[ERROR LOAD DATA]", error);
    }
  };

  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <TextCustom bold size={30}>
            Main Dashboard
          </TextCustom>
          {listData(countUser, countPortofolio).map((item, i) => (
            <AdminComp_BoxDashboard key={i} item={item} />
          ))}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

const listData = (countUser: number, countPortofolio: number) => [
  {
    label: "User",
    value: countUser,
    icon: <Ionicons name="people" size={30} color={MainColor.yellow} />,
  },
  {
    label: "Portofolio",
    value: countPortofolio,
    icon: (
      <Ionicons name="id-card-outline" size={30} color={MainColor.yellow} />
    ),
  },
];
