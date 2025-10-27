/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  BaseBox,
  Grid,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { apiAdminEventListOfParticipants } from "@/service/api-admin/api-admin-event";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function AdminEventListOfParticipants() {
  const { id } = useLocalSearchParams();
  const [listData, setListData] = useState<any[] | null>(null);
  const [loadData, setLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminEventListOfParticipants({
        id: id as string,
      });

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadData(false);
    }
  };


  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Daftar Peserta" />}
      >
        {loadData ? (
          <LoaderCustom />
        ) : _.isEmpty(listData) ? (
          <TextCustom align="center" color="gray">
            Belum ada peserta
          </TextCustom>
        ) : (
          listData?.map((item: any, index: number) => (
            <BaseBox key={index}>
              <Grid>
                <Grid.Col span={6}>
                  <StackCustom gap={"sm"}>
                    <TextCustom bold truncate>{item?.User?.username}</TextCustom>
                    <TextCustom>+{item?.User?.nomor}</TextCustom>
                  </StackCustom>
                </Grid.Col>
                <Grid.Col span={6} style={{ justifyContent: "center" }}>
                  <BadgeCustom
                    style={{ alignSelf: "flex-end" }}
                    color={item?.isPresent ? "green" : "red"}
                  >
                    {item?.isPresent ? "Hadir" : "Tidak Hadir"}
                  </BadgeCustom>
                </Grid.Col>
              </Grid>
            </BaseBox>
          ))
        )}
      </ViewWrapper>
    </>
  );
}
