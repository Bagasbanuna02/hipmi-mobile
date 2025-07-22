import { ButtonCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";

export default function Portofolio_ButtonDelete({
  setShowDeleteAlert,
}: {
  setShowDeleteAlert: (value: boolean) => void;
}) {
  const handleDelete = () => {
    setShowDeleteAlert(true);
  };
  return (
    <ButtonCustom textColor={MainColor.white} iconLeft={<Ionicons name="trash-outline" size={20} color="white" />} onPress={handleDelete} backgroundColor={MainColor.red}>
      Hapus
    </ButtonCustom>
  );
}
