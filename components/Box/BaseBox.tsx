import { AccentColor } from "@/constants/color-palet";
import { PADDING_EXTRA_SMALL, PADDING_MEDIUM, PADDING_SMALL } from "@/constants/constans-value";
import { StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";

interface BaseBoxProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  marginBottom?: number;
  padding?: number;
  paddingInline?: number;
  paddingBlock?: number;
}

export default function BaseBox({
  children,
  style,
  onPress,
  marginBottom = PADDING_MEDIUM,
  paddingBlock = PADDING_EXTRA_SMALL,
  paddingInline = PADDING_SMALL,
}: BaseBoxProps) {
  return (
    <>
      {onPress ? (
        <TouchableHighlight
          onPress={onPress}
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
          // activeOpacity={0.7}
        >
          <View>{children}</View>
        </TouchableHighlight>
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
