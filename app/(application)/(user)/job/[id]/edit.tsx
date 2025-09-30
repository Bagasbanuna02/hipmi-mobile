/* eslint-disable react-hooks/exhaustive-deps */
import {
    BaseBox,
    ButtonCenteredOnly,
    ButtonCustom,
    DummyLandscapeImage,
    InformationBox,
    LandscapeFrameUploaded,
    LoaderCustom,
    Spacing,
    StackCustom,
    TextAreaCustom,
    TextInputCustom,
    ViewWrapper,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import { apiJobGetOne, apiJobUpdateData } from "@/service/api-client/api-job";
import {
    deleteFileService,
    uploadFileService,
} from "@/service/upload-service";
import pickImage from "@/utils/pickImage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function JobEdit() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>({
    title: "",
    content: "",
    deskripsi: "",
  });
  const [isLoadData, setIsLoadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      setIsLoadData(true);
      const response = await apiJobGetOne({ id: id as string });
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  };

  const handlerOnUpdate = async () => {
    if (!data.title || !data.content || !data.deskripsi) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Harap isi semua data",
      });
      return;
    }

    try {
      setIsLoading(true);
      let newImageId = "";

      if (imageUri) {
        const responseUploadImage = await uploadFileService({
          imageUri: imageUri,
          dirId: DIRECTORY_ID.job_image,
        });

        if (responseUploadImage.success) {
          newImageId = responseUploadImage.data.id;
        }
      }

      if (data?.imageId) {
        const responseDeleteImage = await deleteFileService({
          id: data.imageId,
        });

        if (!responseDeleteImage.success) {
          console.log("[ERROR DELETE IMAGE]", responseDeleteImage.message);
        }
      }

      const newData = {
        title: data.title,
        content: data.content,
        deskripsi: data.deskripsi,
        imageId: newImageId,
      };

      const response = await apiJobUpdateData({
        id: id as string,
        data: newData,
        category: "edit",
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        router.back();
      } else {
        Toast.show({
          type: "info",
          text1: "Info",
          text2: response.message,
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = () => {
    return (
      <>
        <ButtonCustom isLoading={isLoading} onPress={() => handlerOnUpdate()}>
          Update
        </ButtonCustom>
        <Spacing />
      </>
    );
  };

  return (
    <ViewWrapper>
      {isLoadData ? (
        <LoaderCustom />
      ) : (
        <StackCustom gap={"xs"}>
          <InformationBox text="Poster atau gambar lowongan kerja bersifat opsional, tidak wajib untuk dimasukkan dan upload lah gambar yang sesuai dengan deskripsi lowongan kerja." />

          {imageUri ? (
            <LandscapeFrameUploaded image={imageUri as any} />
          ) : (
            <BaseBox>
              <DummyLandscapeImage imageId={data?.imageId} />
            </BaseBox>
          )}

          <ButtonCenteredOnly
            onPress={() => {
              pickImage({
                setImageUri,
              });
            }}
            icon="upload"
          >
            Upload
          </ButtonCenteredOnly>

          <Spacing />

          <TextInputCustom
            label="Judul Lowongan"
            placeholder="Masukan Judul Lowongan Kerja"
            required
            value={data.title}
            onChangeText={(value) => setData({ ...data, title: value })}
          />

          <TextAreaCustom
            label="Syarat & Kualifikasi"
            placeholder="Masukan Syarat & Kualifikasi Lowongan Kerja"
            required
            showCount
            maxLength={1000}
            value={data.content}
            onChangeText={(value) => setData({ ...data, content: value })}
          />

          <TextAreaCustom
            label="Deskripsi Lowongan"
            placeholder="Masukan Deskripsi Lowongan Kerja"
            required
            showCount
            maxLength={1000}
            value={data.deskripsi}
            onChangeText={(value) => setData({ ...data, deskripsi: value })}
          />

          {buttonSubmit()}
        </StackCustom>
      )}
    </ViewWrapper>
  );
}
