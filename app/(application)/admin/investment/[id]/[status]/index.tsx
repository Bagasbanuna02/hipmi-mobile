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
} from "@/components";
import { IconProspectus } from "@/components/_Icon";
import { IconDot, IconList } from "@/components/_Icon/IconComponent";
import OS_Wrapper from "@/components/_ShareComponent/OS_Wrapper";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import ReportBox from "@/components/Box/ReportBox";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import {
  apiAdminInvestasiUpdateByStatus,
  apiAdminInvestmentDetailById,
} from "@/service/api-admin/api-admin-investment";
import { colorBadgeStatus } from "@/utils/colorBadge";
import { countDownAndCondition } from "@/utils/countDownAndCondition";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React from "react";
import { RefreshControl } from "react-native";
import Toast from "react-native-toast-message";

export default function AdminInvestmentDetail() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [data, setData] = React.useState<any | null>(null);
  const [isLoading, setLoading] = React.useState(false);
  const [remind, setRemind] = React.useState({
    sisa: 0,
    reminder: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminInvestmentDetailById({ id: id as string });
      if (response.success) {
        setData(response.data);

        const duration = response?.data?.MasterPencarianInvestor?.name;
        const publishTime = response?.data?.countDown;

        const countDown = countDownAndCondition({
          duration: duration,
          publishTime: publishTime
        });

        setRemind({
          sisa: countDown.durationDay,
          reminder: countDown.reminder,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handlerSubmitPublish = async () => {
    try {
      setLoading(true);
      const response = await apiAdminInvestasiUpdateByStatus({
        id: id as string,
        status: "publish",
        data: data,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mempublikasikan data",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Berhasil mempublikasikan data",
      });
      router.replace(`/admin/investment/publish/status`);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
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

  if (!data) {
    return (
      <>
        <OS_Wrapper>
          <CustomSkeleton height={200} />
        </OS_Wrapper>
      </>
    );
  }

  return (
    <>
      <OS_Wrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title={`Detail Data`}
            rightComponent={status === "publish" && rightComponent}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onLoadData}
            tintColor="#E1B525"
            colors={["#E1B525"]}
          />
        }
      >
        {status === "publish" && (
          <BaseBox>
            <ProgressCustom
              label={(data && `${data.progress}%`) || "0%"}
              value={(data && data.progress) || 0}
              size="lg"
            />
            <Spacing />
            <StackCustom gap={"xs"}>
              <GridSpan_4_8
                label={<TextCustom bold>Sisa Saham</TextCustom>}
                value={
                  <TextCustom>
                    {data && formatCurrencyDisplay(data && data?.sisaLembar)}{" "}
                    lembar
                  </TextCustom>
                }
              />
              <GridSpan_4_8
                label={<TextCustom bold>Validasi Transaksi</TextCustom>}
                value={
                  <TextCustom>
                    {data && data?.Investasi_Invoice.length} Proses
                  </TextCustom>
                }
              />
            </StackCustom>
          </BaseBox>
        )}

        <BaseBox>
          <StackCustom>
            <DummyLandscapeImage imageId={data?.imageId} />
            {listData({ data: data, reminder: remind.reminder })?.map(
              (item, i) => (
                <GridSpan_4_8
                  key={i}
                  label={<TextCustom bold>{item.label}</TextCustom>}
                  value={<TextCustom>{item.value}</TextCustom>}
                />
              ),
            )}
          </StackCustom>
        </BaseBox>

        <BaseBox>
          <StackCustom>
            <GridTwoView
              leftItem={<TextCustom bold>File Prospektus</TextCustom>}
              rightItem={
                <ButtonCustom
                  iconLeft={
                    <IconProspectus
                      size={ICON_SIZE_BUTTON}
                      color={MainColor.darkblue}
                    />
                  }
                  onPress={() => {
                    router.push(
                      `/(application)/(file)/${data?.prospektusFileId}`,
                    );
                  }}
                >
                  Preview
                </ButtonCustom>
              }
            />
            <GridTwoView

              leftItem={<TextCustom bold>File Dokumen</TextCustom>}
              rightItem={
                <StackCustom>
                  {_.isEmpty(data?.DokumenInvestasi) ? (
                    <TextCustom align="center">-</TextCustom>
                  ) : (
                    data?.DokumenInvestasi?.map((item: any, index: number) => {
                      const titleFix = item?.title?.substring(0, 10) || "";

                      return (
                        <ButtonCustom
                          key={item.id || index} // ✅ pastikan key unik
                          iconLeft={
                            <IconProspectus
                              size={ICON_SIZE_BUTTON}
                              color={MainColor.darkblue}
                            />
                          }
                          onPress={() => {
                            router.push(
                              `/(application)/(file)/${item?.fileId}`,
                            );
                          }}
                        >
                          <TextCustom color="black" truncate>
                            {titleFix}...
                          </TextCustom>
                        </ButtonCustom>
                      );
                    })
                  )}
                </StackCustom>
              }
            />
          </StackCustom>
        </BaseBox>

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
                textLeft: "Batal",
                textRight: "Ya",
                onPressRight: () => {
                  handlerSubmitPublish();
                },
              });
            }}
            onReject={() => {
              router.push(
                `/admin/investment/${id}/reject-input?status=${_.lowerCase(
                  data?.MasterStatusInvestasi?.name,
                )}`,
              );
            }}
          />
        )}

        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/investment/${id}/reject-input`);
            }}
          />
        )}
      </OS_Wrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Daftar Investor",
              icon: <IconList />,
              path: `/admin/investment/${id}/list-of-investor`,
            },
            // {
            //   label: "Daftar Pencarian Dana",
            //   icon: <IconList />,
            //   path: `/admin/donation/${id}/list-disbursement-of-funds`,
            // },
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

const listData = ({ data, reminder }: { data: any; reminder: boolean }) => [
  {
    label: "Username",
    value: (data && data?.author?.username) || "-",
  },
  {
    label: "Judul",
    value: (data && data?.title) || "-",
  },
  {
    label: "Status",
    value:
      data && data?.MasterStatusInvestasi?.name ? (
        <BadgeCustom
          color={colorBadgeStatus({
            status: reminder ? "periode berakhir" : "publish",
          })}
        >
          {reminder
            ? "Periode Berakhir"
            : _.startCase(data?.MasterStatusInvestasi?.name as string)}
        </BadgeCustom>
      ) : (
        "-"
      ),
  },
  {
    label: "Dana Dibutuhkan",
    value: `Rp. ${
      (data && data?.targetDana && formatCurrencyDisplay(data?.targetDana)) ||
      "-"
    }`,
  },
  {
    label: "Harga Perlembar",
    value: `Rp. ${
      (data && data?.hargaLembar && formatCurrencyDisplay(data?.hargaLembar)) ||
      "-"
    }`,
  },
  {
    label: "Total Lembar",
    value:
      (data && data?.totalLembar && formatCurrencyDisplay(data?.totalLembar)) ||
      "-",
  },
  {
    label: "ROI",
    value: `${(data && data?.roi && data?.roi) || 0} %`,
  },
  {
    label: "Pembagian Deviden",
    value: (data && data?.MasterPembagianDeviden?.name) + " bulan" || "-",
  },
  {
    label: "Jadwal Pembagian",
    value: (data && data?.MasterPeriodeDeviden?.name) || "-",
  },
  {
    label: "Pencarian Investor",
    value: (data && data?.MasterPencarianInvestor?.name) + " hari" || "-",
  },
];
