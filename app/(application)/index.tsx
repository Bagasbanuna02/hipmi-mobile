/* eslint-disable @typescript-eslint/no-unused-vars */
import { ImageBackground, ScrollView, Text, View } from "react-native";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { globalStyles } from "@/constants/global-styles";
import Spacing from "@/components/_ShareComponent/Spacing";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Application() {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require("../../assets/images/main-background.png")}
        resizeMode="cover"
        style={globalStyles.imageBackground}
      >
        <View style={globalStyles.container}>
          {Array.from({ length: 20 }).map((_, index) => (
            <View key={index}>
              <Text style={globalStyles.authTitle}>Application {index}</Text>
              <Spacing height={30} />
            </View>
          ))}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
