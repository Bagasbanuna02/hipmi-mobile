/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { apiInvestmentGetInvoice } from "@/service/api-client/api-investment";
import { GStyles } from "@/styles/global-styles";
import { dateTimeView } from "@/utils/dateTimeView";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import React from "react";

export default function InvestmentFailed() {
  const { id } = useLocalSearchParams();
  console.log("[ID]", id);

  const [data, setData] = React.useState<any | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [id])
  );
  const onLoadData = async () => {
    try {
      const response = await apiInvestmentGetInvoice({
        id: id as string,
        category: "invoice",
      });

      console.log("[RES INVOICE]", JSON.stringify(response.data, null, 2));
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const listData = [
    {
      label: "Bank",
      value: (data && data?.MasterBank?.namaBank) || "-",
    },
    {
      label: "Rekening Penerima",
      value: (data && data?.MasterBank?.namaAkun) || "-",
    },
    {
      label: "No Rekening",
      value: (data && data?.MasterBank?.norek) || "-",
    },
    {
      label: "Jumlah",
      value: `Rp ${data && formatCurrencyDisplay(data?.nominal)}` || "-",
    },
    {
      label: "Tanggal",
      value: (data && dateTimeView({ date: data?.createdAt })) || "-",
    },
    {
      label: "Lembar Terbeli",
      value: (data && formatCurrencyDisplay(data?.lembarTerbeli)) || "-",
    },
  ];

  return (
    <ViewWrapper>
      <StackCustom>
        <BaseBox>
          <StackCustom>
            <TextCustom bold align="center">
              Transaksi anda gagal karena bukti transfer tidak sesuai dengan
              data kami. Hubungi admin untuk memperbaiki masalah ini.
            </TextCustom>

            <FontAwesome6
              name="whatsapp"
              size={50}
              color={MainColor.green}
              style={GStyles.alignSelfCenter}
            />
          </StackCustom>
        </BaseBox>

        <BaseBox>
          <TextCustom bold align="center" size="large">
            Detail Transaksi
          </TextCustom>

          <Spacing />

          <StackCustom>
            {listData.map((item, i) => (
              <Grid key={i}>
                <Grid.Col span={5}>
                  <TextCustom bold>{item.label}</TextCustom>
                </Grid.Col>
                <Grid.Col span={7}>
                  <TextCustom style={{ paddingLeft: 10 }}>
                    {item.value}
                  </TextCustom>
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
        </BaseBox>
      </StackCustom>
    </ViewWrapper>
  );
}
