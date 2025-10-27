/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonCustom } from "@/components";
import pickImage from "@/utils/pickImage";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

// Daftar ekstensi yang diperbolehkan
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ButtonUpload({
  setImageUri,
}: {
  setImageUri: (uri: string) => void;
}) {
  const pickImg = async () => {
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
      aspect: [4, 3],
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

  return (
    <ButtonCustom
      iconLeft={<Feather name="upload" size={14} color="black" />}
      style={{
        width: 120,
        margin: "auto",
      }}
      onPress={() => {
        pickImage({
          setImageUri,
        });
      }}
    >
      Upload
    </ButtonCustom>
  );
}
