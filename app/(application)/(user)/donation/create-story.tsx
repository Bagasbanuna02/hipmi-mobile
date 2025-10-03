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
import { apiDonationGetOne } from "@/service/api-client/api-donation";
import { uploadFileService } from "@/service/upload-service";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function DonationCreateStory() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  console.log("[ID]", id);
  const [temporary, setTemporary] = useState<any>();
  const [data, setData] = useState({
    pembukaan: "",
    cerita: "",
    namaBank: "",
    rekening: "",
  });
  const [imageDonasi, setImageDonasi] = useState<string | null>(null);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      // const response = await apiDonationGetOne({
      //   id: id as string,
      //   category: "temporary",
      // });
      // console.log("[RES GET ONE]", JSON.stringify(response, null, 2));
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
      const responseUploadImageDonasi = await uploadFileService({
        imageUri: imageDonasi,
        dirId: DIRECTORY_ID.donasi_cerita_image,
      });

      const newData = {
        id: temporary?.id,
        title: temporary?.title,
        target: temporary?.target,
        donasiMaster_KategoriId: temporary?.donasiMaster_KategoriId,
        donasiMaster_DurasiId: temporary?.donasiMaster_DurasiId,
        authorId: user?.id,
        namaBank: data.namaBank,
        rekening: data.rekening,
        imageId: temporary?.imageId,
        CeritaDonasi: {
          pembukaan: data.pembukaan,
          cerita: data.cerita,
        },
      };
    } catch (error) {
      console.log("[ERROR]", error);
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

        <LandscapeFrameUploaded />
        <ButtonCenteredOnly
          onPress={() => {
            router.push("/(application)/(image)/take-picture/123");
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
        />
        <TextInputCustom
          label="Nomor Rekening"
          placeholder="Masukkan nomor rekening"
          required
        />

        <Spacing />
        <ButtonCustom
          onPress={() => {
            router.replace(`/donation/(tabs)/status`);
          }}
        >
          Simpan
        </ButtonCustom>
      </StackCustom>
      <Spacing />
    </ViewWrapper>
  );
}
