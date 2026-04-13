/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  CenterCustom,
  InformationBox,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextCustom,
  TextInputCustom,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import {
  apiInvestmentGetDocument,
  apiInvestmentUpsertDocument,
} from "@/service/api-client/api-investment";
import { deleteFileService, uploadFileService } from "@/service/upload-service";
import pickFile from "@/utils/pickFile";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function InvestmentEditDocument() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [titleFile, setTitleFile] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      const response = await apiInvestmentGetDocument({
        id: id as string,
        category: "one-document",
      });
      setData(response.data);
      setTitleFile(response.data.title);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerUpdate = async () => {
    const prevFileId = data.fileId;
    try {
      setIsLoading(true);
      const responseUploadFile = await uploadFileService({
        dirId: DIRECTORY_ID.investasi_dokumen,
        imageUri: pdf.uri,
      });

      if (!responseUploadFile.success) {
        throw new Error(responseUploadFile.message);
      }

      const newData = {
        title: data.title,
        fileId: responseUploadFile.data.id,
      };

      const response = await apiInvestmentUpsertDocument({
        id: id as string,
        data: newData,
      });

      if (response.success) {
        const delPrevFile = await deleteFileService({
          id: prevFileId,
        });

        console.log("[DEL PREV FILE]", delPrevFile);

        Toast.show({
          type: "success",
          text1: "Data berhasil diupdate",
        });

        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
      Toast.show({
        type: "error",
        text1: "Gagal mengupdate data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom isLoading={isLoading} disabled={!pdf} onPress={handlerUpdate}>
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <OS_Wrapper
      enableKeyboardHandling
      contentPaddingBottom={250}
      footerComponent={buttonFooter}
    >
      <StackCustom gap={"xs"}>
          <InformationBox text="File dokumen bersifat opsional, jika memang ada file yang bisa membantu meyakinkan investor. Anda bisa mengupload nya." />
          <Spacing />
          <TextInputCustom
            label="Judul Dokumen"
            placeholder="Masukan judul dokumen"
            required
            value={data?.title}
            onChangeText={(value) => setData({ ...data, title: value })}
          />

          <BaseBox>
            <CenterCustom>
              {pdf ? (
                <TextCustom truncate>{pdf.name}</TextCustom>
              ) : (
                <TextCustom truncate>{_.snakeCase(titleFile || "")}.pdf</TextCustom>
              )}
            </CenterCustom>
          </BaseBox>

          <ButtonCenteredOnly
            icon="upload"
            onPress={() =>
              pickFile({
                allowedType: "pdf",
                setPdfUri(file) {
                  setPdf(file);
                },
              })
            }
          >
            Upload
          </ButtonCenteredOnly>
        </StackCustom>
    </OS_Wrapper>
  );
}
