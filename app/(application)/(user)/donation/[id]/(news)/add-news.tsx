import {
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  NewWrapper,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import { apiDonationCreateNews } from "@/service/api-client/api-donation";
import { uploadFileService } from "@/service/upload-service";
import pickFile, { IFileData } from "@/utils/pickFile";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function DonationAddNews() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({
    title: "",
    deskripsi: "",
  });
  const [image, setImage] = useState<IFileData | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handlerSubmit = async () => {
    let newData: any = { ...data };
    try {
      setLoading(true);
      if (image) {
        const responseUploadImage = await uploadFileService({
          dirId: DIRECTORY_ID.donasi_kabar,
          imageUri: image?.uri,
        });

        newData = {
          ...newData,
          imageId: responseUploadImage.data.id,
        };
      }

      const response = await apiDonationCreateNews({
        id: id as string,
        data: newData,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal menambah berita",
        });

        return;
      }

      Toast.show({
        type: "success",
        text1: "Berita berhasil ditambahkan",
      });

      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewWrapper
      footerComponent={
        <BoxButtonOnFooter>
          <ButtonCustom
            disabled={!data.title || !data.deskripsi}
            isLoading={isLoading}
            onPress={() => {
              handlerSubmit();
            }}
          >
            Simpan
          </ButtonCustom>
        </BoxButtonOnFooter>
      }
    >
      <StackCustom gap={"xs"}>
        <InformationBox text="Upload gambar bersifat opsional untuk melengkapi kabar terkait donasi Anda." />
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
          onChangeText={(value) => {
            setData({
              ...data,
              title: value,
            });
          }}
        />
        <TextAreaCustom
          label="Deskripsi Berita"
          placeholder="Masukan deskripsi berita"
          required
          showCount
          maxLength={1000}
          value={data.deskripsi}
          onChangeText={(value) => {
            setData({
              ...data,
              deskripsi: value,
            });
          }}
        />

        <Spacing />
      </StackCustom>
    </NewWrapper>
  );
}
