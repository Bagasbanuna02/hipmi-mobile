import { Spacing, StackCustom, ViewWrapper } from "@/components";
import { IconPublish, IconReport } from "@/components/_Icon/IconComponent";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { MainColor } from "@/constants/color-palet";
import { apiAdminForum } from "@/service/api-admin/api-admin-forum";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminForum() {
  const [data, setData] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      handlerLoadList();
    }, [])
  );

  const handlerLoadList = async () => {
    try {
      const response = await apiAdminForum({
        category: "dashboard",
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const listData = [
    {
      label: "Posting",
      value: data?.posting || 0,
      icon: <IconPublish size={25} color={MainColor.green} />,
    },
    {
      label: "Report Posting",
      value: data?.reportPosting || 0,
      icon: <IconReport size={25} color={MainColor.orange} />,
    },
    {
      label: "Report Comment",
      value: data?.reportComment || 0,
      icon: <IconReport size={25} color={MainColor.red} />,
    },
  ];

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
