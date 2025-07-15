import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import FloatingButton from "@/components/Button/FloatingButton";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { router } from "expo-router";
import { Text, TouchableHighlight, View } from "react-native";

export default function Event() {
  return (
    <ViewWrapper
      floatingButton={
        <FloatingButton onPress={() => router.push("/event/create")} />
      }
    >
      <TouchableHighlight onPress={() => router.push("/event/detail/1")}>
        <View
          style={{
            padding: 20,
            backgroundColor: MainColor.darkblue,
            borderRadius: 10,
            borderColor: AccentColor.blue,
            borderWidth: 1,
          }}
        >
          <Text style={GStyles.textLabel}>Event</Text>
        </View>
      </TouchableHighlight>
    </ViewWrapper>
  );
}
