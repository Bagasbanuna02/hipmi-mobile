import { GStyles } from "@/styles/global-styles";
import { StyleProp, View, ViewStyle } from "react-native";

export default function BoxButtonOnFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={GStyles.bottomBar}>
      <View style={[GStyles.bottomBarContainer, style]}>{children}</View>
    </View>
  );
}
