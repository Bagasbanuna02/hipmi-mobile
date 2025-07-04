import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Image } from "react-native";
import BaseBox from "../Box/BaseBox";

export default function LandscapeFrameUploaded() {
  return (
    <BaseBox
      style={{
        height: 250,
        width: "100%",
      }}
    >
      <Image
        source={DUMMY_IMAGE.background}
        resizeMode="cover"
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
      />
    </BaseBox>
  );
}
