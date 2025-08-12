import ActionIcon from "@/components/ActionIcon/ActionIcon";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function AdminActionIconPlus({
  onPress,
}: {
  onPress?: () => void;
}) {
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <ActionIcon
          icon={<Ionicons name="add" size={ICON_SIZE_SMALL} color="black" />}
          onPress={onPress}
        />
      </View>
    </>
  );
}
