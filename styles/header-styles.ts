import { AccentColor } from "@/constants/color-palet";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { GStyles } from "./global-styles";

export const HeaderStyles: NativeStackNavigationOptions = {
  headerStyle: GStyles.headerStyle,
  headerTitleStyle: GStyles.headerTitleStyle,
  headerTitleAlign: "center",
  contentStyle: {
    borderBottomColor: AccentColor.blue,
  },
};
