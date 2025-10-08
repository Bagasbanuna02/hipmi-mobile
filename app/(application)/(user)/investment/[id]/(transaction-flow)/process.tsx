import { BaseBox, StackCustom, TextCustom, ViewWrapper } from "@/components";
import MoneyTransferAnimation from "@/components/_ShareComponent/MoneyTransferAnimation";
import { View } from "react-native";

export default function InvestmentProcess() {
  return (
    <>
      <ViewWrapper>
        <BaseBox>
          <StackCustom>
            <TextCustom align="center" bold>
              Admin sedang memvalidasi data dan bukti transfer anda. Mohon
              tunggu proses ini selesai.
            </TextCustom>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MoneyTransferAnimation />
            </View>
          </StackCustom>
        </BaseBox>

        {/* <BaseBox>
          <Grid>
            <Grid.Col span={10} style={{ justifyContent: "center" }}>
              <TextCustom size="small">
                Hubungi admin jika tidak kunjung di proses! Klik pada logo
                Whatsapp ini.
              </TextCustom>
            </Grid.Col>
            <Grid.Col span={2} style={{ alignItems: "flex-end" }}>
              <Ionicons
                name="logo-whatsapp"
                size={50}
                color={MainColor.green}
              />
            </Grid.Col>
          </Grid>
        </BaseBox> */}
      </ViewWrapper>
    </>
  );
}
