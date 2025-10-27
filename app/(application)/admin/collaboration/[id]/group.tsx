/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
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
          <BaseBox>
            <StackCustom>
              <TextCustom align="center">Anggota</TextCustom>

              {data?.ProjectCollaboration_AnggotaRoomChat?.map(
                (item: any, index: number) => (
                  <StackCustom key={index} gap={0}>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ justifyContent: "center", paddingRight: 10 }}
                      >
                        <TextCustom bold>Nama</TextCustom>
                      </Grid.Col>
                      <Grid.Col span={8} style={{ justifyContent: "center" }}>
                        <TextCustom>
                          {item?.User?.Profile?.name || "-"}
                        </TextCustom>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ justifyContent: "center", paddingRight: 10 }}
                      >
                        <TextCustom bold>Username</TextCustom>
                      </Grid.Col>
                      <Grid.Col span={8} style={{ justifyContent: "center" }}>
                        <TextCustom>{item?.User?.username || "-"}</TextCustom>
                      </Grid.Col>
                    </Grid>
                  </StackCustom>
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
