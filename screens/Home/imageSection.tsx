import { Image } from "expo-image";
import { View } from "react-native";

export default function Home_ImageSection() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
      }}
    >
      <Image
        source={require("@/assets/images/constants/home-hipmi.png")}
        contentFit="cover"
        transition={1000}
        style={{
          width: "100%",
          height: 120,
          borderRadius: 10,
        }}
      />
    </View>
  );
}
