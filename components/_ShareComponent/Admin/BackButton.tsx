import ActionIcon from "@/components/ActionIcon/ActionIcon";
import { MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AdminBackButton() {
  return (
    <ActionIcon
      icon={<Ionicons name="arrow-back" size={16} color={MainColor.darkblue} />}
      onPress={() => router.back()}
    />
  );
}