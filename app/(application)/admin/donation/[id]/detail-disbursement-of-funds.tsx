/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  ButtonCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { apiAdminDonationDisbursementOfFundsListById } from "@/service/api-admin/api-admin-donation";
import { dateTimeView } from "@/utils/dateTimeView";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";

export default function AdminDonationDetailDisbursementOfFunds() {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminDonationDisbursementOfFundsListById({
        id: id as string,
        category: "get-one",
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
      label: "Nominal",
      value: `Rp ${(data && formatCurrencyDisplay(data?.nominalCair)) || 0}`,
    },
    {
      label: "Tanggal",
      value: dateTimeView({ date: data?.createdAt }),
    },
    {
      label: "Judul",
      value: (data && data?.title) || "-",
    },
    {
      label: "Deskripsi",
      value: (data && data?.deskripsi) || "-",
    },
  ];
  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle title="Detail Pencairan Dana" />
        }
      >
        <BaseBox>
          <StackCustom>
            {listData?.map((item, index) => (
              <GridSpan_4_8
                key={index}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>

        <ButtonCustom
          onPress={() =>
            router.push(`/(application)/(image)/preview-image/${data?.imageId}`)
          }
        >
          Cek Bukti Transaksi
        </ButtonCustom>
      </ViewWrapper>
    </>
  );
}
