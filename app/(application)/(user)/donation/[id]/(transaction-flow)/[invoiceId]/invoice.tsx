/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  Grid,
  InformationBox,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import CopyButton from "@/components/Button/CoyButton";
import { MainColor } from "@/constants/color-palet";
import DIRECTORY_ID from "@/constants/directory-id";
import {
  apiDonationGetInvoiceById,
  apiDonationUpdateInvoice,
} from "@/service/api-client/api-donation";
import { uploadFileService } from "@/service/upload-service";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import pickFile from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function DonationInvoice() {
  const { invoiceId } = useLocalSearchParams();
  console.log("invoiceId", invoiceId);
  const [data, setData] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [invoiceId]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetInvoiceById({
        id: invoiceId as string,
      });
      console.log("[RESPONSE]", JSON.stringify(response, null, 2));
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerUpdateInvoice = async () => {
    try {
      setLoading(true);
      const responseUploadImage = await uploadFileService({
        dirId: DIRECTORY_ID.donasi_bukti_transfer,
        imageUri: image?.uri,
      });

      console.log("[RESPONSE UPLOAD IMAGE]", responseUploadImage);

      if (!responseUploadImage?.data?.id) {
        Toast.show({
          type: "error",
          text1: "Gagal mengunggah bukti transfer",
        });
        return;
      }

      const fileId = responseUploadImage?.data?.id;

      const response = await apiDonationUpdateInvoice({
        id: invoiceId as string,
        fileId: fileId,
        status: "proses",
      });

      console.log("[RESPONSE UPDATE]", JSON.stringify(response, null, 2));

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mengunggah bukti transfer",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Berhasil mengunggah bukti transfer",
      });
      router.replace(`/donation/[id]/(transaction-flow)/${invoiceId}/process`);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <OS_Wrapper
        footerComponent={
          <BoxButtonOnFooter>
            <ButtonCustom
              disabled={!image}
              isLoading={isLoading}
              onPress={() => {
                handlerUpdateInvoice();
              }}
            >
              Simpan
            </ButtonCustom>
          </BoxButtonOnFooter>
        }
      >
        <StackCustom>
          <InformationBox
            text={`Mohon transfer donasi anda ke rekening dibawah`}
          />
          <BaseBox>
            <StackCustom gap={"xs"}>
              <TextCustom bold>
                BANK: {data?.DonasiMaster_Bank?.name}
              </TextCustom>
              {/* <TextCustom>{data?.DonasiMaster_Bank?.accountName}</TextCustom> */}
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
                      {data?.MasterBank?.norek}
                    </TextCustom>
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    style={{
                      alignItems: "flex-end",
                    }}
                  >
                    <CopyButton textToCopy={data?.MasterBank?.norek} />
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
                      Rp. {formatCurrencyDisplay(data?.nominal) || "-"}
                    </TextCustom>
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    style={{
                      alignItems: "flex-end",
                    }}
                  >
                    <CopyButton textToCopy={data?.nominal} />
                  </Grid.Col>
                </Grid>
              </BaseBox>
            </StackCustom>
          </BaseBox>

          <BaseBox>
            <StackCustom>
              <TextCustom bold align="center" size={"small"} color="gray">
                Upload bukti transfer anda.
              </TextCustom>
              {image ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    paddingInline: 20,
                  }}
                >
                  <TextCustom bold align="center" truncate>
                    {image?.name}
                  </TextCustom>
                </View>
              ) : null}
              <ButtonCenteredOnly
                onPress={() => {
                  pickFile({
                    allowedType: "image",
                    setImageUri(file) {
                      setImage(file);
                    },
                  });
                }}
                icon="upload"
              >
                Upload
              </ButtonCenteredOnly>
            </StackCustom>
          </BaseBox>
        </StackCustom>
        <Spacing />
      </OS_Wrapper>
    </>
  );
}
