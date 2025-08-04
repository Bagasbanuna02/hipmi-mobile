import { AccentColor } from "@/constants/color-palet";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import ClickableCustom from "../Clickable/ClickableCustom";
import { router } from "expo-router";

export default function DummyLandscapeImage({height, unClickPath}: {height?: number, unClickPath?: boolean}) {
  return (
    <ClickableCustom
      onPress={() => {
        if (!unClickPath) {
          router.push("/(application)/(image)/preview-image/1");
        }
      }}
    >
      <Image source={DUMMY_IMAGE.background} style={[styles.backgroundImage, {height: height || 200}]} />
    </ClickableCustom>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: AccentColor.blue,
    backgroundColor: "white",
  },
});
