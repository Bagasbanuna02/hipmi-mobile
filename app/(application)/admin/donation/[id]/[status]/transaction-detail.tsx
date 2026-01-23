import {
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { useAuth } from "@/hooks/use-auth";
import {
  apiAdminDonationInvoiceDetailById,
  apiAdminDonationInvoiceUpdateById,
} from "@/service/api-admin/api-admin-donation";
import { colorBadgeTransaction } from "@/utils/colorBadge";
import { dateTimeView } from "@/utils/dateTimeView";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminDonasiTransactionDetail() {
  const { user } = useAuth();
  const { id, status } = useLocalSearchParams();
  console.log("[STATUS]", id, status);

  const [data, setData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminDonationInvoiceDetailById({
        id: id as string,
      });

      console.log("[GET INVOICE BY ID]", JSON.stringify(response, null, 2));
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerSubmit = async () => {
    try {
      setLoading(true);
      const newData = {
        donationId: data?.donasiId,
        nominal: data?.nominal,
        senderId: user?.id,
      };

      const response = await apiAdminDonationInvoiceUpdateById({
        id: id as string,
        data: newData,
        status: "berhasil",
      });

      console.log("[UPDATE INVOICE]", JSON.stringify(response, null, 2));

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.message,
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: response.message,
      });
      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  const buttonAction = () => {
    if (data && data?.DonasiMaster_StatusInvoice?.name === "Menunggu") {
      return null;
    }

    if (data && data?.DonasiMaster_StatusInvoice?.name === "Proses") {
      return (
        <BoxButtonOnFooter>
          <ButtonCustom
            isLoading={isLoading}
            onPress={() => {
              AlertDefaultSystem({
                title: "Konfirmasi transaksi",
                message: "Apakah anda yakin ingin menyetujui transaksi ini?",
                textLeft: "Tidak",
                textRight: "Ya",
                onPressRight: () => {
                  handlerSubmit();
                },
              });
            }}
          >
            Terima donasi
          </ButtonCustom>
        </BoxButtonOnFooter>
      );
    }

    return (
      <BoxButtonOnFooter>
        <ButtonCustom disabled>
          {data?.DonasiMaster_StatusInvoice?.name}
        </ButtonCustom>
      </BoxButtonOnFooter>
    );
  };

  const listData = [
    {
      label: "Donatur",
      value: (data && data?.Author?.username) || "-",
    },
    {
      label: "Bank",
      value: (data && data?.MasterBank?.namaBank) || "-",
    },
    {
      label: "Jumlah Donasi",
      value: `Rp. ${
        (data && data?.nominal && formatCurrencyDisplay(data?.nominal)) || "-"
      }`,
    },
    {
      label: "Status",
      value:
        (data && data?.DonasiMaster_StatusInvoice?.name && (
          <BadgeCustom
            color={colorBadgeTransaction({
              status: data?.DonasiMaster_StatusInvoice?.name as any,
            })}
          >
            {_.startCase(
              (data?.DonasiMaster_StatusInvoice?.name as any) || "-",
            )}
          </BadgeCustom>
        )) ||
        "-",
    },
    {
      label: "Tanggal",
      value: (data && dateTimeView({ date: data?.createdAt })) || "-",
    },
    {
      label: "Bukti Transfer",
      value:
        (data && data?.imageId && (
          <ButtonCustom
            onPress={() =>
              router.push(
                `/(application)/(image)/preview-image/${data?.imageId}`,
              )
            }
          >
            Cek
          </ButtonCustom>
        )) ||
        "-",
    },
  ];

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Detail Transaksi" />}
        footerComponent={buttonAction()}
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
      </ViewWrapper>
    </>
  );
}
