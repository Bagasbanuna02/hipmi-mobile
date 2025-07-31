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
import { router, useLocalSearchParams } from "expo-router";

export default function InvestmentInvest() {
  const { id } = useLocalSearchParams();

  const buttonSubmit = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom onPress={() => router.push(`/investment/${id}/select-bank`)}>Beli</ButtonCustom>
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
                <TextCustom>3.000</TextCustom>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <TextCustom>Harga Per Lembar</TextCustom>
              </Grid.Col>
              <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
                <TextCustom>Rp. 1.000</TextCustom>
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
                />
              </Grid.Col>
            </Grid>
            <Divider />
            <Grid>
              <Grid.Col span={6}>
                <TextCustom>Total Harga</TextCustom>
              </Grid.Col>
              <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
                <TextCustom>Rp. 1.000</TextCustom>
              </Grid.Col>
            </Grid>
          </StackCustom>
        </BaseBox>
      </ViewWrapper>
    </>
  );
}
