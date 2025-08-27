import { ViewWrapper } from "@/components";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";

export default function PreviewImage() {
  const { id } = useLocalSearchParams();
  return (
    <ViewWrapper>
      <Image source={API_STRORAGE.GET({ fileId: id as string })}  contentFit="contain" style={{ width: "100%", height: "100%" }}/>
    </ViewWrapper>
  );
}
