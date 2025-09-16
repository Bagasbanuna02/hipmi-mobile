import { AccentColor } from "@/constants/color-palet";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import ClickableCustom from "../Clickable/ClickableCustom";
import { router } from "expo-router";
import API_STRORAGE from "@/constants/base-url-api-strorage";

export default function DummyLandscapeImage({
  height,
  unClickPath,
  imageId,
}: {
  height?: number;
  unClickPath?: boolean;
  imageId?: string;
}) {
  return (
    <ClickableCustom
      onPress={() => {
        if (!unClickPath) {
          router.push(`/(application)/(image)/preview-image/${imageId}`);
        }
      }}
    >
      <Image
        source={
          imageId
            ? { uri: API_STRORAGE.GET({ fileId: imageId }) }
            : DUMMY_IMAGE.dummy_image
        }
        style={[styles.backgroundImage, { height: height || 200 }]}
      />
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
