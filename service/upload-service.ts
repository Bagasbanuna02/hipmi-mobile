/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_BASE_URL, apiConfig } from "@/service/api-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

export async function uploadImageService({
  dirId,
  imageUri,
}: {
  dirId: string;
  imageUri: string | null;
}) {
  const token = await AsyncStorage.getItem("authToken");
  const url = `${API_BASE_URL}/mobile/upload`;

  console.log("url >>", url);

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

    console.log("Form data >>", JSON.stringify(formData, null, 2));

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000,
    });

    console.log("Response", JSON.stringify(response, null, 2));
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
