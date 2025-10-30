/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { apiAdminInvestmentGetOneInvoiceById } from "@/service/api-admin/api-admin-investment";
import { colorBadgeTransaction } from "@/utils/colorBadge";
import { dateTimeView } from "@/utils/dateTimeView";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminInvestmentTransactionDetail() {
  const { id } = useLocalSearchParams();
  console.log("[ID]", id);

  const [data, setData] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminInvestmentGetOneInvoiceById({
        id: id as string,
      });
      console.log("[RESPONSE]", JSON.stringify(response, null, 2));
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const buttonAction = (
    <BoxButtonOnFooter>
      <ButtonCustom onPress={() => router.back()}>Terima</ButtonCustom>
    </BoxButtonOnFooter>
  );

  const listData = [
    {
      label: "Investor",
      value: data?.Author?.username || "-",
    },
    {
      label: "Bank",
      value: data?.MasterBank?.namaBank || "-",
    },
    {
      label: "Jumlah Investasi",
      value: `Rp. ${formatCurrencyDisplay(data?.nominal) || "-"}`,
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
      value: data && dateTimeView({ date: data?.createdAt }) || "-",
    },
    {
      label: "Bukti Transfer",
      value: (
        <ButtonCustom
          onPress={() =>
            router.push(`/(application)/(image)/preview-image/${data?.imageId}`)
          }
        >
          Cek
        </ButtonCustom>
      ),
    },
  ];

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle title="Detail Transaksi Investor" />
        }
        footerComponent={buttonAction}
      >
        <BaseBox>
          <StackCustom>
            {listData.map((item, index) => (
              <GridDetail_4_8
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
