import { BackButton, ViewWrapper } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function FileScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "File",
          headerLeft: () => <BackButton />,
        }}
      />
      <ViewWrapper>
        <FontAwesome
          name="file-pdf-o"
          size={300}
          style={{ alignSelf: "center" }}
          color={MainColor.white}
        />
      </ViewWrapper>
    </>
  );
}
