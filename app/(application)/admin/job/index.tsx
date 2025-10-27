/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spacing, StackCustom, ViewWrapper } from "@/components";
import {
  IconPublish,
  IconReject,
  IconReview,
} from "@/components/_Icon/IconComponent";
import AdminComp_BoxDashboard from "@/components/_ShareComponent/Admin/BoxDashboard";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { MainColor } from "@/constants/color-palet";
import { apiAdminJob } from "@/service/api-admin/api-admin-job";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminJob() {
  const [data, setData] = useState<any | null>(null);
  const [loadList, setLoadList] = useState(false);


  useFocusEffect(
    useCallback(() => {
      handlerLoadList();
    }, [])
  );

  const handlerLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiAdminJob({
        category: "dashboard",
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <>
      <ViewWrapper>
        <AdminTitlePage title="Job Vacancy" />
        <Spacing />
        <StackCustom gap={"xs"}>
          {listData(data).map((item: any, i: number) => (
            <AdminComp_BoxDashboard key={i} item={item} />
          ))}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

const listData = (data: any) => [
  {
    label: "Publish",
    value: (data && data?.publish) || 0,
    icon: <IconPublish size={25} color={MainColor.green} />,
  },
  {
    label: "Review",
    value: (data && data?.review) || 0,
    icon: <IconReview size={25} color={MainColor.orange} />,
  },
  {
    label: "Reject",
    value: (data && data?.reject) || 0,
    icon: <IconReject size={25} color={MainColor.red} />,
  },
];
