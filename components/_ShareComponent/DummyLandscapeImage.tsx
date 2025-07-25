import { AccentColor } from "@/constants/color-palet";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import ClickableCustom from "../Clickable/ClickableCustom";
import { router } from "expo-router";

export default function DummyLandscapeImage() {
  return (
    <ClickableCustom
      onPress={() => {
        router.push("/(application)/(image)/preview-image/1");
      }}
    >
      <Image source={DUMMY_IMAGE.background} style={styles.backgroundImage} />
    </ClickableCustom>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: 200, // Tinggi background sesuai kebutuhan
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: AccentColor.blue,
    backgroundColor: "white",
  },
});
