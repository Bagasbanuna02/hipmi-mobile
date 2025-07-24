import { Alert } from "react-native";

export default function AlertDefaultSystem({
  title,
  message,
  textLeft,
  textRight,
  onPressLeft,
  onPressRight,
}: {
  title: string;
  message: string;
  textLeft: string;
  textRight: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}) {
  return Alert.alert(title, message, [
    {
      style: "cancel",
      text: textLeft,
      onPress: () => onPressLeft?.(),
    },
    {
      style: "default",
      text: textRight,
      isPreferred: true,
      onPress: () => onPressRight?.(),
    },
  ]);
}
