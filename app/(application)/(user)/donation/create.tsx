import {
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  LoaderCustom,
  SelectCustom,
  Spacing,
  StackCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import { dummyDonasiDurasi } from "@/lib/dummy-data/donasi/durasi";
import { dummyDonasiKategori } from "@/lib/dummy-data/donasi/kategori";
import { apiDonationCreate } from "@/service/api-client/api-donation";
import { apiMasterDonation } from "@/service/api-client/api-master";
import { uploadFileService } from "@/service/upload-service";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import pickFile from "@/utils/pickFile";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function DonationCreate() {
  const [listCategory, setListCategory] = useState<any[]>([]);
  const [listDuration, setListDuration] = useState<any[]>([]);
  const [loadList, setLoadList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [data, setData] = useState({
    kategoriId: "",
    title: "",
    target: "",
    durasiId: "",
  });

  const displayTarget = formatCurrencyDisplay(data.target);
  const handleChangeCurrency = (field: keyof typeof data) => (text: string) => {
    const numeric = text.replace(/\D/g, "");
    setData((prev) => ({ ...prev, [field]: numeric }));
  };

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [])
  );

  const onLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiMasterDonation({ category: "" });

      setListCategory(response.data.category);
      setListDuration(response.data.duration);
    } catch (error) {
      console.log(["ERROR"], error);
      setListCategory([]);
      setListDuration([]);
    } finally {
      setLoadList(false);
    }
  };

  const validateData = () => {
    if (!data.title || !data.target || !data.durasiId || !data.kategoriId) {
      Toast.show({
        type: "error",
        text1: "Harap isi semua data",
      });
      return false;
    }

    return true;
  };

  const handlerSubmit = async () => {
    if (!validateData()) {
      return;
    }
    try {
      setIsLoading(true);
      const responseUploadImage = await uploadFileService({
        imageUri: image,
        dirId: DIRECTORY_ID.donasi_image,
      });

      if (!responseUploadImage.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mengunggah gambar",
        });
        return;
      }

      const imageId = responseUploadImage.data.id;

      const newData = {
        title: data.title,
        target: data.target,
        durasiId: data.durasiId,
        kategoriId: data.kategoriId,
        imageId: imageId,
      };

      const response = await apiDonationCreate({
        data: newData,
        category: "temporary",
      });

      console.log("[RESPONSE]", JSON.stringify(response, null, 2));

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal membuat donasi",
        });
        return;
      }

      router.push(`/donation/create-story?id=${response.data.id}`);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Lengkapi semua data di bawah untuk selanjutnya mengisi cerita penggalangan dana." />

        <TextInputCustom
          label="Judul Donasi"
          placeholder="Masukkan Judul Donasi"
          required
          value={data.title}
          onChangeText={(value) => setData({ ...data, title: value })}
        />
        <TextInputCustom
          iconLeft="Rp."
          label="Target Donasi"
          placeholder="Masukkan Target Donasi"
          required
          keyboardType="numeric"
          value={displayTarget}
          onChangeText={handleChangeCurrency("target")}
        />

        <LandscapeFrameUploaded image={image || ""} />
        <ButtonCenteredOnly
          onPress={() => {
            pickFile({
              allowedType: "image",
              setImageUri: ({ uri }) => {
                setImage(uri);
              },
            });
          }}
          icon="upload"
        >
          Upload
        </ButtonCenteredOnly>
        <Spacing />

        {loadList ? (
          <LoaderCustom />
        ) : (
          <SelectCustom
            data={
              _.isEmpty(listCategory)
                ? []
                : listCategory?.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                  }))
            }
            label="Pilih Kategori Donasi"
            placeholder="Pilih Kategori Donasi"
            required
            value={data.kategoriId}
            onChange={(value: any) => setData({ ...data, kategoriId: value })}
          />
        )}

        {loadList ? (
          <LoaderCustom />
        ) : (
          <SelectCustom
            data={
              _.isEmpty(listDuration)
                ? []
                : listDuration?.map((item: any) => ({
                    label: item.name + `${" hari"}`,
                    value: item.id,
                  }))
            }
            label="Pilih Durasi Donasi"
            placeholder="Pilih Durasi Donasi"
            required
            value={data.durasiId}
            onChange={(value: any) => setData({ ...data, durasiId: value })}
          />
        )}

        <Spacing />
        <ButtonCustom
          isLoading={isLoading}
          onPress={() => {
            // handlerSubmit();
            router.push(`/donation/create-story?id=${"dasdsadsa"}`);
          }}
        >
          Selanjutnya
        </ButtonCustom>
        <Spacing />
      </StackCustom>
      <Spacing />
    </ViewWrapper>
  );
}
