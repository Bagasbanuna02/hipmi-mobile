import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import TextInputCustom from "../TextInput/TextInputCustom";
import { Ionicons } from "@expo/vector-icons";
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from "react-native";

interface SearchInputProps {
  placeholder?: string;
  onPress?: () => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  onChangeText?: (value: string) => void;
  value?: string;
  disabled?: boolean;
}
export default function SearchInput({
  placeholder,
  onPress,
  iconLeft,
  iconRight,
  containerStyle,
  style,
  onChangeText,
  value,
  disabled,
  ...props
}: SearchInputProps) {
  return (
    <TextInputCustom
      iconLeft={
        <Ionicons
          name="search-outline"
          size={ICON_SIZE_SMALL}
          color={disabled ? MainColor.white_gray : MainColor.placeholder}
        />
      }
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      borderRadius={50}
      containerStyle={[disabled ? styleses.disabled : styleses.containerStyle]}
      disabled={disabled}
      {...props}
    />
  );
}

const styleses = StyleSheet.create({
  containerStyle: { width: "100%", marginBottom: 0 },
  disabled: { width: "100%", marginBottom: 0, color: MainColor.white_gray },
});
