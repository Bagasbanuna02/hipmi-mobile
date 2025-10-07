import {
  BaseBox,
  ButtonCenteredOnly,
  ButtonCustom,
  Grid,
  InformationBox,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { router, useLocalSearchParams } from "expo-router";

export default function DonationInvoice() {
  const { invoiceId } = useLocalSearchParams();
  console.log("invoiceId", invoiceId);
  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <InformationBox
            text={`Mohon transfer donasi anda ke rekening dibawah dengan Id: ${invoiceId}`}
          />
          <BaseBox>
            <StackCustom gap={"xs"}>
              <TextCustom>Nama BANK</TextCustom>
              <TextCustom>Nama Penerima</TextCustom>
              <Spacing height={10} />

              <BaseBox backgroundColor={MainColor.soft_darkblue}>
                <Grid containerStyle={{ justifyContent: "center" }}>
                  <Grid.Col
                    span={8}
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <TextCustom size="xlarge" bold color="yellow">
                      4567898765433567
                    </TextCustom>
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    style={{
                      alignItems: "flex-end",
                    }}
                  >
                    <ButtonCustom>Salin</ButtonCustom>
                  </Grid.Col>
                </Grid>
              </BaseBox>
            </StackCustom>
          </BaseBox>

          <BaseBox>
            <StackCustom gap={"xs"}>
              <TextCustom>Jumlah Transaksi</TextCustom>

              <Spacing height={10} />

              <BaseBox backgroundColor={MainColor.soft_darkblue}>
                <Grid containerStyle={{ justifyContent: "center" }}>
                  <Grid.Col
                    span={8}
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <TextCustom size="xlarge" bold color="yellow">
                      Rp. 1.000.000
                    </TextCustom>
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    style={{
                      alignItems: "flex-end",
                    }}
                  >
                    <ButtonCustom>Salin</ButtonCustom>
                  </Grid.Col>
                </Grid>
              </BaseBox>
            </StackCustom>
          </BaseBox>

          <BaseBox>
            <StackCustom>
              <TextCustom>Upload bukti transfer anda.</TextCustom>
              <ButtonCenteredOnly
                onPress={() => {
                  router.push("/(application)/(image)/take-picture/123");
                }}
                icon="upload"
              >
                Upload
              </ButtonCenteredOnly>
            </StackCustom>
          </BaseBox>

          <ButtonCustom
            onPress={() => {
              router.push(`/donation/${invoiceId}/(transaction-flow)/process`);
            }}
          >
            Saya Sudah Transfer
          </ButtonCustom>
        </StackCustom>
        <Spacing />
      </ViewWrapper>
    </>
  );
}
