/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  DummyLandscapeImage,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { MainColor } from "@/constants/color-palet";
import funUpdateStatusJob from "@/screens/Admin/Job/funUpdateStatus";
import { apiAdminJobGetById } from "@/service/api-admin/api-admin-job";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminJobDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminJobGetById({
        id: id as string,
      });

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
    }
  };

  const listData = [
    {
      label: "Username",
      value: data?.Author?.username || "-",
    },
    {
      label: "Judul",
      value: data?.title || "-",
    },
    {
      label: "Status",
      value: (
        <BadgeCustom color={colorBadge()}>
          {_.startCase(status as string)}
        </BadgeCustom>
      ),
    },
    {
      label: "Konten",
      value: data?.content || "-",
    },
    {
      label: "Deskripsi",
      value: data?.deskripsi || "-",
    },
  ];

  const handleUpdate = async ({
    changeStatus,
  }: {
    changeStatus: "publish" | "review" | "reject";
  }) => {
    try {
      const response = await funUpdateStatusJob({
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
    }
  };

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail Data`} />}
      >
        <BaseBox>
          <StackCustom>
            {listData?.map((item, index) => (
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

            {data && data?.imageId && (
              <StackCustom>
                <TextCustom bold>Poster</TextCustom>
                <DummyLandscapeImage imageId={data?.imageId} />
              </StackCustom>
            )}
          </StackCustom>
        </BaseBox>

        {data && data?.catatan && (
          <BaseBox>
            <StackCustom>
              <TextCustom bold>Catatan report</TextCustom>
              <TextCustom>{data?.catatan}</TextCustom>
            </StackCustom>
          </BaseBox>
        )}

        {status === "review" && (
          <AdminButtonReview
            onPublish={() => {
              AlertDefaultSystem({
                title: "Publish",
                message: "Apakah anda yakin ingin mempublikasikan data ini?",
                textLeft: "Batal",
                textRight: "Ya",
                onPressRight: () => {
                  handleUpdate({ changeStatus: "publish" });
                },
              });
            }}
            onReject={() => {
              router.push(`/admin/job/${id}/${status}/reject-input`);
            }}
          />
        )}

        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/job/${id}/${status}/reject-input`);
            }}
          />
        )}
        <Spacing />
      </ViewWrapper>
    </>
  );
}
