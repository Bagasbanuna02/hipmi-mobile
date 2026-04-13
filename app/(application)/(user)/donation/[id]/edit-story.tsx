/* eslint-disable react-hooks/exhaustive-deps */
import {
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextAreaCustom,
} from "@/components";
import API_IMAGE from "@/constants/api-storage";
import DIRECTORY_ID from "@/constants/directory-id";
import {
  apiDonationGetOne,
  apiDonationUpdateData,
} from "@/service/api-client/api-donation";
import { uploadFileService } from "@/service/upload-service";
import pickFile from "@/utils/pickFile";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function DonationEditStory() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>();
  const [imageStory, setImageStory] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetOne({
        id: id as string,
        category: "permanent",
      });

      setData(response.data.CeritaDonasi);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerSubmitUpdate = async () => {
    let newData;
    try {
      setLoading(true);

      newData = {
        ...data,
      };

      if (imageStory) {
        const responseUploadImageDonasi = await uploadFileService({
          imageUri: imageStory,
          dirId: DIRECTORY_ID.donasi_cerita_image,
        });

        newData = {
          ...data,
          newImageId: responseUploadImageDonasi.data.id,
        };
      }

      const response = await apiDonationUpdateData({
        id: id as string,
        data: newData,
        category: "edit-story",
      });

      console.log("[RESPONSE]", JSON.stringify(response, null, 2));

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal membuat donasi",
        });
      }

      Toast.show({
        type: "success",
        text1: "Donasi berhasil disimpan",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OS_Wrapper enableKeyboardHandling contentPaddingBottom={250}>
      <StackCustom gap={"xs"}>
        <InformationBox text="Cerita Anda adalah kunci untuk menginspirasi kebaikan. Jelaskan dengan jujur dan jelas tujuan penggalangan dana ini agar calon donatur memahami dampak positif yang dapat mereka wujudkan melalui kontribusi mereka." />
        <TextAreaCustom
          label="Pembukaan Cerita"
          placeholder="Masukkan pembukaan cerita"
          required
          showCount
          maxLength={1000}
          value={data?.pembukaan}
          onChangeText={(value) => setData({ ...data, pembukaan: value })}
        />

        <LandscapeFrameUploaded
          image={
            imageStory ? imageStory : API_IMAGE.GET({ fileId: data?.imageId })
          }
        />
        <ButtonCenteredOnly
          onPress={() => {
            pickFile({
              allowedType: "image",
              setImageUri: ({ uri }) => {
                setImageStory(uri);
              },
            });
          }}
          icon="upload"
        >
          Upload
        </ButtonCenteredOnly>
        <Spacing />
        <TextAreaCustom
          label="Tujuan Donasi"
          placeholder="Masukkan tujuan donasi"
          required
          showCount
          maxLength={1000}
          value={data?.cerita}
          onChangeText={(value) => setData({ ...data, cerita: value })}
        />

        <Spacing height={40} />
        <ButtonCustom
          isLoading={isLoading}
          onPress={() => {
            handlerSubmitUpdate();
          }}
        >
          Update
        </ButtonCustom>
      </StackCustom>
      <Spacing />
    </OS_Wrapper>
  );
}
