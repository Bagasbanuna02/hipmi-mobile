/* eslint-disable react-hooks/exhaustive-deps */
import {
    AlertDefaultSystem,
    BadgeCustom,
    BaseBox,
    ButtonCustom,
    Spacing,
    StackCustom,
    TextCustom,
    ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import {
    apiAdminInvestmentGetOneInvoiceById,
    apiAdminInvestmentUpdateInvoice,
} from "@/service/api-admin/api-admin-investment";
import { colorBadgeTransaction } from "@/utils/colorBadge";
import { dateTimeView } from "@/utils/dateTimeView";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminInvestmentTransactionDetail() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminInvestmentGetOneInvoiceById({
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
      label: "Investor",
      value: (data && data?.Author?.username) || "-",
    },
    {
      label: "Bank",
      value: (data && data?.MasterBank?.namaBank) || "-",
    },
    {
      label: "Nominal",
      value: (data && `Rp. ${formatCurrencyDisplay(data?.nominal)}`) || "-",
    },
    {
      label: "Lembar terbeli",
      value: (data && formatCurrencyDisplay(data?.lembarTerbeli)) || "-",
    },
    {
      label: "Status",
      value:
        data && data?.StatusInvoice?.name ? (
          <BadgeCustom
            color={colorBadgeTransaction({
              status: data?.StatusInvoice?.name,
            })}
          >
            {data?.StatusInvoice?.name}
          </BadgeCustom>
        ) : (
          "-"
        ),
    },
    {
      label: "Tanggal",
      value: (data && dateTimeView({ date: data?.createdAt })) || "-",
    },
    {
      label: "Bukti Transfer",
      value:
        data && data?.imageId ? (
          <ButtonCustom
            onPress={() =>
              router.push(
                `/(application)/(image)/preview-image/${data?.imageId}`,
              )
            }
          >
            Cek
          </ButtonCustom>
        ) : (
          "-"
        ),
    },
  ];

  const handlerSubmit = async ({
    category,
  }: {
    category: "accept" | "deny";
  }) => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "Gagal update status transaksi",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await apiAdminInvestmentUpdateInvoice({
        id: id as string,
        category: category,
        data: {
          investasiId: data?.investasiId,
          lembarTerbeli: data?.lembarTerbeli,
          senderId: user?.id as any,
        },
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal update status transaksi",
        });

        return;
      }

      Toast.show({
        type: "success",
        text1: "Berhasil update status transaksi",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  const buttonAction = () => {
    if (data?.StatusInvoice?.name === "Proses") {
      return (
        <GridTwoView
          spanLeft={6}
          spanRight={6}
          styleLeft={{ paddingRight: 10 }}
          styleRight={{ paddingLeft: 10 }}
          leftItem={
            <ButtonCustom
              disabled={isLoading}
              isLoading={isLoading}
              backgroundColor={MainColor.red}
              textColor="white"
              onPress={() => {
                AlertDefaultSystem({
                  title: "Konfirmasi transaksi",
                  message: "Apakah anda yakin ingin menolak transaksi ini?",
                  textLeft: "Tidak",
                  textRight: "Ya",
                  onPressRight: () => {
                    handlerSubmit({
                      category: "deny",
                    });
                  },
                });
              }}
            >
              Tolak
            </ButtonCustom>
          }
          rightItem={
            <ButtonCustom
              disabled={isLoading}
              isLoading={isLoading}
              onPress={() => {
                AlertDefaultSystem({
                  title: "Konfirmasi transaksi",
                  message: "Apakah anda yakin ingin menyetujui transaksi ini?",
                  textLeft: "Tidak",
                  textRight: "Ya",
                  onPressRight: () => {
                    handlerSubmit({
                      category: "accept",
                    });
                  },
                });
              }}
            >
              Terima
            </ButtonCustom>
          }
        />
      );
    } else if (data?.StatusInvoice?.name === "Gagal") {
      return (
        <>
          <ButtonCustom disabled onPress={() => router.back()}>
            Transaksi telah gagal
          </ButtonCustom>
        </>
      );
    } else {
      return (
        <>
          <ButtonCustom disabled={true}>
            Status: {data?.StatusInvoice?.name}
          </ButtonCustom>
        </>
      );
    }
  };

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle title="Detail Transaksi Investor" />
        }
        // footerComponent={buttonAction()}
      >
        <BaseBox>
          <StackCustom>
            {listData.map((item, index) => (
              <GridSpan_4_8
                key={index}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>
        <Spacing />
        {buttonAction()}
      </ViewWrapper>
    </>
  );
}
