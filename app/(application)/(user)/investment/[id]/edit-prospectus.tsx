/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  CenterCustom,
  InformationBox,
  LoaderCustom,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import {
  apiInvestmentGetOne,
  apiInvestmentUpdateData,
} from "@/service/api-client/api-investment";
import { deleteFileService, uploadFileService } from "@/service/upload-service";
import pickFile, { IFileData } from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function InvestmentEditProspectus() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loadingGet, setLoadingGet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState<IFileData | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadingGet(true);
      const response = await apiInvestmentGetOne({
        id: id as string,
      });
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGet(false);
    }
  };

  const handleSubmitUpdate = async () => {
    const prevProspectusFileId = data?.prospektusFileId;
    try {
      setIsLoading(true);

      const responseUploadImage = await uploadFileService({
        imageUri: pdf?.uri as any,
        dirId: DIRECTORY_ID.investasi_prospektus,
      });

      if (!responseUploadImage.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mengunggah gambar",
        });
        return;
      }
      const prospektusFileId = responseUploadImage.data.id;

      const responseUpdate = await apiInvestmentUpdateData({
        id: id as string,
        data: prospektusFileId,
        category: "prospectus",
      });

      if (responseUpdate.success) {
        const deletePrevImage = await deleteFileService({
          id: prevProspectusFileId as any,
        });

        if (!deletePrevImage.success) {
          console.log("[ERROR DELETE PREV IMAGE]", deletePrevImage.message);
          return;
        }

        Toast.show({
          type: "success",
          text1: "Data berhasil diupdate",
        });
        router.back();
      } else {
        Toast.show({
          type: "error",
          text1: responseUpdate.message,
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        disabled={pdf === null}
        isLoading={isLoading}
        onPress={handleSubmitUpdate}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <OS_Wrapper footerComponent={!loadingGet && buttonFooter}>
      <StackCustom gap={"xs"}>
        <InformationBox text="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepan." />
        <Spacing />

        <BaseBox>
          <CenterCustom>
            {loadingGet ? (
              <LoaderCustom />
            ) : pdf ? (
              <TextCustom truncate>{pdf.name}</TextCustom>
            ) : (
              <TextCustom truncate>
                {_.snakeCase(data?.title || "").replace(/_/g, "-")}.pdf
              </TextCustom>
            )}
          </CenterCustom>
        </BaseBox>
        <ButtonCenteredOnly
          disabled={loadingGet}
          icon="upload"
          onPress={() => {
            pickFile({
              allowedType: "pdf",
              setPdfUri(file: any) {
                setPdf({
                  uri: file.uri,
                  name: file.name,
                  size: file.size,
                });
              },
            });
          }}
        >
          Upload
        </ButtonCenteredOnly>
      </StackCustom>
    </OS_Wrapper>
  );
}
