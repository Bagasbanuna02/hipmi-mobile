import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Alert, Platform } from "react-native";

const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface IFileData {
  uri: string;
  name: string;
  size: number;
}

export type AllowedFileType = "image" | "pdf" | undefined;

export type AspectRatio = [number, number];

export interface PickFileOptions {
  setImageUri?: (file: IFileData) => void;
  setPdfUri?: (file: IFileData) => void;
  allowedType?: AllowedFileType; // <-- Tambahkan prop ini
  aspectRatio?: AspectRatio;
}

export default async function pickFile({
  setImageUri,
  setPdfUri,
  allowedType,
  aspectRatio,
}: PickFileOptions): Promise<void> {
  if (allowedType === "image") {
    if (aspectRatio) {
      await pickImage(setImageUri, aspectRatio);
    } else {
      // Jika tidak, tawarkan pilihan rasio (default [4,3])
      // 🚀 Hanya tampilkan pilihan rasio di ANDROID
      if (Platform.OS === "android") {
        showAspectRatioChoice(setImageUri);
      } else {
        // iOS: langsung buka galeri dengan default [4, 3]
        await pickImage(setImageUri, [4, 3]);
      }
    }
  } else if (allowedType === "pdf") {
    await pickPdf(setPdfUri);
  } else {
    // Mode fleksibel: tampilkan pilihan
    // Alert.alert(
    //   "Pilih Jenis File",
    //   "Pilih sumber file yang ingin diunggah:",
    //   [
    //     { text: "Batal", style: "cancel" },
    //     { text: "Dokumen (PDF)", onPress: () => pickPdf(setPdfUri) },
    //     { text: "Gambar", onPress: () => pickImage(setImageUri, aspectRatio) },
    //   ],
    //   { cancelable: true }
    // );
    if (Platform.OS === "android") {
      Alert.alert(
        "Pilih Jenis File",
        "Pilih sumber file yang ingin diunggah:",
        [
          { text: "Batal", style: "cancel" },
          { text: "Dokumen (PDF)", onPress: () => pickPdf(setPdfUri) },
          { text: "Gambar", onPress: () => showAspectRatioChoice(setImageUri) },
        ],
        { cancelable: true }
      );
    } else {
      // iOS: Langsung pakai default [4,3] untuk gambar
      Alert.alert(
        "Pilih Jenis File",
        "Pilih sumber file yang ingin diunggah:",
        [
          { text: "Batal", style: "cancel" },
          { text: "Dokumen (PDF)", onPress: () => pickPdf(setPdfUri) },
          { text: "Gambar", onPress: () => pickImage(setImageUri, [4, 3]) },
        ],
        { cancelable: true }
      );
    }
  }
}

function showAspectRatioChoice(setImageUri?: (file: IFileData) => void) {
  Alert.alert(
    "Pilih Rasio Gambar",
    "Pilih rasio crop yang diinginkan:",
    [
      { text: "Batal", style: "cancel" },
      {
        text: "1:1 (Kotak)",
        onPress: () => pickImage(setImageUri, [1, 1]),
      },
      // {
      //   text: "4:3 (Default)",
      //   onPress: () => pickImage(setImageUri, [4, 3]),
      // },
      // {
      //   text: "9:16 (Landscape)",
      //   onPress: () => pickImage(setImageUri, [9, 16]),
      // },
      {
        text: "3:4 (Potret)",
        onPress: () => pickImage(setImageUri, [3, 4]),
      },
    ],
    { cancelable: true }
  );
}

// --- Fungsi internal: pickImage ---
async function pickImage(
  setImageUri?: (file: IFileData) => void,
  aspectRatio: AspectRatio = [4, 3] // Default [4, 3]
) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Izin Ditolak",
      "Izinkan akses ke galeri untuk memilih gambar."
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: aspectRatio, // 🎯 Gunakan rasio dinamis
    quality: 1,
  });

  if (result.canceled || !result.assets?.[0]) return;

  const asset = result.assets[0];
  const uri = asset.uri;
  const filename = uri.split("/").pop() || `image_${Date.now()}.jpg`;
  const size = asset.fileSize ?? 0;

  if (size > MAX_FILE_SIZE) {
    Alert.alert("File Terlalu Besar", "Ukuran maksimal adalah 5MB.");
    return;
  }

  const extMatch = /\.(\w+)$/.exec(filename.toLowerCase());
  const extension = extMatch ? extMatch[1] : "jpg";

  if (!ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
    Alert.alert(
      "Format Tidak Didukung",
      "Hanya JPG, JPEG, dan PNG yang diperbolehkan."
    );
    return;
  }

  setImageUri?.({ uri, name: filename, size });
}

// --- Fungsi internal: pickPdf ---
async function pickPdf(setPdfUri?: (file: IFileData) => void) {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf", // Hanya PDF
    copyToCacheDirectory: true,
  });

  if (result.canceled || !result.assets?.[0]) return;

  const asset = result.assets[0];
  const { uri, name, size } = asset;
  const filename = name || `document_${Date.now()}.pdf`;
  const fileSize = size ?? 0;

  if (fileSize > MAX_FILE_SIZE) {
    Alert.alert("File Terlalu Besar", "Ukuran maksimal adalah 5MB.");
    return;
  }

  // Validasi ekstensi (extra safety)
  const extMatch = /\.(\w+)$/.exec(filename.toLowerCase());
  if (extMatch?.[1] !== "pdf") {
    Alert.alert("File Tidak Valid", "Hanya file PDF yang diperbolehkan.");
    return;
  }

  setPdfUri?.({ uri, name: filename, size: fileSize });
}
