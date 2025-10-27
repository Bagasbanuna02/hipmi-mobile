import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Image } from "react-native";
import BaseBox from "../Box/BaseBox";

export default function LandscapeFrameUploaded({
  image,
}: {
  image?: string;
}) {
  return (
    <BaseBox
      style={{
        height: 250,
        width: "100%",
      }}
    >
      <Image
        source={image ? { uri: image } : DUMMY_IMAGE.dummy_image}
        resizeMode="cover"
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
      />
    </BaseBox>
  );
}
