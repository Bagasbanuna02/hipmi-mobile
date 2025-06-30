import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { Styles } from "@/styles/global-styles";
import { Text } from "react-native";

export default function Status() {
  return (
    <ViewWrapper>
      <Text style={Styles.textLabel}>Status</Text>
    </ViewWrapper>
  );
}
