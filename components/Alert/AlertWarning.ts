import { Alert } from "react-native";

export default function AlertWarning({
  title = "Peringatan Bagi Pengguna !",
  description = "Konten yang Anda masukkan mengandung kata-kata yang tidak sesuai dengan pedoman komunitas kami. Mohon gunakan bahasa yang sopan dan menghargai sesama pengguna. Jika kata tersebut sebenarnya lumrah, mohon maaf—kemungkinan sistem kami belum mengenalnya sebagai wajar.",
}: {
  title?: string 
  description?: string;
}) {
  return Alert.alert(title, description, [
    {
      text: "Tutup",
      onPress: () => {},
    },
  ]);
}
