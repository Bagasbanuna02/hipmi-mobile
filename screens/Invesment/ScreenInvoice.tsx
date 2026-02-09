/* eslint-disable react-hooks/exhaustive-deps */
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
import CopyButton from "@/components/Button/CoyButton";
import { MainColor } from "@/constants/color-palet";
import DIRECTORY_ID from "@/constants/directory-id";
import {
  apiInvestmentGetInvoice,
  apiInvestmentUpdateInvoice,
} from "@/service/api-client/api-investment";
import { uploadFileService } from "@/service/upload-service";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import pickFile, { IFileData } from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function Investment_ScreenInvoice() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>({});
  const [image, setImage] = useState<IFileData>({
    name: "",
    uri: "",
    size: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiInvestmentGetInvoice({
        id: id as string,
        category: "invoice",
      });

      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerSubmitUpdate = async () => {
    try {
      setIsLoading(true);
      const responseUploadImage = await uploadFileService({
        dirId: DIRECTORY_ID.investasi_bukti_transfer,
        imageUri: image?.uri,
      });

      if (!responseUploadImage?.data?.id) {
        Toast.show({
          type: "error",
          text1: "Gagal mengunggah bukti transfer",
        });
        return;
      }

      const response = await apiInvestmentUpdateInvoice({
        id: id as string,
        data: {
          imageId: responseUploadImage?.data?.id,
        },
        status: "proses",
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Berhasil mengunggah bukti transfer",
        });
        router.push(`/investment/${id}/(transaction-flow)/process`);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <InformationBox text="Mohon transfer ke rekening dibawah" />
          <BaseBox>
            <StackCustom gap={"xs"}>
              <Grid>
                <Grid.Col span={4}>
                  <TextCustom>Bank</TextCustom>
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextCustom>{data?.MasterBank?.namaBank}</TextCustom>
                </Grid.Col>
              </Grid>
              <Spacing height={10} />
              <Grid>
                <Grid.Col span={4}>
                  <TextCustom>Nama Akun</TextCustom>
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextCustom>{data?.MasterBank?.namaAkun}</TextCustom>
                </Grid.Col>
              </Grid>

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
                      Rp. {formatCurrencyDisplay(data?.nominal)}
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
              <TextCustom align="center">
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
              ) : (
                <TextCustom align="center">
                  Tidak ada gambar yang diunggah
                </TextCustom>
              )}
              <ButtonCenteredOnly
                onPress={() => {
                  pickFile({
                    allowedType: "image",
                    setImageUri(file: any) {
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

          <ButtonCustom
            isLoading={isLoading}
            disabled={!image || isLoading}
            onPress={() => {
              handlerSubmitUpdate();
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
