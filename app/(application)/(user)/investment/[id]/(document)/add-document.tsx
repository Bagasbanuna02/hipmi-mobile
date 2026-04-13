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
import { MainColor } from "@/constants/color-palet";
import DIRECTORY_ID from "@/constants/directory-id";
import { apiInvestmentUpsertDocument } from "@/service/api-client/api-investment";
import { uploadFileService } from "@/service/upload-service";
import pickFile from "@/utils/pickFile";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function InvestmentAddDocument() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({
    title: "",
  });
  const [pdf, setPdf] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlerSubmit = async () => {
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
        Toast.show({
          type: "success",
          text1: "Data berhasil disimpan",
        });

        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
      Toast.show({
        type: "error",
        text1: "Gagal menyimpan data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoading}
        disabled={!pdf || data.title.length <= 0}
        onPress={handlerSubmit}
      >
        Simpan
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
            value={data.title}
            onChangeText={(value) => setData({ ...data, title: value })}
          />

          <BaseBox>
            <CenterCustom>
              {pdf ? (
                <TextCustom truncate>{pdf.name}</TextCustom>
              ) : (
                <FontAwesome5
                  name="file-pdf"
                  size={30}
                  color={MainColor.disabled}
                />
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
