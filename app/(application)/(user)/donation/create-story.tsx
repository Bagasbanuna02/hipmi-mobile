/* eslint-disable react-hooks/exhaustive-deps */
import {
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import { useAuth } from "@/hooks/use-auth";
import {
  apiDonationCreate,
  apiDonationGetOne,
} from "@/service/api-client/api-donation";
import { uploadFileService } from "@/service/upload-service";
import pickFile from "@/utils/pickFile";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function DonationCreateStory() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [temporary, setTemporary] = useState<any>();
  const [data, setData] = useState({
    pembukaan: "",
    cerita: "",
    namaBank: "",
    rekening: "",
  });
  const [imageStory, setImageStory] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetOne({
        id: id as string,
        category: "temporary",
      });

      setTemporary(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerSubmit = async () => {
    if (_.values(data).includes("")) {
      Toast.show({
        type: "error",
        text1: "Harap isi semua data",
      });
      return;
    }

    try {
      setLoading(true);
      const responseUploadImageDonasi = await uploadFileService({
        imageUri: imageStory,
        dirId: DIRECTORY_ID.donasi_cerita_image,
      });

      const newData = {
        // Data Donasi
        temporaryId: temporary?.id,
        authorId: user?.id,
        title: temporary?.title,
        target: temporary?.target,
        donasiMaster_KategoriId: temporary?.donasiMaster_KategoriId,
        donasiMaster_DurasiId: temporary?.donasiMaster_DurasiId,
        imageId: temporary?.imageId,
        // Data Bank
        namaBank: data.namaBank,
        rekening: data.rekening,
        // Data Cerita
        imageCeritaId: responseUploadImageDonasi.data.id,
        pembukaan: data.pembukaan,
        cerita: data.cerita,
      };

      const response = await apiDonationCreate({
        data: newData,
        category: "permanent",
      });

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
      router.replace("/donation/status?status=review");
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Cerita Anda adalah kunci untuk menginspirasi kebaikan. Jelaskan dengan jujur dan jelas tujuan penggalangan dana ini agar calon donatur memahami dampak positif yang dapat mereka wujudkan melalui kontribusi mereka." />
        <TextAreaCustom
          label="Pembukaan Cerita"
          placeholder="Masukkan pembukaan cerita"
          required
          showCount
          maxLength={1000}
          value={data.pembukaan}
          onChangeText={(value) => setData({ ...data, pembukaan: value })}
        />
        <TextAreaCustom
          label="Tujuan Donasi"
          placeholder="Masukkan tujuan donasi"
          required
          showCount
          maxLength={1000}
          value={data.cerita}
          onChangeText={(value) => setData({ ...data, cerita: value })}
        />

        <LandscapeFrameUploaded image={imageStory || ""} />
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

        <Spacing height={40} />
        <InformationBox text="Pastikan Anda mengisi nama bank dan nomor rekening dengan benar. Informasi ini akan membantu admin memverifikasi dan memproses penggalangan dana Anda dengan cepat dan tepat setelah penggalangan dana dipublikasikan." />
        <TextInputCustom
          label="Nama Bank"
          placeholder="Masukkan nama bank"
          required
          value={data.namaBank}
          onChangeText={(value) => setData({ ...data, namaBank: value })}
        />
        <TextInputCustom
          label="Nomor Rekening"
          placeholder="Masukkan nomor rekening"
          required
          keyboardType="numeric"
          value={data.rekening}
          onChangeText={(value) => setData({ ...data, rekening: value })}
        />

        <Spacing />
        <ButtonCustom
          isLoading={isLoading}
          onPress={() => {
            handlerSubmit();
          }}
        >
          Simpan
        </ButtonCustom>
      </StackCustom>
      <Spacing />
    </ViewWrapper>
  );
}
