/* eslint-disable no-unused-expressions */
import { ButtonCustom, StackCustom, ViewWrapper } from "@/components";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Image } from "react-native";

export default function ScreenViewImage() {
  const [dataId, setDataId] = useState<string | null>(null);
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("idImage").then((id) => {
        setDataId(id || null);
      });
    }, [])
  );

  return (
    <ViewWrapper>
      <StackCustom>
        {dataId ? (
          <Image
            onLoad={() => {
              <ActivityIndicator size="large" />
            }}
            source={{ uri: APIs.GET({ fileId: dataId }) }}
            style={{
              width: 200,
              height: 200,
              margin: "auto",
            }}
          />
        ) : (
          <Image
            source={DUMMY_IMAGE.avatar}
            style={{
              width: 200,
              height: 200,
              margin: "auto",
            }}
          />
        )}

        <ButtonCustom onPress={async () => {
            await AsyncStorage.removeItem("idImage");
            router.push("/coba/screen-upload");
        }}>
          Upload image
        </ButtonCustom>
      </StackCustom>
    </ViewWrapper>
  );
}

const APIs = {
  /**
   *
   * @param fileId | file id from wibu storage , atau bisa disimpan di DB
   * @param size | file size 10 - 1000 , tergantung ukuran file dan kebutuhan saar di tampilkan
   * @type {string}
   */
  GET: ({ fileId, size }: { fileId: string; size?: string }) =>
    size
      ? `https://wibu-storage.wibudev.com/api/files/${fileId}-size-${size}`
      : `https://wibu-storage.wibudev.com/api/files/${fileId}`,

  /**
   * @type {string}
   * @returns alamat API dari wibu storage
   */
  GET_NO_PARAMS: "https://wibu-storage.wibudev.com/api/files/",
};
