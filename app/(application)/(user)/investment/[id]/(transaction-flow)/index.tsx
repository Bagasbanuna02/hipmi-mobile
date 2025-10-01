/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  Divider,
  Grid,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { apiInvestmentGetOne } from "@/service/api-client/api-investment";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function InvestmentInvest() {
  const { id } = useLocalSearchParams();
  // console.log("[ID]", id);
  const [data, setData] = useState<any>(null);
  const [value, setValue] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [sisaLembar, setSisaLembar] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiInvestmentGetOne({
        id: id as string,
      });

      setData(response.data);
      setSisaLembar(response.data?.sisaLembar);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handleTextChange = (text: string) => {
    // Izinkan input kosong → anggap sebagai 0 (atau abaikan, tergantung UX)
    if (text === "") {
      setValue(0);
      setTotal(0);
      return;
    }

    // Regex: hanya digit (angka bulat positif)
    const integerRegex = /^\d+$/;

    if (integerRegex.test(text)) {
      const numValue = Number(text);
      // Karena regex sudah pastikan hanya angka, isNaN biasanya false
      // Tapi tetap aman untuk cek
      if (!isNaN(numValue)) {
        setValue(numValue);
        setTotal(numValue * Number(data?.hargaLembar));
        console.log("[VALUE]", numValue);
      }
    }
    // Jika input tidak valid (misal: "12a", "12."), abaikan → state tidak berubah
  };

  const buttonSubmit = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom
            disabled={value < 10 || value >= sisaLembar}
            onPress={() => router.push(`/investment/${id}/select-bank`)}
          >
            Beli {value}, {sisaLembar}
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  };

  return (
    <>
      <ViewWrapper footerComponent={buttonSubmit()}>
        <BaseBox>
          <StackCustom gap={"xs"}>
            <Grid>
              <Grid.Col span={6}>
                <TextCustom>Sisa Lembar Saham</TextCustom>
              </Grid.Col>
              <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
                <TextCustom>{data?.sisaLembar || "-"}</TextCustom>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <TextCustom>Harga Per Lembar</TextCustom>
              </Grid.Col>
              <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
                <TextCustom>{data?.hargaLembar || "-"}</TextCustom>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col
                span={6}
                style={{
                  justifyContent: "center",
                }}
              >
                <TextCustom>Jumlah Pembelian</TextCustom>
                <TextCustom bold color="yellow" size="small">
                  Minimum 10 lembar
                </TextCustom>
              </Grid.Col>
              <Grid.Col
                span={6}
                style={{
                  alignItems: "flex-end",
                }}
              >
                <TextInputCustom
                  style={{
                    width: "80%",
                  }}
                  placeholder="0"
                  keyboardType="numeric"
                  value={value.toString()}
                  onChangeText={(value) => {
                    handleTextChange(value);
                  }}
                />
              </Grid.Col>
            </Grid>
            <Divider />
            <Grid>
              <Grid.Col span={6}>
                <TextCustom>Total Harga</TextCustom>
              </Grid.Col>
              <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
                <TextCustom> Rp. {formatCurrencyDisplay(total)}</TextCustom>
              </Grid.Col>
            </Grid>
          </StackCustom>
        </BaseBox>
      </ViewWrapper>
    </>
  );
}
