import { CenterCustom, TextCustom, ViewWrapper } from "@/components";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import { MainColor } from "@/constants/color-palet";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function PreviewImage() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ViewWrapper>
      {id ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Main Image */}
          <Image
            onLoad={() => {
              setIsLoading(false);
            }}
            source={API_STRORAGE.GET({ fileId: id as string })}
            contentFit="contain"
            style={{ width: "100%", height: "100%" }}
            // placeholder={require("@/assets/images/loading.gif")}
          />

          {/* Custom Loader Overlay */}
          {isLoading && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: MainColor.darkblue,
                zIndex: 1,
                opacity: 0.5,
              }}
            >
              <Image
                source={require("@/assets/images/loading.gif")}
                contentFit="contain"
                style={{ width: 60, height: 60 }}
              />
            </View>
          )}
        </View>
      ) : (
        <CenterCustom>
          <TextCustom>File not found</TextCustom>
        </CenterCustom>
      )}
    </ViewWrapper>
  );
}
