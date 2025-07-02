import { Ionicons } from "@expo/vector-icons";
import { MainColor } from "@/constants/color-palet";
import { router } from "expo-router";

const BackButton = () => {
  return (
    <Ionicons
      name="arrow-back"
      size={20}
      color={MainColor.yellow}
      onPress={() => router.back()}
    />
  );
};

export default BackButton;
