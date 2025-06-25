/* eslint-disable @typescript-eslint/no-unused-vars */
import { MainColor } from "@/constants/color-palet";
import { globalStyles } from "@/constants/global-styles";
import { ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ViewWrapperProps {
  children: React.ReactNode;
}

const ViewWrapper = ({ children }: ViewWrapperProps) => {
  const assetBackground = require("../../assets/images/main-background.png");

  return (
    <SafeAreaView
      edges={[]}
      style={{
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
      }}
      
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
        <ImageBackground
          source={require("../../assets/images/main-background.png")}
          resizeMode="cover"
          style={globalStyles.imageBackground}
        >
          <View style={globalStyles.container}>{children}</View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewWrapper;
