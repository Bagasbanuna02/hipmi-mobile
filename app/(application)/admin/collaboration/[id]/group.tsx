/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { apiAdminCollaborationGetById } from "@/service/api-admin/api-admin-collaboration";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminCollaborationGroup() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminCollaborationGetById({
        id: id as string,
        category: "group",
      });

      console.log("[DATA]", JSON.stringify(response.data, null, 2));

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail Group`} />}
      >
        <StackCustom gap={"xs"}>
          <BaseBox>
            <StackCustom>
              {listData(data).map((item: any, index: number) => (
                <Grid key={index}>
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

          <TextCustom bold>Anggota</TextCustom>
          <Spacing height={5}/>
          <BaseBox>
            <StackCustom>

              <Grid>
                <Grid.Col span={6} style={{ justifyContent: "center", paddingRight: 10 }}>
                  <TextCustom bold>Nomor</TextCustom>
                </Grid.Col>
                <Grid.Col span={6} style={{ justifyContent: "center" }}>
                  <TextCustom bold>Username</TextCustom>
                </Grid.Col>
              </Grid>

              {data?.ProjectCollaboration_AnggotaRoomChat?.map(
                (item: any, index: number) => (
                  <Grid key={index}>
                    <Grid.Col span={6} style={{ justifyContent: "center", paddingRight: 10 }}>
                      <TextCustom bold truncate>+{item?.User?.nomor || "-"}</TextCustom>
                    </Grid.Col>
                    <Grid.Col span={6} style={{ justifyContent: "center" }}>
                      <TextCustom bold>
                        {item?.User?.username || "-"}
                      </TextCustom>
                    </Grid.Col>
                  </Grid>
                )
              )}
            </StackCustom>
          </BaseBox>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

const listData = (data: any) => [
  {
    label: "Admin Group",
    value: data?.ProjectCollaboration?.Author?.username || "-",
  },
  {
    label: "Nama Group",
    value: data?.name || "-",
  },
  {
    label: "Industri",
    value:
      data?.ProjectCollaboration?.ProjectCollaborationMaster_Industri?.name ||
      "-",
  },
  {
    label: "Jumlah Partisipan ",
    value: data?.ProjectCollaboration_AnggotaRoomChat?.length || "-",
  },
  {
    label: "Lokasi",
    value: data?.ProjectCollaboration?.lokasi || "-",
  },
  {
    label: "Tujuan Proyek",
    value: data?.ProjectCollaboration?.purpose || "-",
  },
  {
    label: "Keuntungan",
    value: data?.ProjectCollaboration?.benefit || "-",
  },
];
