import { AccentColor } from "@/constants/color-palet";
import { StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";

interface BaseBoxProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  marginBottom?: number;
  padding?: number;
  paddingInline?: number;
}

export default function BaseBox({
  children,
  style,
  onPress,
  marginBottom = 16,
  padding = 12,
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
              padding,
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
              padding,
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
