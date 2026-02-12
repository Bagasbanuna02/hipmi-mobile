import BaseBox from "@/components/Box/BaseBox";
import TextCustom from "@/components/Text/TextCustom";
import { AccentColor } from "@/constants/color-palet";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function AdminBasicBox({ children, onPress, style }: Props) {
  return (
    <>
      <BaseBox onPress={onPress} style={style}>
        {children}
      </BaseBox>
    </>
  );
}
