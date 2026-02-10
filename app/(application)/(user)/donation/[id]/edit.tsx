/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  LoaderCustom,
  NewWrapper,
  SelectCustom,
  Spacing,
  StackCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import ListSkeletonComponent from "@/components/_ShareComponent/ListSkeletonComponent";
import API_IMAGE from "@/constants/api-storage";
import DIRECTORY_ID from "@/constants/directory-id";
import {
  apiDonationGetOne,
  apiDonationUpdateData,
} from "@/service/api-client/api-donation";
import { apiMasterDonation } from "@/service/api-client/api-master";
import { uploadFileService } from "@/service/upload-service";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import pickFile from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

interface IEditDonation {
  donasiMaster_KategoriId: string;
  donasiMaster_DurasiId: string;
  title: string;
  target: string;
  imageId: string;
}

export default function DonationEdit() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<IEditDonation>({
    donasiMaster_DurasiId: "",
    donasiMaster_KategoriId: "",
    title: "",
    target: "",
    imageId: "",
  });

  const [image, setImage] = useState<string | null>(null);
  const [listCategory, setListCategory] = useState<any[]>([]);
  const [listDuration, setListDuration] = useState<any[]>([]);
  const [loadList, setLoadList] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);

  const displayTarget = formatCurrencyDisplay(data?.target);
  const handleChangeCurrency = (field: keyof typeof data) => (text: string) => {
    const numeric = text.replace(/\D/g, "");
    setData((prev: any) => ({ ...prev, [field]: numeric }));
  };

  useFocusEffect(
    useCallback(() => {
      onLoadData();
      onLoadList();
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetOne({
        id: id as string,
        category: "permanent",
      });

      if (response.success) {
        setData({
          donasiMaster_DurasiId: response.data.donasiMaster_DurasiId,
          donasiMaster_KategoriId: response.data.donasiMaster_KategoriId,
          title: response.data.title,
          target: response.data.target,
          imageId: response.data.imageId,
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

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

  const validateData = async () => {
    if (
      !data.donasiMaster_DurasiId ||
      !data.donasiMaster_KategoriId ||
      !data.title ||
      !data.target ||
      !data.imageId
    ) {
      Toast.show({
        type: "error",
        text1: "Harap lengkapi data",
      });

      return false;
    }

    return true;
  };

  const handlerSubmitUpdate = async () => {
    const isValid = await validateData();
    if (!isValid) {
      return;
    }

    try {
      let newData;

      newData = {
        ...data,
      };
      setLoading(true);

      if (image && image) {
        const uploadNewImage = await uploadFileService({
          dirId: DIRECTORY_ID.donasi_image,
          imageUri: image,
        });

        if (!uploadFileService) {
          Toast.show({
            type: "error",
            text1: "Gagal mengunggah gambar",
          });
          return;
        }

        newData = {
          ...data,
          newImageId: uploadNewImage.data.id,
        };
      }

      const response = await apiDonationUpdateData({
        id: id as string,
        data: newData,
        category: "edit-donation",
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.message,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Donasi berhasil diperbarui",
      });

      router.back();
    } catch (error) {
      console.log("[ERROR UPDATE DONASI]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewWrapper
      hideFooter
      footerComponent={
        <BoxButtonOnFooter>
          <ButtonCustom
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
      <InformationBox text="Lengkapi semua data di bawah untuk selanjutnya mengisi cerita penggalangan dana." />
      {!data || loadList ? (
        <ListSkeletonComponent />
      ) : (
        <StackCustom gap={"xs"}>
          <TextInputCustom
            label="Judul Donasi"
            placeholder="Masukkan Judul Donasi"
            required
            value={data?.title}
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

          <LandscapeFrameUploaded
            image={image ? image : API_IMAGE.GET({ fileId: data?.imageId })}
          />
          <ButtonCenteredOnly
            onPress={() => {
              pickFile({
                setImageUri: ({ uri }) => {
                  setImage(uri);
                },
                allowedType: "image",
              });
            }}
            icon="upload"
          >
            Upload
          </ButtonCenteredOnly>
          <Spacing />

          <SelectCustom
            data={
              _.isEmpty(listCategory)
                ? []
                : listCategory?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
            }
            label="Pilih Kategori Donasi"
            placeholder="Pilih Kategori Donasi"
            required
            value={data?.donasiMaster_KategoriId}
            onChange={(value: any) =>
              setData({ ...data, donasiMaster_KategoriId: value })
            }
          />

          <SelectCustom
            data={
              _.isEmpty(listDuration)
                ? []
                : listDuration?.map((item) => ({
                    label: item.name + " hari",
                    value: item.id,
                  }))
            }
            label="Pilih Durasi Donasi"
            placeholder="Pilih Durasi Donasi"
            required
            value={data?.donasiMaster_DurasiId}
            onChange={(value: any) =>
              setData({ ...data, donasiMaster_DurasiId: value })
            }
          />

          <Spacing />
        </StackCustom>
      )}
      <Spacing />
    </NewWrapper>
  );
}
