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
import { apiAdminDonation } from "@/service/api-admin/api-admin-donation";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";

export default function AdminDonation() {
  const [data, setData] = useState<any | null>(null);
  const [loadData, setLoadData] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminDonation({
        category: "dashboard",
      });

      console.log("[RES]", JSON.stringify(response, null, 2));

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setData([]);
    } finally {
      setLoadData(false);
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
      label: "Kategori",
      value: (data && data.categoryDonation) || 0,
      icon: <IconList size={25} color={MainColor.white_gray} />,
    },
  ];

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
