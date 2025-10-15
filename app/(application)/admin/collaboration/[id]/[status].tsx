/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import { apiAdminCollaborationGetById } from "@/service/api-admin/api-admin-collaboration";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminCollaborationPublish() {
  const { id, status } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      handlerLoadData();
    }, [status])
  );

  const handlerLoadData = async () => {
    try {
      const response = await apiAdminCollaborationGetById({
        id: id as string,
        category: status as "publish" | "reject" | "group",
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const bottomFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        backgroundColor={MainColor.red}
        textColor="white"
        onPress={() => {
          router.push(`/admin/collaboration/${id}/reject-input`);
        }}
      >
        Reject
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail`} />}
        footerComponent={bottomFooter}
      >
        <BaseBox>
          <StackCustom>
            {listData(data)?.map((item, i) => (
              <Grid key={i}>
                <Grid.Col
                  span={4}
                  style={{ justifyContent: "center", paddingRight: 10 }}
                >
                  <TextCustom bold>{item.label}</TextCustom>
                </Grid.Col>
                <Grid.Col span={8} style={{ justifyContent: "center" }}>
                  <TextCustom>{item.value}</TextCustom>
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
        </BaseBox>
      </ViewWrapper>
    </>
  );
}

const listData = (data: any) => [
  {
    label: "Username",
    value: (data && data?.Author?.username) || "-",
  },
  {
    label: "Judul Proyek",
    value: (data && data?.title) || "-",
  },
  {
    label: "Industri",
    value: (data && data?.ProjectCollaborationMaster_Industri?.name) || "-",
  },
  {
    label: "Jumlah Partisipan ",
    value: (data && data?.ProjectCollaboration_Partisipasi.length) || "0",
  },
  {
    label: "Lokasi",
    value: (data && data?.lokasi) || "-",
  },
  {
    label: "Tujuan Proyek",
    value: (data && data?.purpose) || "-",
  },
  {
    label: "Keuntungan",
    value: (data && data?.benefit) || "-",
  },
];
