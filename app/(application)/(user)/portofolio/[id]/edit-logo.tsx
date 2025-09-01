import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  ViewWrapper
} from "@/components";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DIRECTORY_ID from "@/constants/directory-id";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { useAuth } from "@/hooks/use-auth";
import { apiFileDelete } from "@/service/api-client/api-file";
import {
  apiGetOnePortofolio,
  apiUpdatePortofolio,
} from "@/service/api-client/api-portofolio";
import { uploadImageService } from "@/service/upload-service";
import pickImage from "@/utils/pickImage";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function PortofolioEditLogo() {
  const { id } = useLocalSearchParams();
  const [logoId, setLogoId] = useState<any>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    onLoadData(id as string);
  }, [id]);

  const onLoadData = async (id: string) => {
    const response = await apiGetOnePortofolio({ id: id });
    console.log(
      "Response portofolio >>",
      JSON.stringify(response.data.logoId, null, 2)
    );
    setLogoId(response.data.logoId);
  };

  async function onUpload() {
    try {
      setIsLoading(true);

      const response = await uploadImageService({
        imageUri,
        dirId: DIRECTORY_ID.portofolio_logo,
      });

      if (response.success) {
        const fileId = response.data.id;
        const responseUpdate = await apiUpdatePortofolio({
          id: id as string,
          data: { fileId },
          category: "logo",
        });

        if (!responseUpdate.success) {
          Toast.show({
            type: "error",
            text1: "Info",
            text2: responseUpdate.message,
          });
          return;
        }

        if (logoId) {
          const deletePrevFile = await apiFileDelete({
            token: token as string,
            id: logoId as string,
          });

          if (!deletePrevFile.success) {
            console.log("error delete prev file >>", deletePrevFile.message);
          }
        }

        Toast.show({
          type: "success",
          text1: "Sukses",
          text2: "Logo berhasil diupdate",
        });

        router.back();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error as string,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const image = imageUri ? (
    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
  ) : (
    <Image
      source={
        logoId
          ? { uri: API_STRORAGE.GET({ fileId: logoId }) }
          : DUMMY_IMAGE.avatar
      }
      style={{ width: 200, height: 200 }}
    />
  );

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoading}
        disabled={isLoading}
        onPress={() => {
          onUpload();
        }}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper footerComponent={buttonFooter}>
        <BaseBox
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 250,
          }}
        >
          {image}
        </BaseBox>
        <ButtonCenteredOnly
          icon="upload"
          onPress={() => {
            pickImage({
              setImageUri,
            });
          }}
        >
          Upload
        </ButtonCenteredOnly>
      </ViewWrapper>
    </>
  );
}
