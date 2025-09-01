import { API_BASE_URL } from "@/service/api-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFileUpload } from "./api-client/api-file";

export async function uploadImageService({
  dirId,
  imageUri,
}: {
  dirId: string;
  imageUri: string | null;
}) {
  const token = await AsyncStorage.getItem("authToken");
  const url = `${API_BASE_URL}/mobile/file`;

  console.log("url >>", url);

  if (!imageUri) {
    throw new Error("Harap pilih gambar terlebih dahulu");
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

    const response = await apiFileUpload({
      token: token as string,
      formData,
    });

    console.log("Response upload file >>", JSON.stringify(response, null, 2));

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw error;
  }
}
