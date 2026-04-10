import { OS_Wrapper } from "@/components";
import { GStyles } from "@/styles/global-styles";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function DetailEvent() {
  const { id } = useLocalSearchParams();
  console.log("id event >", id);
  return (
    <OS_Wrapper>
      <Text style={GStyles.textLabel}>Detail Event {id}</Text>
    </OS_Wrapper>
  );
}
