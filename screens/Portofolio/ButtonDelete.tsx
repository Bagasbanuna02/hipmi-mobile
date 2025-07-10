import { ButtonCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";

export default function Portofolio_ButtonDelete() {
  const handleDelete = () => {
    console.log("Delete");
  };
  return (
    <ButtonCustom textColor={MainColor.white} iconLeft={<Ionicons name="trash-outline" size={20} color="white" />} onPress={handleDelete} backgroundColor={MainColor.red}>
      Hapus
    </ButtonCustom>
  );
}
