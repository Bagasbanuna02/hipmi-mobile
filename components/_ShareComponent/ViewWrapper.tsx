import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ViewWrapperProps {
  children: React.ReactNode;
  withBackground?: boolean;
  tabBarComponent?: React.ReactNode;
  bottomBarComponent?: React.ReactNode;
}

const ViewWrapper = ({
  children,
  withBackground = false,
  tabBarComponent,
  bottomBarComponent,
}: ViewWrapperProps) => {
  const assetBackground = require("../../assets/images/main-background.png");

  return (
    <>
      <SafeAreaView
        edges={[
          "bottom",
          // "top",
        ]}
        style={{
          flex: 1,
          // paddingTop: StatusBar.currentHeight,
          backgroundColor: MainColor.darkblue,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {withBackground ? (
            <ImageBackground
              source={assetBackground}
              resizeMode="cover"
              style={GStyles.imageBackground}
            >
              <View style={GStyles.containerWithBackground}>{children}</View>
            </ImageBackground>
          ) : (
            <View style={GStyles.container}>{children}</View>
          )}
        </ScrollView>
        {tabBarComponent ? tabBarComponent : null}
        {bottomBarComponent ? (
          <View style={GStyles.bottomBar}>
            <View style={GStyles.bottomBarContainer}>{bottomBarComponent}</View>
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default ViewWrapper;
