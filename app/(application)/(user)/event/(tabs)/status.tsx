import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { GStyles } from "@/styles/global-styles";
import { Text } from "react-native";

export default function Status() {
  return (
    <ViewWrapper>
      <Text style={GStyles.textLabel}>Status</Text>
    </ViewWrapper>
  );
}
