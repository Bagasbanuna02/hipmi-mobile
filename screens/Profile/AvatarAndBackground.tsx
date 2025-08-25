import { AvatarCustom, ClickableCustom } from "@/components";
import { AccentColor } from "@/constants/color-palet";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { router } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";

const AvatarAndBackground = ({
  backgroundId,
  imageId,
}: {
  backgroundId: string;
  imageId: string;
}) => {
  return (
    // console.log("backgroundId", backgroundId),
    // console.log("imageId", imageId),
    <View style={styles.container}>
      {/* Background Image */}
      <ClickableCustom
        onPress={() => {
          router.navigate(
            `/(application)/(image)/preview-image/${backgroundId}`
          );
        }}
      >
        <ImageBackground
          source={DUMMY_IMAGE.background}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </ClickableCustom>

      {/* Avatar yang sedikit keluar */}

      <View style={styles.avatarOverlap}>
        <ClickableCustom
          onPress={() => {
            router.navigate(
              `/(application)/(image)/preview-image/${imageId}`
            );
          }}
        >
          <AvatarCustom source={DUMMY_IMAGE.avatar} size="lg" />
        </ClickableCustom>
      </View>
    </View>
  );
};

export default AvatarAndBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: 150, // Tinggi background sesuai kebutuhan
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: AccentColor.blue,
    backgroundColor: "white",
  },
  avatarOverlap: {
    position: "absolute", // Meletakkan avatar di atas background
    top: 90, // Posisi avatar sedikit keluar dari background
    left: "50%", // Sentralisasi horizontal
    transform: [{ translateX: -50 }], // Menggeser ke kiri 50% lebarnya
  },
});
