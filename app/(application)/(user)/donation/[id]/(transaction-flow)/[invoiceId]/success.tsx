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
import { apiDonationGetInvoiceById } from "@/service/api-client/api-donation";
import { GStyles } from "@/styles/global-styles";
import { dateTimeView } from "@/utils/dateTimeView";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function DonationSuccess() {
  const { id, invoiceId } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id, invoiceId])
  );

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetInvoiceById({
        id: invoiceId as string,
      });

      console.log("[DATA]", JSON.stringify(response.data, null, 2));
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
      label: "Jumlah Donasi",
      value: (data && formatCurrencyDisplay(data?.nominal)) || "-",
    },
    {
      label: "Tanggal",
      value: (data && dateTimeView({ date: data?.createdAt })) || "-",
    },
  ];

  return (
    <ViewWrapper>
      <StackCustom>
        <BaseBox>
          <StackCustom>
            <FontAwesome6
              name="money-bill-wave"
              size={100}
              color={MainColor.green}
              style={GStyles.alignSelfCenter}
            />

            <TextCustom bold align="center">
              Terimakasih telah percaya pada kami untuk mengelola dana anda!
              Info mengenai update Penggalian Dana ini bisa di lihat di kolom
              berita.
            </TextCustom>
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


