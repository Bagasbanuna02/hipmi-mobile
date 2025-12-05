/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  ButtonCustom,
  DrawerCustom,
  DummyLandscapeImage,
  MenuDrawerDynamicGrid,
  ProgressCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconDot, IconList } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import ReportBox from "@/components/Box/ReportBox";
import { ICON_SIZE_BUTTON, TEXT_SIZE_LARGE } from "@/constants/constans-value";
import AdminDonation_BoxOfDonationStory from "@/screens/Admin/Donation/BoxOfDonationStory";
import { funUpdateStatusDonation } from "@/screens/Admin/Donation/funDonationUpdateStatus";
import { apiAdminDonationDetailById } from "@/service/api-admin/api-admin-donation";
import { colorBadgeStatus } from "@/utils/colorBadge";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function AdminDonationDetail() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [data, setData] = React.useState<any | null>(null);
  const [countDonatur, setCountDonatur] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminDonationDetailById({
        id: id as string,
      });

      if (response.success) {
        setData(response.data.donasi);
        setCountDonatur(response.data.donatur);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setData(null);
    }
  };

  const listData = [
    {
      label: "Penggalang Dana",
      value: (data && data?.Author?.username) || "-",
    },
    {
      label: "Judul",
      value: (data && data?.title) || "-",
    },
    {
      label: "Status",
      value:
        data && data?.DonasiMaster_Status?.name ? (
          <BadgeCustom
            color={colorBadgeStatus({
              status: data?.DonasiMaster_Status?.name,
            })}
          >
            {_.startCase(data?.DonasiMaster_Status?.name)}
          </BadgeCustom>
        ) : (
          "-"
        ),
    },
    {
      label: "Durasi",
      value: (data && data?.DonasiMaster_Durasi?.name) + " hari" || "-",
    },
    {
      label: "Target Dana",
      value:
        data && data?.target
          ? `Rp. ${formatCurrencyDisplay(data?.target)}`
          : "-",
    },
    {
      label: "Kategori",
      value: (data && data?.DonasiMaster_Ketegori?.name) || "-",
    },
  ];

  const listPencarianDana = [
    {
      label: "Total Dana Dicairkan",
      value: `Rp ${(data && formatCurrencyDisplay(data?.totalPencairan)) || 0}`,
    },
    {
      label: "Sisa Dana Masuk",
      value: `Rp ${
        (data &&
          formatCurrencyDisplay(data?.terkumpul - data?.totalPencairan)) ||
        0
      }`,
    },
    {
      label: "Akumulasi Pencairan",
      value: `${(data && data?.akumulasiPencairan) || 0} kali`,
    },
    {
      label: "Bank Tujuan",
      value: (data && data?.namaBank) || "-",
    },
    {
      label: "Nomor Rekening",
      value: (data && data?.rekening) || "-",
    },
  ];

  const handleReport = async ({
    changeStatus,
  }: {
    changeStatus: "publish" | "review" | "reject";
  }) => {
    try {
      setIsLoading(true);
      const response = await funUpdateStatusDonation({
        id: id as string,
        changeStatus,
        data: data,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Update status gagal",
        });

        return;
      }

      Toast.show({
        type: "success",
        text1: "Update status berhasil",
      });

      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const rightComponent = (
    <ActionIcon
      icon={<IconDot size={ICON_SIZE_BUTTON} />}
      onPress={() => {
        setOpenDrawer(true);
      }}
    />
  );

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title={`Detail Data`}
            rightComponent={status === "publish" && rightComponent}
          />
        }
      >
        {status === "publish" && (
          <View>
            <BaseBox>
              <StackCustom>
                <TextCustom bold align="center" size={TEXT_SIZE_LARGE}>
                  Pencarian Dana
                </TextCustom>

                <StackCustom gap={5}>
                  {listPencarianDana.map((item, i) => (
                    <GridSpan_4_8
                      key={i}
                      label={<TextCustom bold>{item.label}</TextCustom>}
                      value={<TextCustom>{item.value}</TextCustom>}
                    />
                  ))}
                </StackCustom>

                <ButtonCustom
                  iconLeft={
                    <Ionicons name="cash-outline" size={ICON_SIZE_BUTTON} />
                  }
                  disabled={data?.terkumpul - data?.totalPencairan <= 0}
                  onPress={() => {
                    if (data?.terkumpul - data?.totalPencairan <= 0) {
                      Toast.show({
                        type: "error",
                        text1: "Tidak ada dana yang tersisa",
                      });
                      return;
                    }
                    router.push(`/admin/donation/${id}/disbursement-of-funds`);
                  }}
                >
                  Cairkan Dana
                </ButtonCustom>
              </StackCustom>
            </BaseBox>

            <BaseBox>
              <ProgressCustom
                size="lg"
                value={Number(data?.progres) || 0}
                showLabel={true}
                label={data?.progres + "%"}
                animated
                color="primary"
              />
              <Spacing />

              <StackCustom gap={"xs"}>
                <GridSpan_4_8
                  label={<TextCustom bold>Jumlah Donatur</TextCustom>}
                  value={
                    <TextCustom>
                      {countDonatur ? countDonatur : 0} orang
                    </TextCustom>
                  }
                />
                <GridSpan_4_8
                  label={<TextCustom bold>Dana Terkumpul</TextCustom>}
                  value={
                    <TextCustom>
                      Rp {formatCurrencyDisplay(data?.terkumpul || 0)}
                    </TextCustom>
                  }
                />
              </StackCustom>
            </BaseBox>
          </View>
        )}

        <BaseBox>
          <StackCustom>
            <DummyLandscapeImage imageId={data?.imageId || ""} />
            {listData.map((item, i) => (
              <GridSpan_4_8
                key={i}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>

        <AdminDonation_BoxOfDonationStory data={data?.CeritaDonasi as any} />

        {data &&
          data?.catatan &&
          (status === "review" || status === "reject") && (
            <ReportBox text={data?.catatan} />
          )}

        {status === "review" && (
          <StackCustom>
            <AdminButtonReview
              isLoading={isLoading}
              onPublish={() => {
                AlertDefaultSystem({
                  title: "Publish",
                  message: "Apakah anda yakin ingin mempublikasikan data ini?",
                  textLeft: "Batal",
                  textRight: "Ya",
                  onPressRight: () => {
                    handleReport({ changeStatus: "publish" });
                  },
                });
              }}
              onReject={() => {
                router.push(
                  `/admin/donation/${id}/reject-input?status=${status}`
                );
              }}
            />
          </StackCustom>
        )}

        {status === "reject" && (
          <StackCustom>
            <AdminButtonReject
              title="Tambah Catatan"
              onReject={() => {
                router.push(
                  `/admin/donation/${id}/reject-input?status=${status}`
                );
              }}
            />
          </StackCustom>
        )}
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Daftar Donatur",
              icon: <IconList />,
              path: `/admin/donation/${id}/list-of-donatur`,
            },
            {
              label: "Daftar Pencarian Dana",
              icon: <IconList />,
              path: `/admin/donation/${id}/list-disbursement-of-funds`,
            },
          ]}
          onPressItem={(item) => {
            setOpenDrawer(false);
            router.push(item.path as any);
          }}
        />
      </DrawerCustom>
    </>
  );
}
