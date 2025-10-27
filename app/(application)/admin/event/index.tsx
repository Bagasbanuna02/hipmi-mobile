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
import { apiAdminEvent } from "@/service/api-admin/api-admin-event";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminVoting() {
  const [data, setData] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminEvent({
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
      label: "Publish",
      value: (data && data.publish) || 0,
      icon: <IconPublish size={25} color={MainColor.green} />,
    },
    {
      label: "Review",
      value: (data && data.review) || 0,
      icon: <IconReview size={25} color={MainColor.orange} />,
    },
    {
      label: "Reject",
      value: (data && data.reject) || 0,
      icon: <IconReject size={25} color={MainColor.red} />,
    },
    {
      label: "Riwayat",
      value: (data && data.history) || 0,
      icon: <IconArchive size={25} color={MainColor.placeholder} />,
    },
    {
      label: "Tipe Acara",
      value: (data && data.typeOfEvent) || 0,
      icon: <IconList size={25} color={MainColor.placeholder} />,
    },
  ];

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
