import { CenterCustom, TextCustom, ViewWrapper } from "@/components";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

export default function PreviewImage() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ViewWrapper>
      {id ? (
        <Image
          onLoad={() => {
            setIsLoading(false);
          }}
          source={
            isLoading
              ? require("@/assets/images/loading.gif")
              : API_STRORAGE.GET({ fileId: id as string })
          }
          contentFit="contain"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <CenterCustom>
          <TextCustom>File not found</TextCustom>
        </CenterCustom>
      )}
    </ViewWrapper>
  );
}
