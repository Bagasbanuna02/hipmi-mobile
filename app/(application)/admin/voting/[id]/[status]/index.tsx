/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  CircleContainer,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import { apiAdminVotingById } from "@/service/api-admin/api-admin-voting";
import { dateTimeView } from "@/utils/dateTimeView";
import { Entypo } from "@expo/vector-icons";
import dayjs from "dayjs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { List } from "react-native-paper";

export default function AdminVotingDetail() {
  const { id, status } = useLocalSearchParams();

  const [data, setData] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminVotingById({
        id: id as string,
      });

      console.log("[DATA BY ID]", JSON.stringify(response, null, 2));

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const colorBadge = () => {
    if (status === "publish") {
      return MainColor.green;
    } else if (status === "review") {
      return MainColor.orange;
    } else if (status === "reject") {
      return MainColor.red;
    } else {
      return MainColor.placeholder;
    }
  };

  const listData = [
    {
      label: "Username",
      value: (data && data?.Author?.username) || "-",
    },
    {
      label: "Judul",
      value: (data && data?.title) || "-",
    },
    {
      label: "Status",
      value:
        data && data?.Voting_Status?.name ? (
          <BadgeCustom color={colorBadge()}>
            {_.startCase(data?.Voting_Status?.name)}
          </BadgeCustom>
        ) : (
          "-"
        ),
    },
    {
      label: "Mulai Voting",
      value:
        (data && data?.awalVote && dateTimeView({ date: data?.awalVote })) ||
        "-",
    },
    {
      label: "Voting Berakhir",
      value:
        (data && data?.akhirVote && dateTimeView({ date: data?.akhirVote })) ||
        "-",
    },
    {
      label: "Deskripsi",
      value: (data && data?.deskripsi) || "-",
    },
    {
      label: "Daftar Pilihan",
      value:
        data && data?.Voting_DaftarNamaVote
          ? data?.Voting_DaftarNamaVote?.map((item: any, i: number) => (
              <List.Item
                key={i}
                title={<TextCustom>{item?.value}</TextCustom>}
                left={(props) => (
                  <Entypo name="chevron-right" color={MainColor.yellow} />
                )}
              />
            ))
          : "-",
    },
  ];

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail Data`} />}
      >
        <BaseBox>
          <StackCustom>
            {listData.map((item, i) => (
              <GridDetail_4_8
                key={i}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>

        {status === "publish" && (
          <BaseBox>
            <TextCustom bold align="center">
              Hasil Voting
            </TextCustom>
            <Spacing />
            <Grid>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid.Col
                  key={index}
                  span={3}
                  style={{ paddingRight: 3, paddingLeft: 3 }}
                >
                  <StackCustom gap={"sm"}>
                    <CircleContainer
                      value={(index % 3) * 3}
                      style={{ alignSelf: "center" }}
                    />
                    <TextCustom size="small" align="center">
                      Pilihan {index + 1}
                    </TextCustom>
                  </StackCustom>
                </Grid.Col>
              ))}
            </Grid>
          </BaseBox>
        )}

        {status === "review" && (
          <AdminButtonReview
            onPublish={() => {
              AlertDefaultSystem({
                title: "Publish",
                message: "Apakah anda yakin ingin mempublikasikan data ini?",
                textLeft: "Cancel",
                textRight: "Publish",
                onPressLeft: () => {
                  router.back();
                },
                onPressRight: () => {
                  router.back();
                },
              });
            }}
            onReject={() => {
              router.push(`/admin/voting/${id}/reject-input`);
            }}
          />
        )}

        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/voting/${id}/reject-input`);
            }}
          />
        )}
        <Spacing />
      </ViewWrapper>
    </>
  );
}
