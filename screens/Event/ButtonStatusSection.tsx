import { ButtonCustom } from "@/components";
import { View } from "react-native";

export default function Event_ButtonStatusSection({
  detail,
}: {
  detail: string;
}) {
  return (
    <>
      {detail && detail === "draft" && (
        <View>
          <ButtonCustom>Ajukan Review</ButtonCustom>
          <ButtonCustom backgroundColor="red">Hapus</ButtonCustom>
        </View>
      )}
    </>
  );
}
