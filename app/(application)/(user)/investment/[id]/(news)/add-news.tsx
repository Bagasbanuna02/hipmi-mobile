import {
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import { apiInvestmentCreateNews } from "@/service/api-client/api-investment";
import { uploadFileService } from "@/service/upload-service";
import pickFile, { IFileData } from "@/utils/pickFile";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function InvestmentAddNews() {
  const { id } = useLocalSearchParams();
  const [image, setImage] = useState<IFileData | null>(null);
  const [data, setData] = useState({
    title: "",
    deskripsi: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlerSubmit = async () => {
    let imageId = "";

    if (!data.title || !data.deskripsi) {
      Toast.show({
        type: "error",
        text1: "Judul dan deskripsi harus diisi",
      });
      return;
    }

    try {
      setIsLoading(true);
      if (image) {
        const uploadImage = await uploadFileService({
          dirId: DIRECTORY_ID.investasi_berita,
          imageUri: image.uri,
        });

        imageId = uploadImage.data.id;
      }

      const newData = {
        id: id as string,
        title: data.title,
        deskripsi: data.deskripsi,
        imageId: imageId,
      };

      const response = await apiInvestmentCreateNews({
        id: id as string,
        data: newData,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Berita berhasil disimpan",
        });
        router.back();
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal menyimpan berita",
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OS_Wrapper
      enableKeyboardHandling
      contentPaddingBottom={250}
    >
      <StackCustom gap={"xs"}>
        <InformationBox text="Pengunggahan foto ke aplikasi bersifat opsional dan tidak diwajibkan, Anda dapat menyimpan berita tanpa mengunggah foto." />
        <LandscapeFrameUploaded image={image?.uri} />
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
        <Spacing />
        <TextInputCustom
          label="Judul Berita"
          placeholder="Masukan judul berita"
          required
          value={data.title}
          onChangeText={(value) => setData({ ...data, title: value })}
        />
        <TextAreaCustom
          label="Deskripsi Berita"
          placeholder="Masukan deskripsi berita"
          required
          showCount
          maxLength={1000}
          value={data.deskripsi}
          onChangeText={(value) => setData({ ...data, deskripsi: value })}
        />

        <ButtonCustom
          disabled={!data.title || !data.deskripsi || isLoading}
          isLoading={isLoading}
          onPress={handlerSubmit}
        >
          Simpan
        </ButtonCustom>
      </StackCustom>
    </OS_Wrapper>
  );
}
