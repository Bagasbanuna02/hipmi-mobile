import { AlertDefaultSystem, ButtonCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import { apiDeletePortofolio } from "@/service/api-client/api-portofolio";
import { router } from "expo-router";

export default function Portofolio_ButtonDelete({
  id,
  isLoadingDelete,
  setIsLoadingDelete,
}: {
  id: string;
  isLoadingDelete: boolean;
  setIsLoadingDelete: (value: boolean) => void;
}) {
  const handleDelete = async () => {
    AlertDefaultSystem({
      title: "Hapus Portofolio",
      message: "Yakin ingin menghapus portofolio ini?",
      textLeft: "Batal",
      textRight: "Hapus",
      onPressRight: async () => {
        try {
          setIsLoadingDelete(true);
          const response = await apiDeletePortofolio({ id: id });
          console.log("Response portofolio >>", response);
          if (response.success) {
            console.log("Portofolio berhasil dihapus");
            router.back();
          }

          console.log("Gagal dihapus >>", response);
        } catch (error) {
          console.log("Error delete portofolio >>", error);
        } finally {
          setIsLoadingDelete(false);
        }
      },
    })
   
  };

  return (
    <ButtonCustom
      isLoading={isLoadingDelete}
      textColor={MainColor.white}
      iconLeft={<Ionicons name="trash-outline" size={20} color="white" />}
      onPress={handleDelete}
      backgroundColor={MainColor.red}
    >
      Hapus
    </ButtonCustom>
  );
}
