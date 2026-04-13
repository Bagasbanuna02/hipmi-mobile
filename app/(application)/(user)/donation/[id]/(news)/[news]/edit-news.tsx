/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
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
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DIRECTORY_ID from "@/constants/directory-id";
import {
  apiDonationGetNewsById,
  apiDonationUpdateNews,
} from "@/service/api-client/api-donation";
import { uploadFileService } from "@/service/upload-service";
import pickFile, { IFileData } from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function DonationEditNews() {
  const { news } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [image, setImage] = useState<IFileData | null>(null);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [news]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetNewsById({
        id: news as string,
        category: "get-one",
      });

      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerSubmitUpdate = async () => {
    let newData;
    if (!data.title || !data.deskripsi) {
      Toast.show({
        type: "error",
        text1: "Judul dan deskripsi harus diisi",
      });
      return;
    }

    try {
      setLoading(true);

      newData = {
        title: data?.title,
        deskripsi: data?.deskripsi,
      };

      if (image && image?.uri) {
        const uploadNewImage = await uploadFileService({
          dirId: DIRECTORY_ID.donasi_kabar,
          imageUri: image?.uri,
        });

        newData = {
          title: data?.title,
          deskripsi: data?.deskripsi,
          newImageId: uploadNewImage.data.id,
        };
      }

      const response = await apiDonationUpdateNews({
        id: news as string,
        data: newData,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mengupdate berita",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Berita berhasil diperbarui",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OS_Wrapper
      enableKeyboardHandling
      contentPaddingBottom={250}
      footerComponent={
        <BoxButtonOnFooter>
          <ButtonCustom
            disabled={!data?.title || !data?.deskripsi}
            isLoading={isLoading}
            onPress={() => {
              handlerSubmitUpdate();
            }}
          >
            Update
          </ButtonCustom>
        </BoxButtonOnFooter>
      }
    >
      <StackCustom gap={"xs"}>
        <InformationBox text="Upload gambar bersifat opsional untuk melengkapi kabar terkait donasi Anda." />
        <LandscapeFrameUploaded
          image={
            image
              ? image.uri
              : data && data.imageId
              ? API_STRORAGE.GET({ fileId: data.imageId })
              : undefined
          }
        />
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
          value={data?.title}
          onChangeText={(value) => setData({ ...data, title: value })}
        />
        <TextAreaCustom
          label="Deskripsi Berita"
          placeholder="Masukan deskripsi berita"
          required
          showCount
          maxLength={1000}
          value={data?.deskripsi}
          onChangeText={(value) => setData({ ...data, deskripsi: value })}
        />

        <Spacing />
      </StackCustom>
      <Spacing />
    </OS_Wrapper>
  );
}
