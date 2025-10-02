import {
  BaseBox,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ActivityIndicator } from "react-native";

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
            <ActivityIndicator size="large" color={MainColor.yellow} />
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
