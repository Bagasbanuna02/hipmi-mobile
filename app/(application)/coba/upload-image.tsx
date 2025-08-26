import { apiConfig } from "@/service/api-config";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Text,
  View,
} from "react-native";

// Daftar ekstensi yang diperbolehkan
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function UploadImage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access your media library"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled || !result.assets[0]?.uri) {
      return;
    }

    const uri = result.assets[0].uri;
    const filename = uri.split("/").pop()?.toLowerCase() || "";
    const match = /\.(\w+)$/.exec(filename);
    const extension = match ? match[1] : "";

    // Validasi ekstensi
    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      Alert.alert(
        "File Tidak Valid",
        "Hanya file JPG, JPEG, dan PNG yang diperbolehkan."
      );
      return;
    }

    // Opsional: Validasi ukuran file (jika metadata tersedia)
    // Catatan: Di Expo, `file.size` mungkin tidak tersedia di semua platform
    const asset = result.assets[0];
    if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE) {
      Alert.alert("File Terlalu Besar", "Ukuran file maksimal adalah 5MB.");
      return;
    }

    // Jika lolos validasi, simpan URI
    setImageUri(uri);
  };

  const uploadImage = async () => {
    if (!imageUri) return;

    setUploading(true);

    const uri = imageUri;
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename || "");
    const type = match ? `image/${match[1]}` : "image";
    const dirId = "cmeryhudo016lbpnn3vlhnufq";

    const formData = new FormData();
    // @ts-ignore: React Native tidak mengenal Blob secara langsung
    formData.append("file", {
      uri,
      name: filename,
      type,
    });
    formData.append("dirId", dirId);

    try {
      const response = await apiConfig.post("/mobile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      console.log("Response", JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log("Error", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Button title="Pilih Gambar" onPress={pickImage} />

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 300, height: 300, margin: "auto" }}
        />
      )}

      {imageUri && !uploading && (
        <Button
          title="Unggah Gambar"
          onPress={uploadImage}
          disabled={uploading}
        />
      )}

      {uploading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Mengunggah...</Text>
        </View>
      )}
    </View>
  );
}
