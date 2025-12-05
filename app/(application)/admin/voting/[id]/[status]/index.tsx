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
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import ReportBox from "@/components/Box/ReportBox";
import { MainColor } from "@/constants/color-palet";
import funUpdateStatusVoting from "@/screens/Admin/Voting/funUpdateStatus";
import { apiAdminVotingById } from "@/service/api-admin/api-admin-voting";
import { colorBadgeStatus } from "@/utils/colorBadge";
import { dateTimeView } from "@/utils/dateTimeView";
import { Entypo } from "@expo/vector-icons";
import dayjs from "dayjs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { List } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminVotingDetail() {
  const { id, status } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("[status]", status);

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

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
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
          <BadgeCustom color={colorBadgeStatus({ status: status as string })}>
            {status === "history" ? "Riwayat" : _.startCase(status as string)}
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

  const handleUpdate = async ({
    changeStatus,
  }: {
    changeStatus: "publish" | "review" | "reject";
  }) => {
    try {
      const dateNow = new Date();
      // const dateNowHour = dateNow.getHours();
      // const awalVoteHour = dayjs(data?.awalVote).hour();

      const isBefore = dayjs(dateNow).diff(dayjs(data?.awalVote), "hours") < 0;
      console.log("[IS BEFORE]", isBefore);

      if (!isBefore) {
        Toast.show({
          type: "error",
          text1: "Tanggal & waktu telah lewat",
          text2: "Silahkan report dan ubah tanggal & waktu voting",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Berhasil mempublikasikan data",
      });

      setIsLoading(true);
      const response = await funUpdateStatusVoting({
        id: id as string,
        changeStatus,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mempublikasikan data",
        });
      }

      Toast.show({
        type: "success",
        text1: "Berhasil mempublikasikan data",
      });

      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail Data`} />}
      >
        <BaseBox>
          <StackCustom>
            {listData.map((item, i) => (
              <GridSpan_4_8
                key={i}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>

        {status === "publish" ||
          (status === "history" && (
            <BaseBox>
              <TextCustom bold align="center">
                Hasil Voting
              </TextCustom>
              <Spacing />
              <Grid>
                {data?.Voting_DaftarNamaVote?.map(
                  (item: any, index: number) => (
                    <Grid.Col
                      key={index}
                      span={12 / data?.Voting_DaftarNamaVote?.length}
                      style={{ paddingRight: 3, paddingLeft: 3 }}
                    >
                      <StackCustom gap={"sm"}>
                        <CircleContainer
                          value={item?.jumlah}
                          style={{ alignSelf: "center" }}
                        />
                        <TextCustom size="small" align="center">
                          {item?.value}
                        </TextCustom>
                      </StackCustom>
                    </Grid.Col>
                  )
                )}
              </Grid>
            </BaseBox>
          ))}

        {data &&
          data?.catatan &&
          (status === "review" || status === "reject") && (
            <ReportBox text={data?.catatan} />
          )}

        {status === "review" && (
          <AdminButtonReview
            isLoading={isLoading}
            onPublish={() => {
              AlertDefaultSystem({
                title: "Publish",
                message: "Apakah anda yakin ingin mempublikasikan data ini?",
                textLeft: "Cancel",
                textRight: "Publish",
                onPressRight: () => {
                  handleUpdate({ changeStatus: "publish" });
                },
              });
            }}
            onReject={() => {
              router.push(`/admin/voting/${id}/${status}/reject-input`);
            }}
          />
        )}

        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/voting/${id}/${status}/reject-input`);
            }}
          />
        )}
        <Spacing />
      </ViewWrapper>
    </>
  );
}
