import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import TextInputCustom from "../TextInput/TextInputCustom";
import { Ionicons } from "@expo/vector-icons";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

interface SearchInputProps {
  placeholder?: string;
  onPress?: () => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  onChangeText?: (value: string) => void;
}
export default function SearchInput({
  placeholder,
  onPress,
  iconLeft,
  iconRight,
  containerStyle,
  style,
  onChangeText,
  ...props
}: SearchInputProps) {
  return (
    <TextInputCustom
      iconLeft={
        <Ionicons
          name="search-outline"
          size={ICON_SIZE_SMALL}
          color={MainColor.placeholder}
        />
      }
      onChangeText={onChangeText}
      placeholder={placeholder}
      borderRadius={50}
      containerStyle={[containerStyle, { marginBottom: 0 }]}
      {...props}
    />
  );
}
