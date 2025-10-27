import { StackCustom, ViewWrapper } from "@/components";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { MainColor } from "@/constants/color-palet";
import { apiAdminCollaboration } from "@/service/api-admin/api-admin-collaboration";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminCollaboration() {
  const [list, setList] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      handlerLoadList();
    }, [])
  );

  const handlerLoadList = async () => {
    try {
      const response = await apiAdminCollaboration({
        category: "dashboard",
      });

      if (response.success) {
        setList(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Collaboration" />}>
        <StackCustom gap={"xs"}>
          {listData(list as any).map((item, i) => (
            <AdminComp_BoxDashboard key={i} item={item} />
          ))}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

const listData = (list: any) => {
  return [
    {
      label: "Publish",
      value: (list && list?.publish) || "0",
      icon: <Entypo name="publish" size={25} color={MainColor.green} />,
    },
    {
      label: "Group",
      value: (list && list?.group) || "0",
      icon: <FontAwesome name="group" size={25} color={MainColor.yellow} />,
    },
    {
      label: "Reject",
      value: (list && list?.reject) || "0",
      icon: <FontAwesome name="warning" size={25} color={MainColor.red} />,
    },
  ];
};
