import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { GStyles } from "@/styles/global-styles";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function DetailEvent() {
  const { id } = useLocalSearchParams();
  console.log("id event >", id);
  return (
    <ViewWrapper>
      <Text style={GStyles.textLabel}>Detail Event {id}</Text>
    </ViewWrapper>
  );
}
