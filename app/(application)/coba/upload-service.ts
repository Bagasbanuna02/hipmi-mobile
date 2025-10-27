/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiConfig } from "@/service/api-config";
import Toast from "react-native-toast-message";

export default async function tryUploadService({
  dirId,
  imageUri,
}: {
  dirId: string;
  imageUri: string | null;
}) {
  if (!imageUri) {
    Toast.show({
      type: "error",
      text1: "Gagal",
      text2: "Harap pilih gambar terlebih dahulu",
    });
    return;
  }

  try {
    const uri = imageUri;
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename || "");
    const type = match ? `image/${match[1]}` : "image";

    const formData = new FormData();
    // @ts-ignore: React Native tidak mengenal Blob secara langsung
    formData.append("file", {
      uri,
      name: filename,
      type,
    });
    formData.append("dirId", dirId);

    const response = await apiConfig.post("/mobile/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
    });

    console.log("Response", JSON.stringify(response.data, null, 2));
    const { data } = response;

    if (!data.success) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: data.message,
      });

      return;
    }

    Toast.show({
      type: "success",
      text1: "File berhasil diunggah",
    });

    return data;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "File gagal diunggah",
    });
  }
}
