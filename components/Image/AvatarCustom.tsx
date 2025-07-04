import { MainColor } from "@/constants/color-palet";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

type Size = "base" | "sm" | "md" | "lg" | "xl";

interface AvatarCustomProps {
  source?: ImageSourcePropType;
  size?: Size;
}

const sizeMap = {
  base: 40,
  sm: 60,
  md: 80,
  lg: 100,
  xl: 120,
};

export default function AvatarCustom({
  source = DUMMY_IMAGE.avatar,
  size = "base",
}: AvatarCustomProps) {
  const dimension = sizeMap[size];

  return (
    <Image
      source={source}
      style={[
        styles.overlappingAvatar,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        },
      ]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  overlappingAvatar: {
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: MainColor.white,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
