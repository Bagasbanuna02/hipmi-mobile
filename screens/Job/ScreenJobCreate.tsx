import {
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  PageWrapper,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
} from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import { useAuth } from "@/hooks/use-auth";
import { apiJobCreate } from "@/service/api-client/api-job";
import { uploadFileService } from "@/service/upload-service";
import pickImage from "@/utils/pickImage";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

interface JobCreateData {
  title: string;
  content: string;
  deskripsi: string;
  authorId: string;
}

export function Job_ScreenCreate() {
  const nextUrl = "/(application)/(user)/job/(tabs)/status?status=review";
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [data, setData] = useState<JobCreateData>({
    title: "",
    content: "",
    deskripsi: "",
    authorId: "",
  });

  const handlerOnSubmit = async () => {
    let imageId = "";
    const newData = {
      title: data.title,
      content: data.content,
      deskripsi: data.deskripsi,
      authorId: user?.id,
      imageId: "",
    };

    if (!data.title || !data.content || !data.deskripsi || !user?.id) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Harap isi semua data",
      });
      return;
    }

    try {
      setIsLoading(true);

      if (image === null || !image) {
        const response = await apiJobCreate(newData);
        if (response.success) {
          Toast.show({
            type: "success",
            text1: "Berhasil",
            text2: "Lowongan berhasil dibuat",
          });
          router.replace(nextUrl);
        }

        return;
      }

      const responseUploadImage = await uploadFileService({
        imageUri: image,
        dirId: DIRECTORY_ID.job_image,
      });

      if (responseUploadImage.success) {
        imageId = responseUploadImage.data.id;
      }

      const fixData = {
        ...newData,
        imageId: imageId,
      };

      const response = await apiJobCreate(fixData);
      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Lowongan berhasil dibuat",
        });
        router.replace(nextUrl);
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
        <BoxButtonOnFooter>
          <ButtonCustom isLoading={isLoading} onPress={() => handlerOnSubmit()}>
            Simpan
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  };

  return (
    <PageWrapper
      enableKeyboardHandling
      keyboardScrollOffset={100}
      footerComponent={buttonSubmit()}
    >
      <StackCustom gap={"xs"}>
        <InformationBox text="Poster atau gambar lowongan kerja bersifat opsional, tidak wajib untuk dimasukkan dan upload lah gambar yang sesuai dengan deskripsi lowongan kerja." />

        <LandscapeFrameUploaded image={image as string} />
        <ButtonCenteredOnly
          onPress={() => {
            pickImage({
              setImageUri: setImage,
            });
          }}
          icon="upload"
        >
          Upload
        </ButtonCenteredOnly>

        <Spacing />

        <View onStartShouldSetResponder={() => true}>
          <TextInputCustom
            label="Judul Lowongan"
            placeholder="Masukan Judul Lowongan Kerja"
            required
            value={data.title}
            onChangeText={(value) => setData({ ...data, title: value })}
          />
        </View>

        <View onStartShouldSetResponder={() => true}>
          <TextAreaCustom
            label="Syarat & Kualifikasi"
            placeholder="Masukan Syarat & Kualifikasi Lowongan Kerja"
            required
            showCount
            maxLength={1000}
            value={data.content}
            onChangeText={(value) => setData({ ...data, content: value })}
          />
        </View>

        <View onStartShouldSetResponder={() => true}>
          <TextAreaCustom
            label="Deskripsi Lowongan"
            placeholder="Masukan Deskripsi Lowongan Kerja"
            required
            showCount
            maxLength={1000}
            value={data.deskripsi}
            onChangeText={(value) => setData({ ...data, deskripsi: value })}
          />
        </View>
      </StackCustom>
    </PageWrapper>
  );
}
