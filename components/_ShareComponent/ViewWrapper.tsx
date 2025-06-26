import { Styles } from "@/styles/global-styles";
import { ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface ViewWrapperProps {
  children: React.ReactNode;
  withBackground?: boolean;
}

const ViewWrapper = ({
  children,
  withBackground = false,
}: ViewWrapperProps) => {

  const assetBackground = require("../../assets/images/main-background.png");

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={[]}
        style={{
          flex: 1,
          // paddingTop: StatusBar.currentHeight,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {withBackground ? (
            <ImageBackground
              source={assetBackground}
              resizeMode="cover"
              style={Styles.imageBackground}
            >
              <View style={Styles.containerWithBackground}>{children}</View>
            </ImageBackground>
          ) : (
            <View style={Styles.container}>{children}</View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ViewWrapper;
