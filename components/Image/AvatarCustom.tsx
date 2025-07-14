/* eslint-disable @typescript-eslint/no-unused-vars */
import { MainColor } from "@/constants/color-palet";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Href, router } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Size = "base" | "sm" | "md" | "lg" | "xl";

interface AvatarCustomProps {
  source?: ImageSourcePropType;
  size?: Size;
  onPress?: () => void;
  href?: Href | undefined;
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
  onPress,
  href,
}: AvatarCustomProps) {
  const dimension = sizeMap[size];

  const ImageView = ({source}: {source: ImageSourcePropType}) => {
    return (
      <Image
        source={source}
        style={[
          // styles.overlappingAvatar,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
          },
        ]}
        resizeMode="cover"
      />
    )
  }

  return (
    <>
      {onPress || href ? (
        <TouchableOpacity
          onPress={href ? () => router.navigate(href as any) : onPress}
        >
          <ImageView source={source} />
        </TouchableOpacity>
      ) : (
        <ImageView source={source} />
      )}
    </>
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
    backgroundColor: MainColor.white_gray,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
