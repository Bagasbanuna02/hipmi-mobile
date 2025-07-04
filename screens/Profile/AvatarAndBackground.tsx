import { AvatarCustom } from "@/components";
import { AccentColor } from "@/constants/color-palet";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { View, ImageBackground, StyleSheet } from "react-native";

const AvatarAndBackground = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={DUMMY_IMAGE.background}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      {/* Background Image */}

      {/* Avatar yang sedikit keluar */}
      <View style={styles.avatarOverlap}>
        <AvatarCustom
          source={DUMMY_IMAGE.avatar}
          size="lg"
        />
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