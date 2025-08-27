import API_STRORAGE from "@/constants/base-url-api-strorage";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Href, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

type Size = "base" | "sm" | "md" | "lg" | "xl";

const sizeMap = {
  base: 40,
  sm: 60,
  md: 80,
  lg: 100,
  xl: 120,
};

interface AvatarCompProps {
  fileId?: string;
  size: Size;
  onPress?: () => void | any;
  href?: Href | undefined | any;
}

export default function AvatarComp({
  fileId,
  size,
  onPress,
  href = `/(application)/(image)/preview-image/${fileId}`,
}: AvatarCompProps) {
  const dimension = sizeMap[size];

  const avatarImage = () => {
    return (
      <Avatar.Image
        size={dimension}
        source={
          fileId ? { uri: API_STRORAGE.GET({ fileId }) } : DUMMY_IMAGE.avatar
        }
      />
    );
  };

  return (
    <>
      {onPress || href ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={
            href && fileId ? () => router.navigate(href as any) : onPress
          }
        >
          {avatarImage()}
        </TouchableOpacity>
      ) : (
        avatarImage()
      )}
    </>
  );
}
