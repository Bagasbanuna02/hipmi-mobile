import { AccentColor } from "@/constants/color-palet";
import {
  PADDING_MEDIUM,
  PADDING_SMALL
} from "@/constants/constans-value";
import { Href, router } from "expo-router";
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

interface BaseBoxProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  href?: Href;
  onPress?: () => void;
  marginBottom?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingInline?: number;
  paddingBlock?: number;
}

export default function BaseBox({
  children,
  style,
  href,
  onPress,
  marginBottom = PADDING_MEDIUM,
  paddingBlock = PADDING_MEDIUM,
  paddingInline = PADDING_SMALL,
  paddingTop = PADDING_MEDIUM,
  paddingBottom = PADDING_MEDIUM,
}: BaseBoxProps) {

  return (
    <>
      {onPress || href ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={href ? () => router.navigate(href) : onPress}
          style={[
            {
              backgroundColor: AccentColor.darkblue,
              borderColor: AccentColor.blue,
              borderWidth: 1,
              borderRadius: 10,
              marginBottom,
              paddingBlock,
              paddingInline,
              paddingTop,
              paddingBottom,
            },
            style,
          ]}
        >
          <View>{children}</View>
        </TouchableOpacity>
      ) : (
        <View
          style={[
            {
              backgroundColor: AccentColor.darkblue,
              borderColor: AccentColor.blue,
              borderWidth: 1,
              borderRadius: 10,
              marginBottom,
              paddingBlock,
              paddingInline,
            },
            style,
          ]}
        >
          {children}
        </View>
      )}
    </>
  );
}
